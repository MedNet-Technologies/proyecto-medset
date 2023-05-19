import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Lista_medicos_citas from './Lista_medicos_citas';

describe('Lista_medicos_citas', () => {
  test('Muestra la lista de doctores con los datos de la BD', async () => {
    const mockData = [
      {
        medic_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        geographic_location: 'New York',
        specialization: 'Cardiology',
      },
      {
        medic_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        geographic_location: 'Los Angeles',
        specialization: 'Dermatology',
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ medics: mockData }),
    });

    render(
      <Router>
        <Lista_medicos_citas />
      </Router>
    );

    await screen.findByText('Jane Smith');
    await screen.findByText('Los Angeles');
    await screen.findByText('Dermatology');
  });

  test('Filtra los datos en la tabla según la barra de búsqueda', async () => {
    const mockData = [
      {
        medic_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        geographic_location: 'New York',
        specialization: 'Cardiology',
      },
      {
        medic_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        geographic_location: 'Los Angeles',
        specialization: 'Dermatology',
      },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ medics: mockData }),
    });
  
    render(
      <Router>
        <Lista_medicos_citas />
      </Router>
    );
  
    await screen.findByText('Jane Smith');
    await screen.findByText('Los Angeles');
    await screen.findByText('Dermatology');
  
    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'derm' } });
  
    const filteredDoctorName = screen.getByText('Jane Smith');
    const filteredGeographicLocation = screen.getByText('Los Angeles');
    const filteredSpecialization = screen.getByText('Dermatology');
  
    expect(filteredDoctorName).toBeInTheDocument();
    expect(filteredGeographicLocation).toBeInTheDocument();
    expect(filteredSpecialization).toBeInTheDocument();
  });
  

  // Add more test cases as needed
});
