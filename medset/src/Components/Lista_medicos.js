import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import Moment from "moment";

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
      <div className="card mb-3 mt-3 shadow-sm">
        <div class="card-header text-light">
          Selecciona un Médico
        </div>
        {!(data.length > 0) ? (
          <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Especialización</th>
                <th scope="col">Comuna</th>
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
          <div class="table table-striped-columns">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Especialización</th>
                  <th scope="col">Comuna</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((todo) => {
                  return (
                    <tr>
                      <td>{todo.first_name}</td>
                      <td>{todo.last_name}</td>
                      <td>{todo.specialization}</td>
                      <td>{todo.geographic_location}</td>
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
