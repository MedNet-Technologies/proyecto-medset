const url = "http://54.207.227.87:8080/medics"

export default function getDataMedicos(){
    return fetch(url)
    .then(res => res.data);
};