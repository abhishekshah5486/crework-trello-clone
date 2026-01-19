import { render, waitFor } from '@testing-library/react';
import App from '../App';
import UserContextProvider from '../Context/UserContextProvider';
import { BrowserRouter } from 'react-router-dom';

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
jest.mock('../APICalls/users', () => ({
  getCurrentUser: () => mockGetCurrentUser(),
  RegisterUser: jest.fn(),
  LoginUser: jest.fn(),
  LogoutUser: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    jest.clearAllMocks();
    mockGetCurrentUser.mockResolvedValue({ success: false, user: null });
  });

  test('renders application without crashing', async () => {
    const { container } = render(
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    );
    
    // Wait for UserContextProvider to finish loading and context to be available
    await waitFor(() => {
      expect(container).toBeTruthy();
    }, { timeout: 3000 });
  });

  test('application has basic structure', async () => {
    const { container } = render(
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(container.firstChild).toBeTruthy();
    }, { timeout: 3000 });
  });
});
