import { render } from '@testing-library/react';
import App from '../App';

// Mock axios - Jest will automatically use __mocks__/axios.js
jest.mock('axios');

describe('App Component', () => {
  test('renders application without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('application has basic structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
