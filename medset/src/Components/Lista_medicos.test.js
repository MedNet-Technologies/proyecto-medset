import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Lista_medicos from "./Lista_medicos";

beforeEach(() => {
  fetch.resetMocks();
})

describe("Comportamiento de la lista de médicos", () => {
  test("Muestra la tabla con información obtenida", async () => {
    const mockData = {
      medics: [
        {
          medic_id: 1,
          first_name: "John",
          last_name: "Doe",
          geographic_location: "Viña del Mar",
          specialization: "Dermatólogo",
        },
        {
          medic_id: 2,
          first_name: "Jane",
          last_name: "Doe",
          geographic_location: "Santiago",
          specialization: "Pediatra",
        },
      ],
    };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<Lista_medicos />);

    const firstMedicName = await screen.findByText("John");
    expect(firstMedicName).toBeInTheDocument();

    const secondMedicLocation = await screen.findByText("Santiago");
    expect(secondMedicLocation).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("Recibe información de la API", async() => {
    fetch.mockResponse(req =>
      req.url === 'http://54.207.227.87:8080/medics'
        ? callMyApi().then(res => 'ok')
        : Promise.reject(new Error('bad url'))
    )
  });

  test("Redirige a pantalla para editar cuando se hace clic en 'edit'", async () => {
    const mockData = {
      medics: [
        { medic_id: 1, first_name: "John", last_name: "Doe", geographic_location: "Viña del Mar", specialization: "Dermatólogo" },
        { medic_id: 2, first_name: "Jane", last_name: "Doe", geographic_location: "Santiago", specialization: "Pediatra" }
      ]
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    render(<Lista_medicos />);
    await waitFor(() => expect(screen.getByText(/john/i)).toBeInTheDocument());

    const editButton = screen.getAllByText(/edit/i)[0];
    fireEvent.click(editButton);

    global.fetch.mockRestore();
  });

  test("Borra al médico cuando se hace clic en su botón 'delete'", async () => {
    const mockData = {
      medics: [
        { medic_id: 1, first_name: "John", last_name: "Doe", geographic_location: "Viña del Mar", specialization: "Dermatólogo" },
        { medic_id: 2, first_name: "Jane", last_name: "Doe", geographic_location: "Santiago", specialization: "Pediatra" }
      ]
    };
  
    jest.spyOn(global, "fetch").mockImplementation((url, options) => {
      if (options?.method === "DELETE") {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(mockData)
        });
      }
    });
  
    render(<Lista_medicos />);
    await waitFor(() => expect(screen.getByText(/john/i)).toBeInTheDocument());
  
    fireEvent.click(screen.getAllByText(/delete/i)[0]);
  
    const deleteURL = "http://54.207.227.87:8080/medics?medic_id=1"; // Adjust the URL based on your data
    expect(global.fetch).toHaveBeenCalledWith(deleteURL, expect.any(Object));
  
    global.fetch.mockRestore();
  });
});