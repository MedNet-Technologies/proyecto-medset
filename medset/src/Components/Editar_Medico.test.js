import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Editar_Medico from './Editar_Medico';
import getMedicoEspecifico from '../Services/getMedicoEspecifico';

jest.mock('../Services/getMedicoEspecifico'); 

describe('Editar_Medico', () => {
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('Actualiza la información del médico en la BD con la recibida', async () => {
      const keyword = '123';
      const mockFicha = [
        { medic_id: '123', geographic_location: 'Viña del Mar' },
      ];
  
      getMedicoEspecifico.mockResolvedValue(mockFicha);
  
      render(<Editar_Medico params={{ keyword }} />);
      const comunaInput = screen.getByLabelText(/comuna/i);
      const submitButton = screen.getByText(/enviar/i);
  
      fireEvent.change(comunaInput, { target: { value: 'Santiago' } });
      fireEvent.click(submitButton);
  
      expect(fetch).toHaveBeenCalledWith(
        'http://54.207.227.87:8080/medics?medic_id=123&geographic_location=Santiago',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            medic_id: 123,
            geographic_location: 'Santiago',
          }),
        })
      );
  
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValueOnce({}),
        })
      );
  
      expect(screen.getByText(/volver/i)).toBeInTheDocument();
  
      expect(getMedicoEspecifico).toHaveBeenCalledWith({ keyword });

      expect(comunaInput.value).toBe('Santiago');
    });
  });