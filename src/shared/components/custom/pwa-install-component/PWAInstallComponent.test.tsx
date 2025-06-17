import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PWAInstallComponent } from '.';

describe('App Component', () => {
  const renderComponent = <PWAInstallComponent />;

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra botón de instalación cuando ocurre beforeinstallprompt', async () => {
    render(renderComponent);

    await act(async () => {
      const installEvent = new Event('beforeinstallprompt');
      window.dispatchEvent(installEvent);
    });

    expect(await screen.findByText('Instalar App')).toBeInTheDocument();
  });

  test('muestra/oculta mensaje de instalación según sessionStorage', async () => {
    const user = userEvent.setup();
    const { rerender } = render(renderComponent);

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
    rerender(renderComponent);

    expect(screen.queryByText('¿Quieres usar la aplicación?')).not.toBeInTheDocument();
  });
});
