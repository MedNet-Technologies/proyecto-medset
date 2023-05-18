import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import Moment from "moment";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function Lista_medicos_citas() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://54.207.227.87:8080/medics`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData.medics);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card mx-auto" style={{ maxWidth: "100rem" }}>
      <div class="card-header text-light h5 ps-4 py-3">
      <Link to={'/lista_medicos'}><button class="btn btn-primary izquierda" > dev</button></Link>

        SELECCIONA UN MÉDICO 
        
        
      </div>
      {!(data.length > 0) ? (
        <div class="card-body table-responsive">
          <table class="table">
            <thead>
              <tr class="text-secondary">
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th class="pa-0 ma-0" style={{ width: "2px" }}></th>
                <th class="pa-0 ma-0" style={{ width: "1px" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colspan="6" class="text-center">
                  <div class="spinner-grow text-primary px-9" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div class="card-body table-responsive">
          <table class="table">
            <thead>
              <tr class="text-secondary">
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th class="pa-0 ma-0" style={{ width: "2px" }}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo) => {
                const panaURL = `/nueva_cita/${todo.medic_id}`

                return (
                  <tr class="text-white">
                    <td>{todo.first_name}</td>
                    <td>{todo.last_name}</td>
                    <td>{todo.geographic_location}</td>
                    <td>{todo.specialization}</td>
                    <td>
                      <Link to={panaURL}>                      
                      <button class="btn btn-primary me-md-1" type="button" >
                        Agendar
                      </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
