import * as path from 'path';
import * as fs from 'fs';

// Setup test environment
beforeAll(() => {
  // Set test environment variables
  process.env['NODE_ENV'] = 'test';
  process.env['SMARTLEAD_API_KEY'] = 'test-api-key';
  process.env['SMARTLEAD_BASE_URL'] = 'https://test.smartlead.ai/api/v1';
  
  // Create test config directory
  const testConfigDir = path.join(__dirname, '.test-config');
  if (!fs.existsSync(testConfigDir)) {
    fs.mkdirSync(testConfigDir, { recursive: true });
  }
});

// Cleanup after tests
afterAll(() => {
  // Cleanup test files
  const testConfigDir = path.join(__dirname, '.test-config');
  if (fs.existsSync(testConfigDir)) {
    fs.rmSync(testConfigDir, { recursive: true, force: true });
  }
});

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Increase timeout for integration tests
jest.setTimeout(30000); 