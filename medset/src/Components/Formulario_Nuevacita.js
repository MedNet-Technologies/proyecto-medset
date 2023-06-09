import React, { useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "wouter";


export default function Formulario_Nuevacita({params}) {
  const { keyword } = params
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rut, setRut] = useState("");
  // eslint-disable-next-line
  const [location, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var payload = {
      date: date,
      time: time,
      rut: rut,
      medic_id: parseInt(keyword),
    };
    const url = `http://15.228.191.117:8080/appointments?date=${payload.date}&time=${payload.time}&rut=${payload.rut}&medic_id=${payload.medic_id}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(function (res) {
        Swal.fire({
          text: "Cita agendada correctamente",
          icon: "success",
          showConfirmButton: true,
        });
        return res;
      })
      .then(setLocation("/lista_medicos_citas"));
  };


  return (
    <div
      className="card border-secondary mb-3 mt-3 shadow-lg"
      style={{ maxWidth: "70rem" }}
    >
      <div className="card-body text-white">
        <h1 style={{ fontWeight: 700 }}>Agendar Cita</h1>
        <div>
          <button
            className="btn btn-primary float-start"
            onClick={() => setLocation("/Lista_medicos_citas")}
          >
            Ir a médicos
            <i className="bi bi-arrow-left-circle-fill"></i>
          </button>
        </div>
        <div>
          <form
            id="meds"
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
          >   
              <div className="mb-3">

              <label htmlFor="date">Fecha</label>
              <input type="date" id="start" name="trip-start"
              min="2018-01-01" max="2025-12-31"
              onChange={(e) => setDate(e.target.value.toString())}
              >
              </input>
            </div>

            <div className="mb-3">
              <label htmlFor="time">Hora</label>
              <input
                type="time" id="appt" name="appt"
                min="09:00" max="18:00" required
                onChange={(e) => setTime(e.target.value.toString())}
              ></input>
            </div>



            <div className="mb-3">
              <label htmlFor="rut">Rut</label>
              <input
                type="text"
                required
                name="rut"
                id="rut"
                onChange={(e) => setRut(e.target.value)}
              ></input>
            </div>

            
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
