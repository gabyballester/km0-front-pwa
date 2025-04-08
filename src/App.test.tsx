import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Mock de sessionStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el contador y permite incrementarlo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const counterButton = screen.getByRole('button', { name: /count is/i });
    await user.click(counterButton);

    expect(counterButton).toHaveTextContent('count is 1');
  });

  test('muestra botón de instalación cuando ocurre beforeinstallprompt', async () => {
    render(<App />);

    await act(async () => {
      const installEvent = new Event('beforeinstallprompt');
      window.dispatchEvent(installEvent);
    });

    expect(await screen.findByText('Instalar App')).toBeInTheDocument();
  });

  test('muestra/oculta mensaje de instalación según sessionStorage', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<App />);

    // Caso 1: Mensaje visible
    Storage.prototype.getItem = jest.fn(() => null);

    await act(async () => {
      window.dispatchEvent(new Event('beforeinstallprompt'));
    });

    expect(await screen.findByText('¿Quieres usar la aplicación?')).toBeInTheDocument();

    // Caso 2: Mensaje oculto después de cerrar
    await act(async () => {
      await user.click(screen.getByText('Cerrar'));
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith('installMessageClosed', 'true');

    // Caso 3: Mensaje oculto por sessionStorage
    Storage.prototype.getItem = jest.fn(() => 'true');
    rerender(<App />);

    expect(screen.queryByText('¿Quieres usar la aplicación?')).not.toBeInTheDocument();
  });
});
