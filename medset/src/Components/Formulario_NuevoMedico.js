import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation } from "wouter";

export default function Formulario_MedicoNuevo() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [credentials, setCredentials] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [geographic_location, setGeographic_location] = useState("");
  const [location, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var payload = {
      first_name: first_name,
      last_name: last_name,
      credentials: credentials,
      specialization: specialization,
      geographic_location: geographic_location,
    };
    const url = `http://15.228.191.117:8080/medics?first_name=${payload.first_name}&last_name=${payload.last_name}&specialization=${payload.specialization}&credentials=${payload.credentials}&geographic_location=${payload.geographic_location}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(function (res) {
        Swal.fire({
          text: "Médico creado correctamente",
          icon: "success",
          showConfirmButton: true,
        });
        return res;
      })
      .then(setLocation("/lista_medicos"));
  };
  return (
    <div
      className="card shadow-lg mx-auto"
      style={{ maxWidth: "70rem" }}
    >
      <div className="card-header text-light h5 ps-4 py-3">
        INGRESAR DATOS DE UN NUEVO MÉDICO
      </div>
        <div className="card-body text-white">
          <form
            id="meds"
            onSubmit={handleSubmit}
            className="needs-validation"
            novalidate
          >
            <div className="mb-3">
              <label for="first_name">Nombre</label>
              <input
                type="text"
                required
                name="first_name"
                id="first_name"
                onChange={(e) => setFirst_name(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label for="last_name">Apellido</label>
              <input
                type="text"
                required
                name="last_name"
                id="last_name"
                onChange={(e) => setLast_name(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label for="specialization">Especialización</label>
              <input
                type="text"
                required
                name="specialization"
                id="specialization"
                onChange={(e) => setSpecialization(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label for="geographic_location">Comuna</label>
              <input
                type="text"
                required
                name="geographic_location"
                id="geographic_location"
                onChange={(e) => setGeographic_location(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label for="credentials">Credenciales</label>
              <input
                type="text"
                required
                name="credentials"
                id="credentials"
                onChange={(e) => setCredentials(e.target.value)}
              ></input>
            </div>
            <button
              className="btn ms-2 btn-primary"
              onClick={() => setLocation("/Lista_medicos")}
            >
              Volver
            </button>
            <button type="submit" class="btn btn-primary ms-2">
              Enviar
            </button>
          </form>
        </div>
      </div>
  );
}
