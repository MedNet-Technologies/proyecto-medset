import { render, screen } from '@testing-library/react';
import Home from './Home';


test('Se muestra botón "Médicos"', () => {
  render(<Home />);
  const linkElement = screen.getByText('Médicos');
  expect(linkElement).toBeInTheDocument();
});