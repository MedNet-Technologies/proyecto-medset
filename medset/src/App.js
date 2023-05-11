import "./App.css";
import { Route } from "wouter";

import Lista_medicos from "./Components/Lista_medicos";
import Formulario_PacienteNuevo from "./Components/Formulario_NuevoMedico";

function App() {
  return (
    <div className="App">
      <Route component={Lista_medicos} path="/lista_medicos" />
      <Route component={Formulario_PacienteNuevo} path="/formulario_medicos" />
    </div>
  );
}

export default App;
