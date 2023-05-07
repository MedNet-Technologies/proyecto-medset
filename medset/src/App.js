import logo from './logo.svg';
import './App.css';
import { Route } from "wouter";

import Lista_medicos from './Components/Lista_medicos';

function App() {
  return (
    <div className="App">
          <Route component={Lista_medicos} path="/lista_medicos" />
      
    </div>
  );
}

export default App;
