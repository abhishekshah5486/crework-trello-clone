const request = require('supertest');
const express = require('express');

// Mock the server for testing
const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

describe('Health Check Endpoint', () => {
    test('GET /health should return 200 and healthy status', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);

        expect(response.body).toHaveProperty('status', 'healthy');
        expect(response.body).toHaveProperty('timestamp');
    });
});
