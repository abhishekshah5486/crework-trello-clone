import { render, waitFor } from '@testing-library/react';
import App from './App';
import UserContextProvider from './Context/UserContextProvider';

// Mock axios - Jest will automatically use __mocks__/axios.js
jest.mock('axios');

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock the users API calls
const mockGetCurrentUser = jest.fn(() => Promise.resolve({ success: false, user: null }));
jest.mock('./APICalls/users', () => ({
  getCurrentUser: () => mockGetCurrentUser(),
  RegisterUser: jest.fn(),
  LoginUser: jest.fn(),
  LogoutUser: jest.fn(),
}));

test('renders application without crashing', async () => {
  const { container } = render(
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
  
  // Wait for UserContextProvider to finish loading and context to be available
  await waitFor(() => {
    expect(container).toBeTruthy();
  }, { timeout: 3000 });
});
