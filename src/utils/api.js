// Grok API Configuration - Using environment variables for security
const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const GROK_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// OpenRouter Configuration (Fallback) - Using environment variables
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini Code Copilot',
    },
});

// Mock code snippets for fallback (Language Specific)
const MOCK_SNIPPETS = {
    javascript: `// JavaScript: Async Data Fetching
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,
    python: `# Python: Fibonacci Generator
def fibonacci_generator(n):
    """Generate first n Fibonacci numbers"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Usage
for num in fibonacci_generator(10):
    print(num)`,
    java: `// Java: Singleton Pattern
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {
        // Private constructor
    }

    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}`,
    cpp: `// C++: Binary Search
#include <vector>
#include <iostream>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    csharp: `// C#: LINQ Example
using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
        
        var evenSquares = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n);
            
        foreach (var num in evenSquares) {
            Console.WriteLine(num);
        }
    }
}`,
    go: `// Go: Goroutines and Channels
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d started job %d\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
}`,
    rust: `// Rust: Result Handling
use std::fs::File;
use std::io::Read;

fn read_file_contents(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn main() {
    match read_file_contents("config.txt") {
        Ok(data) => println!("File content: {}", data),
        Err(e) => println!("Error reading file: {}", e),
    }
}`,
    typescript: `// TypeScript: Generic Interface
interface Repository<T> {
    getById(id: number): T;
    getAll(): T[];
    save(item: T): void;
}

interface User {
    id: number;
    name: string;
}

class UserRepository implements Repository<User> {
    private users: User[] = [];

    save(user: User): void {
        this.users.push(user);
    }
    // ... other implementations
}`,
    php: `// PHP: Database Connection (PDO)
<?php
class Database {
    private $host = "localhost";
    private $db_name = "test_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}`,
    ruby: `# Ruby: Class and Mixin
module Loggable
  def log(message)
    puts "[LOG] #{Time.now}: #{message}"
  end
end

class User
  include Loggable
  attr_accessor :name

  def initialize(name)
    @name = name
    log("User #{@name} created")
  end
end

user = User.new("Alice")`
};

/**
 * Call Grok API to generate code
 */
async function callGrokAPI(prompt, language) {
    if (!GROK_API_KEY) {
        throw new Error('Grok API key is not configured. Please add VITE_GROK_API_KEY to your .env file.');
    }

    const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROK_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert coding assistant. Generate clean, production-ready ${language} code based on the user's request. Provide ONLY the code, no explanations. Comment the code helpfully.`
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2048,
        }),
    });

    if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Generate code using Grok API with fallback to OpenRouter and then mock data
 * @param {string} prompt - The user's prompt
 * @param {string} language - The target programming language
 * @returns {Promise<{code: string, language: string, prompt: string}>}
 */
export async function generateCode(prompt, language = 'javascript') {
    // 1. Try Grok API first
    try {
        console.log('Attempting to generate code via Grok API...');
        let generatedCode = await callGrokAPI(prompt, language);

        // Clean up markdown code blocks if present
        generatedCode = generatedCode.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');

        return {
            code: generatedCode,
            language: language,
            prompt: prompt
        };
    } catch (error) {
        console.warn('Grok API failed, trying OpenRouter fallback:', error.message);
    }

    // 2. Try OpenRouter API as fallback
    try {
        console.log('Attempting to generate code via OpenRouter...');
        const completion = await openRouter.chat.send({
            model: 'openai/gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert coding assistant. Generate clean, production-ready ${language} code based on the user's request. Provide ONLY the code, no explanations. Comment the code helpfully.`
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        if (completion && completion.choices && completion.choices[0]) {
            let generatedCode = completion.choices[0].message.content;

            // Clean up markdown code blocks if present
            generatedCode = generatedCode.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');

            return {
                code: generatedCode,
                language: language,
                prompt: prompt
            };
        }
    } catch (error) {
        console.warn('OpenRouter API also failed, falling back to mock data:', error.message);
    }

    // 3. Fallback to Language-Specific Mock Data
    console.log(`Using fallback mock data for language: ${language}`);

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get snippet for the requested language, or default to JavaScript if not found
    const mockCode = MOCK_SNIPPETS[language.toLowerCase()] || MOCK_SNIPPETS['javascript'];

    return {
        code: mockCode,
        language: language,
        prompt: prompt
    };
}
