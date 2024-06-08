// URL de Api Rest
let restServerUrl = "https://jsonplaceholder.typicode.com/users";
 
// Función que retorna la informacion de los usuarios (lista) y los guarda en local storage
const getUsers = async () => {
  try {
    let response = await fetch(restServerUrl);
    let dataReturn = await response.json()
    return dataReturn;
  } catch (e) {
    console.log(e);
    return {e}
  }
};

//
let getUsersToStorage = async () => {
  try {
      let dataRes = await getUsers();
      console.log("getUsersToStorage: ",dataRes)
      localStorage.setItem("users", JSON.stringify(dataRes))
  }
  catch (e) {
      console.log(e)
  }
}; 

await getUsersToStorage ();