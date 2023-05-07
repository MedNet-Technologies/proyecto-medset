import React, {useEffect, useState} from 'react'
import {Link} from "wouter";
import getDataMedicos from '../Services/getDataMedicos';
import Moment from 'moment';


export default function Lista_medicos () {

    const [todos, setTodos] = useState()

    useEffect(() => {
      getDataMedicos().then(todos => setTodos(todos))
    }, [])

    return (
        <div className="card border-secondary mb-3 mt-3 shadow-lg"
        style={{ maxWidth: "70rem" }}>
            <h1  style={{fontWeight: 700}}>Seleccione un Médico</h1>
            <div className="card-body" >
                
            {!todos ? (
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
                <th scope="col">Apellido</th>
                <th></th>
                {/* <th scope="col">fecha salida</th> */}
              </tr>
            </thead>
            
            <tbody>
              {todos.map((todo) => {
                const auxval = `/nuevo_proceso/medico_${todo.medic_id}`;

                return (
                  <tr>
                    <td>{todo.first_name}</td>
                    <td>{todo.last_name}</td>
                    {/* <td>{Moment(todo.salida).format('DD-MM-YYYY HH:mm')}</td> */}
                    <td>
                    <Link to={auxval}><button class = "btn btn-primary">Seleccionar</button></Link>
                    </td>
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

}