import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import App from '../src/App';
const mount = (route = '/') => render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);
it('renders the homepage and switches calculator type', async () => {
  const user = userEvent.setup(); mount();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your money.');
  await user.click(screen.getByRole('button', { name: 'FDR calculator' }));
  expect(screen.getByLabelText('One-time deposit (৳)')).toHaveValue(100000);
  await user.clear(screen.getByLabelText('Annual interest rate (%)'));
  expect(screen.getByRole('alert')).toHaveTextContent('Complete all three fields');
  await user.type(screen.getByLabelText('Annual interest rate (%)'), '0');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
it('filters schemes, compares across routes, removes and clears', async () => {
  const user = userEvent.setup(); mount('/banks');
  await user.selectOptions(screen.getByLabelText('Scheme type'), 'DPS');
  expect(screen.getByRole('status')).toHaveTextContent('4 schemes found');
  const buttons = screen.getAllByRole('button', { name: /^Compare .*Monthly Builder/ });
  await user.click(buttons[0]); await user.click(buttons[1]); await user.click(buttons[2]);
  expect(buttons[3]).toBeDisabled();
  await user.click(screen.getByRole('link', { name: 'Compare your selection' }));
  expect(screen.getByRole('table')).toBeInTheDocument();
  await user.click(screen.getAllByRole('button', { name: /^Remove / })[0]);
  expect(screen.getByText('2/3 schemes selected')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Clear selection' }));
  expect(screen.getByText('Your comparison starts here.')).toBeInTheDocument();
});
it('shows an empty filter state and resets it', async () => {
  const user = userEvent.setup(); mount('/banks');
  await user.type(screen.getByRole('searchbox', { name: 'Search banks or schemes' }), 'nonexistent bank');
  expect(screen.getByText('No matching schemes')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(screen.getByRole('status')).toHaveTextContent('12 schemes found');
});
it('shows and searches the bank directory', async () => {
  const user = userEvent.setup(); mount('/banks');
  await user.click(screen.getByText(/Bank directory \(/));
  expect(screen.getByRole('link', { name: 'Visit AB Bank PLC website' })).toHaveAttribute('href', 'http://www.abbl.com/');
  await user.type(screen.getByRole('searchbox', { name: 'Search bank directory' }), 'nagad');
  expect(screen.getByRole('link', { name: 'Visit Nagad Digital Bank PLC. website' })).toHaveAttribute('href', 'https://www.bb.org.bd/en/index.php/links/links/9');
  expect(screen.getByText('Yet not granted permission for Commercial Operation.')).toBeInTheDocument();
});
it('moves through lessons and opens the FDR calculator', async () => {
  const user = userEvent.setup(); mount('/learn');
  await user.click(screen.getByRole('button', { name: 'Next lesson' }));
  expect(screen.getByRole('heading', { name: 'FDR: give a lump sum a timeline' })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: /Try this in the FDR/ }));
  expect(screen.getByLabelText('One-time deposit (৳)')).toBeInTheDocument();
});
it('supports mobile navigation and unknown routes', async () => {
  const user = userEvent.setup(); mount('/missing');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('back on track');
  await user.click(screen.getByRole('button', { name: 'Open navigation' }));
  await user.click(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'About' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('financial first steps');
  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
});
