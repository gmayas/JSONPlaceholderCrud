// URL de Api Rest
let restServerUrl = "https://jsonplaceholder.typicode.com/users";

// Función que retorna la informacion de los usuarios (lista) y los guarda en local storage
const getUsers = async () => {
  try {
    let response = await fetch(restServerUrl);
    let dataReturn = await response.json()
    console.log(dataReturn);
    return dataReturn;
  } catch (e) {
    console.log(e);
    return {e}
  }
};

//
let setLocalStorage = async () => {
  try {
      let dataRes = await getUsers();
      console.log(dataRes)
      localStorage.setItem("users", JSON.stringify(dataRes))
  }
  catch (e) {
      console.log(e)
  }
}; 



// createUser
/**
 const createUser = (req, res) => {
  const data = {
    name: req.body.name.trim(),
    age: req.body.age.trim(),
    city: req.body.city.trim()
  };
  if (Object.keys(data.name).length === 0 || Object.keys(data.age).length === 0 || Object.keys(data.city).length === 0) {
     console.log('Todos los coampos son requeridos');
  } else {
    console.log('Excelente ...');
    axios.post(`${restServerUrl}/createUser`, data).then((response) => {
    console.log('response: ', response);
    });
  }
};**/

//Export methods
module.exports = { getUsers } // createUser };

