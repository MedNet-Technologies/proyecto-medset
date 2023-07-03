import "./App.css";
import { Route } from "wouter";
import { useEffect } from 'react';  
import Home from './Components/Home';
import Lista_medicos from "./Components/Lista_medicos";
import Formulario_NuevoMedico from "./Components/Formulario_NuevoMedico";
import Editar_medico from "./Components/Editar_Medico";
import Lista_medicos_citas from "./Components/Lista_medicos_citas";
import Formulario_Nuevacita from "./Components/Formulario_Nuevacita";
import {runSeleniumTest} from "./seleniumAutomation";
import { Builder } from 'selenium-webdriver';

function App() {

  useEffect(() => {
    async function handleButtonClick() {
      // Create a new WebDriver instance
      const driver = new Builder().forBrowser('firefox').build();

      // Perform login automation
      await runSeleniumTest(driver);

      // Close the browser and quit the WebDriver
      await driver.quit();
    }

    handleButtonClick();
  }, []);

  return (
    <div className="App">
          <Route component={Home} exact path="/"/>
          <Route component={Lista_medicos} path="/lista_medicos" />
          <Route component={Formulario_NuevoMedico} path="/formulario_medicos"/>
          <Route component={Editar_medico} path="/formulario_medicos/:keyword"/>
          <Route component={Lista_medicos_citas} path="/lista_medicos_citas"/>
          <Route component={Formulario_Nuevacita} path="/nueva_cita/:keyword"/>
          <button onClick={handleButtonClick}>Perform Login</button>
    </div>
  );
}

export default App;
