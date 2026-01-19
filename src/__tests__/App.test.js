import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders application without crashing', () => {
    render(<App />);
    const appElement = screen.getByTestId('app') || document.body;
    expect(appElement).toBeInTheDocument();
  });

  test('application has basic structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
