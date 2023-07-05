import React from 'react' ;
import { Link } from 'wouter' ;

function Home() {
  return (
    <Link to="/lista_medicos">
        <button type="button" id="nombre" className="btn btn-primary btn-lg">Bienvenidos</button>
    </Link>
  );
}

export default Home;