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
      <div className="card">
        <div class="card-header text-light h5 ps-4 py-3">
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
                <th class="pa-0 ma-0"></th>
                <th class="pa-0 ma-0"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-white">
                <td scope="col">Tomás Roberto</td>
                <td scope="col">González López</td>
                <td scope="col">Viña del Mar</td>
                <td scope="col">Dermatólogo</td>
                <td><button class="btn btn-primary me-md-2" type="button">edit</button></td>
                <td><button class="btn btn-danger me-md-2" type="button">delete</button></td>
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
                  <th scope="col">Especialización</th>
                  <th scope="col">Comuna</th>
                  <th class="pa-0 ma-0"></th>
                  <th class="pa-0 ma-0"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((todo) => {
                  return (
                    <tr>
                      <td>{todo.first_name}</td>
                      <td>{todo.last_name}</td>
                      <td>{todo.geographic_location}</td>
                      <td>{todo.specialization}</td>
                      <td><button class="btn btn-primary me-md-2" type="button">edit</button></td>
                      <td><button class="btn btn-danger me-md-2" type="button">delete</button></td>
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
