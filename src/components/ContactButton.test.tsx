import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactButton from './ContactButton';
import { decodeEmail } from '@/lib/contact';

const EMAIL = decodeEmail();

describe('ContactButton', () => {
  it('starts collapsed as a single Contact button with no address in the DOM', () => {
    const { container } = render(<ContactButton />);
    const button = screen.getByRole('button', { name: /contact/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(container).not.toHaveTextContent(EMAIL);
  });

  it('reveals the email as a mailto link when activated', async () => {
    const user = userEvent.setup();
    render(<ContactButton />);

    await user.click(screen.getByRole('button', { name: /contact/i }));

    const link = screen.getByRole('link', { name: EMAIL });
    expect(link).toHaveAttribute('href', `mailto:${EMAIL}`);
  });

  it('copies the address to the clipboard and confirms', async () => {
    const user = userEvent.setup();
    render(<ContactButton />);

    await user.click(screen.getByRole('button', { name: /contact/i }));
    await user.click(screen.getByRole('button', { name: /copy email address/i }));

    expect(await navigator.clipboard.readText()).toBe(EMAIL);
    expect(screen.getByRole('button', { name: /copy email address/i })).toHaveTextContent('Copied');
  });
});
