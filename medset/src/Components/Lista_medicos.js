import React, { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Lista_medicos() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://15.228.191.117:8080/medics`)
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
  // eslint-disable-next-line
  }, []); 
  return (
    <div className="card mx-auto" style={{ maxWidth: "100rem" }}>
      <div className="card-header text-light h5 ps-4 py-3">
      <Link to={'/lista_medicos_citas'}><button className="btn btn-primary izquierda" > usr</button></Link>
        SELECCIONA UN MÉDICO 
        <Link to={'/formulario_medicos'}><button className="btn btn-primary derecha" id="btn_crearmedicos">Crear Médico</button></Link>
        
      </div>
      {!(data.length > 0) ? (
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr className="text-secondary">
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th className="pa-0 ma-0" style={{ width: "2px" }}></th>
                <th className="pa-0 ma-0" style={{ width: "1px" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="6" className="text-center">
                  <div className="spinner-grow text-primary px-9" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr className="text-secondary">
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Comuna</th>
                <th scope="col">Especialización</th>
                <th className="pa-0 ma-0" style={{ width: "2px" }}></th>
                <th className="pa-0 ma-0" style={{ width: "1px" }}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo) => {
                const deleteURL = `http://15.228.191.117:8080/medics?medic_id=${todo.medic_id}`
                const panaURL = `/formulario_medicos/${todo.medic_id}`

                return (
                  <tr className="text-white">
                    <td>{todo.first_name}</td>
                    <td>{todo.last_name}</td>
                    <td>{todo.geographic_location}</td>
                    <td>{todo.specialization}</td>
                    <td>
                      <Link to={panaURL}>                      
                      <button className="btn btn-primary me-md-2" id="btn_editar" type="button" >
                        edit
                      </button>
                      </Link>

                    </td>
                    <td>
                      <button
                        className="btn btn-danger me-md-2"
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
