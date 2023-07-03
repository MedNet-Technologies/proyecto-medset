import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Formulario_MedicoNuevo from './Formulario_NuevoMedico';

describe('Formulario_MedicoNuevo', () => {
  it('Sube los datos obtenidos del formulario a la base de datos', async () => {
    const mockLocation = jest.fn();
    const mockFetch = jest.fn().mockResolvedValue({ json: jest.fn() });
    global.fetch = mockFetch;
    jest.spyOn(window, 'fetch');

    const { container } = render(<Formulario_MedicoNuevo />);
    const nombreInput = container.querySelector('input[name="first_name"]');
    const apellidoInput = container.querySelector('input[name="last_name"]');
    const especializacionInput = container.querySelector('input[name="specialization"]');
    const comunaInput = container.querySelector('input[name="geographic_location"]');
    const credencialesInput = container.querySelector('input[name="credentials"]');
    const submitButton = screen.getByText(/Enviar/i);

    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidoInput, { target: { value: 'Doe' } });
    fireEvent.change(especializacionInput, { target: { value: 'Cardiology' } });
    fireEvent.change(comunaInput, { target: { value: 'New York' } });
    fireEvent.change(credencialesInput, { target: { value: 'MD' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/15\.228\.191\.117:8080\/medics\?.*first_name=John.*last_name=Doe.*specialization=Cardiology.*credentials=MD.*geographic_location=New York/),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
          credentials: 'MD',
          specialization: 'Cardiology',
          geographic_location: 'New York',
        }),
        mode: "cors"
      }
    );

    expect(mockFetch).toHaveBeenCalled();
  });
});
