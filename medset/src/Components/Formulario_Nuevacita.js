import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation } from "wouter";


export default function Formulario_Nuevacita({params}) {
  const { keyword } = params
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rut, setRut] = useState("");
  const [location, setLocation] = useLocation();
  var strDate = new String();
  var strTime = new String();
  





  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var payload = {
      date: date,
      time: time,
      rut: rut,
      medic_id: parseInt(keyword),
    };
    const url = `http://54.207.227.87:8080/appointments?date=${payload.date}&time=${payload.time}&rut=${payload.rut}&medic_id=${payload.medic_id}`;
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
            <i class="bi bi-arrow-left-circle-fill"></i>
          </button>
        </div>
        <div>
          <form
            id="meds"
            onSubmit={handleSubmit}
            className="needs-validation"
            novalidate
          >   
              <div className="mb-3">

              <label for="last_name">Fecha</label>
              <input type="date" id="start" name="trip-start"
              min="2018-01-01" max="2025-12-31"
              onChange={(e) => setDate(e.target.value.toString())}
              >
              </input>
            </div>

            <div className="mb-3">
              <label for="first_name">Hora</label>
              <input
                type="time" id="appt" name="appt"
                min="09:00" max="18:00" required
                onChange={(e) => setTime(e.target.value.toString())}
              ></input>
            </div>



            <div className="mb-3">
              <label for="specialization">Rut</label>
              <input
                type="text"
                required
                name="specialization"
                id="specialization"
                onChange={(e) => setRut(e.target.value)}
              ></input>
            </div>

            
            <button type="submit" class="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
