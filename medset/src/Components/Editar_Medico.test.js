import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Editar_Medico from './Editar_Medico';
import getMedicoEspecifico from '../Services/getMedicoEspecifico';

jest.mock('../Services/getMedicoEspecifico'); // Mock the getMedicoEspecifico function

describe('Editar_Medico', () => {
    
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mock function calls before each test
    });
  
    test('updates medic information and redirects to Lista_medicos', async () => {
      const keyword = '123'; // Sample keyword
      const mockFicha = [
        { medic_id: '123', geographic_location: 'Viña del Mar' },
      ];
  
      getMedicoEspecifico.mockResolvedValue(mockFicha); // Mock the getMedicoEspecifico function to resolve with mockFicha
  
      render(<Editar_Medico params={{ keyword }} />);
      const comunaInput = screen.getByLabelText(/comuna/i);
      const submitButton = screen.getByText(/enviar/i);
  
      // Simulate user input and form submission
      fireEvent.change(comunaInput, { target: { value: 'Santiago' } });
      fireEvent.click(submitButton);
  
      // Verify that the fetch request was made with the correct data
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
  
      // Mock the fetch response
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValueOnce({}),
        })
      );
  

  
      // Verify that the redirection to Lista_medicos occurred
      expect(screen.getByText(/volver/i)).toBeInTheDocument();
  
      // Verify that the getMedicoEspecifico function was called
      expect(getMedicoEspecifico).toHaveBeenCalledWith({ keyword });
  
      // Verify that the geographic_location state was updated
      expect(comunaInput.value).toBe('Santiago');
    });
  });