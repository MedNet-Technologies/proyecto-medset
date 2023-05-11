import logo from './logo.svg';
import './App.css';
import { Route } from "wouter";

import Lista_medicos from './Components/Lista_medicos';
import Inicio from './Components/Inicio';

function App() {
  return (
    <div className="App">
          <Route component={Lista_medicos} path="/lista_medicos" />
          <Route component={Inicio} path='/'/>
      
    </div>
  );
}

export default App;
