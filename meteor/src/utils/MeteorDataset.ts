export const BASE_URL = "https://data.nasa.gov/resource/y77d-th95.json";


export const getMeteors = () => {
    return fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(checkResponse)
      .then((data) => {
        return data;
      })
  };

  function checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
  
    return Promise.reject(`Error: ${res.status}  ${res.statusText}`);
  }
  