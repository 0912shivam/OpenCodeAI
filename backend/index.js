const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock code snippets
const codeSnippets = [
    {
        language: 'javascript',
        code: `// React useState Hook Example
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`
    },
    {
        language: 'python',
        code: `# Python Function to Calculate Fibonacci
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

# Example usage
print(fibonacci(10))`
    },
    {
        language: 'javascript',
        code: `// Express.js REST API Example
const express = require('express');
const app = express();

app.use(express.json());

// GET endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

// POST endpoint
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
    },
    {
        language: 'python',
        code: `# Python Class Example - Bank Account
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return f"Deposited \${amount}. New balance: \${self.balance}"
        return "Invalid amount"
    
    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return f"Withdrew \${amount}. New balance: \${self.balance}"
        return "Insufficient funds"
    
    def get_balance(self):
        return f"{self.owner}'s balance: \${self.balance}"

# Usage
account = BankAccount("John Doe", 1000)
print(account.deposit(500))
print(account.withdraw(200))`
    },
    {
        language: 'javascript',
        code: `// Async/Await API Fetch Example
async function fetchUserData(userId) {
  try {
    const response = await fetch(
      \`https://api.example.com/users/\${userId}\`
    );
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Usage with error handling
fetchUserData(123)
  .then(user => {
    if (user) {
      console.log('User:', user);
    }
  });`
    }
];

// POST /generate route
app.post('/generate', (req, res) => {
    const { prompt, language } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: 'Prompt is required'
        });
    }

    // Log the requested language
    console.log(`Generating code for language: ${language || 'auto'}`);

    // Randomly pick one of the 5 code snippets
    const randomIndex = Math.floor(Math.random() * codeSnippets.length);
    const selectedSnippet = codeSnippets[randomIndex];

    // Simulate processing delay
    setTimeout(() => {
        res.json({
            code: selectedSnippet.code,
            language: selectedSnippet.language,
            prompt: prompt
        });
    }, 500);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Mock API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
    console.log(`📝 POST to http://localhost:${PORT}/generate with { "prompt": "your text" }`);
});
