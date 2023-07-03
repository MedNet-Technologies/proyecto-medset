import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Formulario_Nuevacita from './Formulario_Nuevacita';

describe('Formulario para añadir citas', () => {
  it('Se sube el formulario a la base de datos', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ json: jest.fn() });
    global.fetch = mockFetch;
    jest.spyOn(window, 'fetch');

    const { container } = render(<Formulario_Nuevacita params={{ keyword: '123' }} />);
    const fechaInput = container.querySelector('input[name="trip-start"]');
    const horaInput = container.querySelector('input[name="appt"]');
    const rutInput = screen.getByLabelText(/Rut/i);
    const submitButton = screen.getByText(/Enviar/i);

    fireEvent.change(fechaInput, { target: { value: '2023-05-20' } });
    fireEvent.change(horaInput, { target: { value: '10:00' } });
    fireEvent.change(rutInput, { target: { value: '123456789' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      'http://15.228.191.117:8080/appointments?date=2023-05-20&time=10:00&rut=123456789&medic_id=123',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: '2023-05-20',
          time: '10:00',
          rut: '123456789',
          medic_id: 123,
        }),
      })
    );

    expect(mockFetch).toHaveBeenCalled();
  });
});
