import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import Moment from "moment";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function Lista_medicos_citas() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = () => {
    fetch(`http://54.207.227.87:8080/medics`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData.medics);
        setFilteredData(actualData.medics);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getValueInput = (event) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === "") {
      setFilteredData(data);
    } else {
      const filteredResults = data.filter(
        (medico) => medico.specialization.toLowerCase().includes(inputValue)
      );
      setFilteredData(filteredResults);
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "100rem" }}>
      <div class="card-header text-light h5 ps-4 py-3">
        <Link to={"/lista_medicos"}>
          <button class="btn btn-primary izquierda"> dev</button>
        </Link>
        SELECCIONA UN MÉDICO
        <Link to={"/formulario_medicos"}>
          <button class="btn btn-primary derecha"> Crear Médico</button>
        </Link>
      </div>
      <div className="mt-3 mb-4 align-middle d-flex flex-row">
        <input
          type="text"
          placeholder="search"
          className="search"
          size="35"
          onChange={getValueInput}
        />
      </div>
      {data.length === 0 ? (
        <div class="card-body table-responsive">
          <table class="table">
            <thead>
              <tr class="text-secondary">
                <th scope="col">Nombre</th>
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th class="pa-0 ma-0" style={{ width: "2px" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colspan="4" class="text-center">
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
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th class="pa-0 ma-0" style={{ width: "2px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((todo) => {
                const panaURL = `/nueva_cita/${todo.medic_id}`;

                return (
                  <tr class="text-white">
                    <td>
                      {todo.first_name} {todo.last_name}
                    </td>
                    <td>{todo.geographic_location}</td>
                    <td>{todo.specialization}</td>
                    <td>
                      <Link to={panaURL}>
                        <button class="btn btn-primary me-md-1" type="button">
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
