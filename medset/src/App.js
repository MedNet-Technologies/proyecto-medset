import logo from './logo.svg';
import './App.css';
import { Route } from "wouter";

import Lista_medicos from './Components/Lista_medicos';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
          <Route component={Home} exact path="/"/>
          <Route component={Lista_medicos} exact path="/lista_medicos"/>  
    </div>
  );
}

export default App;
