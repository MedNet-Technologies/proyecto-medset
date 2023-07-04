import "./App.css";
import { Route } from "wouter";
import { useEffect } from 'react';  
import Home from './Components/Home';
import Lista_medicos from "./Components/Lista_medicos";
import Formulario_NuevoMedico from "./Components/Formulario_NuevoMedico";
import Editar_medico from "./Components/Editar_Medico";
import Lista_medicos_citas from "./Components/Lista_medicos_citas";
import Formulario_Nuevacita from "./Components/Formulario_Nuevacita";

function App() {

  return (
    <div className="App">
          <Route component={Home} exact path="/"/>
          <Route component={Lista_medicos} path="/lista_medicos" />
          <Route component={Formulario_NuevoMedico} path="/formulario_medicos"/>
          <Route component={Editar_medico} path="/formulario_medicos/:keyword"/>
          <Route component={Lista_medicos_citas} path="/lista_medicos_citas"/>
          <Route component={Formulario_Nuevacita} path="/nueva_cita/:keyword"/>
    </div>
  );
}

export default App;
