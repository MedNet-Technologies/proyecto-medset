import "./App.css";
import { Route } from "wouter";


import Home from './Components/Home';

import Lista_medicos from "./Components/Lista_medicos";
import Formulario_MedicoNuevo from "./Components/Formulario_NuevoMedico";

function App() {
  return (
    <div className="App">
      <Route component={Home} exact path="/" />
      <Route component={Lista_medicos} path="/lista_medicos" />
      <Route component={Formulario_MedicoNuevo} path="/formulario_medicos" />
    </div>
  );
}

export default App;
