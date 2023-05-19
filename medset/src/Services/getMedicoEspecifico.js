export default function getPacienteEspecifico( {keyword} ){
    console.log(keyword)
    const url = process.env.REACT_APP_BACKEND_URL+"/api/ver-datos-paciente/" + keyword
    return fetch(url)
    .then(res => res.json())
    .then(res => res.data);
};
// Crear nueva ruta  en el backend preguntarle al juan o el andres, al respecto