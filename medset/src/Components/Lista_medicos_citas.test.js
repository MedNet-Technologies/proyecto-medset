import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Lista_medicos_citas from "./Lista_medicos_citas";

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
  
      render(<Lista_medicos_citas />);
  
      const firstMedicName = await screen.findByText("John Doe");
      expect(firstMedicName).toBeInTheDocument();
  
      const secondMedicLocation = await screen.findByText("Santiago");
      expect(secondMedicLocation).toBeInTheDocument();
  
      global.fetch.mockRestore();
  });
});
