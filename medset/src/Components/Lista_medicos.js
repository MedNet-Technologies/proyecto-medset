import React, {useEffect, useState} from 'react'
import {Link} from "wouter";
import Moment from 'moment';


export default function Lista_medicos () {
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
      <div className="card border-secondary mb-3 mt-3 shadow-lg"
      style={{ maxWidth: "70rem" }}>
          <h1  style={{fontWeight: 700}}>Seleccione un paciente</h1>
          <div className="card-body" >
              
          {!data ? (
        <table class="table-responsive">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha ingreso</th>
              <th></th>
              {/* <th scope="col">fecha salida</th> */}
            </tr>
          </thead>
          <tbody>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </tbody>
        </table>
      ) : (
        <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha ingreso</th>
              <th></th>
              {/* <th scope="col">fecha salida</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => {
              const auxval = `/nuevo_proceso/paciente_${todo.id_paciente}`;

              return (
                <tr>
                  <td>{todo.first_name}</td>
                  <td>{todo.last_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      )}
       </div>
      </div>
  )
  ;
}