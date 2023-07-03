const url = "http://15.228.191.117:8080/medics"

const fetchData = () => {
    return fetch(`http://15.228.191.117:8080/medics`)
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