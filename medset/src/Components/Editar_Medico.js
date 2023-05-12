import React, {useEffect, useState} from 'react';
import getMedicoEspecifico from '../Services/getMedicoEspecifico';
import Swal from 'sweetalert2';
import { useLocation } from "wouter";


export default function Editar_medico ( {params} ) {
    const { keyword } = params
    const [geographic_location, setGeographic_location] = useState("");
    const [location, setLocation] = useLocation();

    useEffect(function () {
        getMedicoEspecifico( {keyword} ).then((ficha) => {
            setGeographic_location(ficha[0].geographic_location)
        })
      }, [keyword])



  
    const handleSubmit = async (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

      var payload = {
        medic_id: parseInt(keyword),
        geographic_location: geographic_location,
      };
      console.log(payload)
      const url = `http://54.207.227.87:8080/medics?medic_id=${payload.medic_id}&geographic_location=${payload.geographic_location}`;
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(payload),
      }).then((res) => res.json())
        .then(function (res) {
          Swal.fire({
            text: "Medico actualizado correctamente",
            icon: "success",
            showConfirmButton: true,
          });
          return res;
        })
        .then(
          setLocation("/Lista_medicos")
        );
    };
  return (
<div className="card border-secondary mb-3 mt-3 shadow-lg" style={{ maxWidth: "70rem" }}>
      <div className="card-body text-white" >
      <button className="btn btn-primary float-start"onClick={() => setLocation("/Lista_medicos")}>Ir a médicos<i class="bi bi-arrow-left-circle-fill"></i></button>
        <h1 className="card-title" style={{fontWeight: 700}}>Actualiza datos para editar medico</h1>
        <form onSubmit={handleSubmit} className="needs-validation" novalidate>
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
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
