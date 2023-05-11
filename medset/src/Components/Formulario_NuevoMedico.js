import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation } from "wouter";

export default function Formulario_PacienteNuevo() {
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
    const url = `http://54.207.227.87:8080/medics?first_name=${payload.first_name}&last_name=${payload.last_name}&specialization=${payload.specialization}&credentials=${payload.credentials}&geographic_location=${payload.geographic_location}`
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
      className="card border-secondary mb-3 mt-3 shadow-lg"
      style={{ maxWidth: "70rem" }}
    >
      <div className="card-body text-white">
        <h1 style={{ fontWeight: 700 }}>Ingresar datos de un nuevo médico</h1>
        <button
          className="btn btn-primary float-start"
          onClick={() => setLocation("/Lista_medicos")}
        >
          {" "}
          Ir a médicos
          <i class="bi bi-arrow-left-circle-fill"></i>
        </button>
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

          <button type="submit" class="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
