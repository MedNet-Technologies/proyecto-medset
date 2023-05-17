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
      className="card mx-auto"
      style={{ maxWidth: "70rem" }}
    >
      <div className="card-header text-light h5 ps-4 py-3">
        AGENDAR CITA
      </div>
        <div>
        </div>
        <div className="card-body text-white">
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
            <button
            className="btn btn-primary"
            onClick={() => setLocation("/Lista_medicos_citas")}
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
