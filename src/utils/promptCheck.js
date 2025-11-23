/**
 * Enhanced function to check if the prompt is a coding question/description
 * Now accepts even small code-related prompts
 */
export function isCodingPrompt(prompt) {
  // Comprehensive keywords that indicate a coding request
  const codingKeywords = [
    // Core programming concepts
    'function', 'class', 'array', 'object', 'variable', 'loop', 'sort', 'API', 'component',
    'method', 'property', 'parameter', 'argument', 'return', 'import', 'export', 'module',
    'interface', 'type', 'enum', 'struct', 'const', 'let', 'var', 'async', 'await', 'promise',

    // Actions
    'write', 'generate', 'create', 'build', 'implement', 'develop', 'code', 'program',
    'make', 'design', 'add', 'update', 'modify', 'fix', 'debug', 'refactor', 'optimize',

    // Programming concepts
    'algorithm', 'script', 'logic', 'condition', 'iteration', 'recursion', 'callback',
    'closure', 'scope', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction',

    // Languages
    'react', 'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go', 'rust',
    'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala', 'perl', 'bash', 'shell',

    // Technologies & Frameworks
    'regex', 'sql', 'database', 'query', 'endpoint', 'ui', 'frontend', 'backend',
    'server', 'client', 'api', 'rest', 'graphql', 'json', 'xml', 'http', 'https',
    'test', 'unit test', 'mock', 'hook', 'state', 'props', 'render', 'fetch',
    'axios', 'express', 'node', 'npm', 'yarn', 'webpack', 'vite', 'babel',
    'tailwind', 'css', 'html', 'jsx', 'tsx', 'vue', 'angular', 'svelte', 'next',

    // File extensions
    'ts', 'js', 'py', 'java', 'cpp', 'csharp', 'php', 'rb', 'go', 'rs',

    // Common code patterns
    'for loop', 'while loop', 'if else', 'switch case', 'try catch', 'map', 'filter',
    'reduce', 'foreach', 'promise', 'callback', 'event', 'listener', 'handler',

    // Data structures
    'list', 'dict', 'set', 'map', 'tree', 'graph', 'stack', 'queue', 'hash',

    // Short prompts that are clearly code-related
    'sort array', 'reverse string', 'find element', 'count', 'sum', 'average',
    'validate', 'parse', 'convert', 'transform', 'format', 'calculate'
  ];

  const lowerPrompt = prompt.toLowerCase().trim();

  // Check if prompt is very short but contains code indicators
  if (lowerPrompt.length < 15) {
    // Even short prompts with these patterns are likely code-related
    const shortCodePatterns = [
      /\bcode\b/, /\bfunc/, /\bclass\b/, /\barray\b/, /\bloop\b/, /\bsort\b/,
      /\bapi\b/, /\bjs\b/, /\bpy\b/, /\bhtml\b/, /\bcss\b/, /\bsql\b/
    ];

    if (shortCodePatterns.some(pattern => pattern.test(lowerPrompt))) {
      return true;
    }
  }

  // If any keyword is found, consider it a coding prompt
  return codingKeywords.some(keyword => lowerPrompt.includes(keyword));
}
