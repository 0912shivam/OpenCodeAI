const https = require('https');

const data = JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [
        { role: 'user', content: 'Say hello' }
    ]
});

const options = {
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', body);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
