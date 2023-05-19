const url = "http://54.207.227.87:8080/medics"

const fetchData = () => {
    return fetch(`http://54.207.227.87:8080/medics`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData.medics);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

export default fetchData;