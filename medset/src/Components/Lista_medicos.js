import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import Moment from "moment";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function Lista_medicos() {
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
      <Link to={'/lista_medicos_citas'}><button class="btn btn-primary izquierda" > usr</button></Link>
        SELECCIONA UN MÉDICO 
        <Link to={'/formulario_medicos'}><button class="btn btn-primary derecha">Crear Médico</button></Link>
        
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
              <tr class="text-white">
                <td scope="col">Tomás Roberto</td>
                <td scope="col">González López</td>
                <td scope="col">Viña del Mar</td>
                <td scope="col">Dermatólogo</td>
                <td>
                  <button class="btn btn-primary me-md-2" type="button">
                    edit
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger me-md-2" type="button">
                    delete
                  </button>
                </td>
              </tr>
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
                <th class="pa-0 ma-0" style={{ width: "1px" }}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo) => {
                const deleteURL = `http://54.207.227.87:8080/medics?medic_id=${todo.medic_id}`
                const panaURL = `/formulario_medicos/${todo.medic_id}`

                return (
                  <tr class="text-white">
                    <td>{todo.first_name}</td>
                    <td>{todo.last_name}</td>
                    <td>{todo.geographic_location}</td>
                    <td>{todo.specialization}</td>
                    <td>
                      <Link to={panaURL}>                      
                      <button class="btn btn-primary me-md-2" type="button" >
                        edit
                      </button>
                      </Link>

                    </td>
                    <td>
                      <button
                        class="btn btn-danger me-md-2"
                        type="button"
                        onClick={() => {
                          try {
                            fetch(deleteURL, {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                            ).then(function (res) {
                              window.location.reload();});
                          } catch (error) {
                            console.error(error);
                            alert("Unable to delete item.");
                          }
                        }
                      }
                      >
                        delete
                      </button>
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
