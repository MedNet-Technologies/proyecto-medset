import React from 'react' ;
import { Link } from 'wouter' ;

function Home() {
  return (
    <Link to="/lista_medicos">
        <button type="button" className="btn btn-primary btn-lg">Médicos</button>
    </Link>
  );
}

export default Home;