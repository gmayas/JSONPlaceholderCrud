//
let storageToTable = () => {
  try {
    const dataUsers = JSON.parse(localStorage.getItem('users'));
    let tableHead = `<thead>
                       <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Acciones</th>
                       </tr>
                      </thead>`;
    let tableContent = "";
    dataUsers.map((value) => {
      tableContent += `<tr>   
                                <td>${value.id}</td>
                                <td>${value.name}</td>
                                <td>${value.username}</td>
                                <td>${value.email}</td>
                                <td>
                                   <div class="btn-group d-flex gap-2 mb-0">
                                     <button type="button" class="btn btn-primary btn-more" data-bs-toggle="modal" data-placement="top" title="See more" data-bs-target="#modalSeeMore">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"></path>
                                        </svg></button>
                                      <button type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-placement="top" title="Delete" data-bs-target="#modalDelete">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg></button>                                        
                                    </div>		
                                </td>
                         </tr>`
    });
    let tableGral = `${tableHead} <tbody> ${tableContent} </tbody>`;
    document.getElementById("userList").innerHTML = tableGral;
  }
  catch (e) {
    console.log(e)
  }
};

storageToTable();

//
const getUserId = (idUser) => {
  try {
    const data = { "id": +idUser };
    const dataUsers = JSON.parse(localStorage.getItem('users'));
    const dataUser = dataUsers.find(user => user.id === data.id);
    return dataUser;
  }
  catch (e) {
    console.log(e)
    return {}
  }
};

//
const delUserId = (idUser) => {
  try {
    const data = { "id": +idUser };
    const dataUsers = JSON.parse(localStorage.getItem('users'));
    const dataUser = dataUsers.filter(user => user.id !== data.id);
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(dataUser))
  }
  catch (e) {
    console.log(e)
  }
};

//
const newUserId = (dataNewUser) => {
  try {
    let dataUsers = JSON.parse(localStorage.getItem('users'));
    dataUsers.push(dataNewUser);
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(dataUsers))
  }
  catch (e) {
    console.log(e)
  }
};

// Evento boton More
$(document).on("click", ".btn-more", (e) => {
  e.preventDefault();
  const id = $(e.target).closest('tr').find('td:first').text();
  const dataUser = getUserId(id);
  document.getElementById("idUser").value = dataUser.id;
  document.getElementById("userName").value = dataUser.name;
  document.getElementById("nameUser").value = dataUser.username;
  document.getElementById("userEmail").value = dataUser.email;
  document.getElementById("userPhone").value = dataUser.phone;
  document.getElementById("userCompany").value = dataUser.company.name;
  document.getElementById("userStreet").value = dataUser.address.street;
  document.getElementById("userSuite").value = dataUser.address.suite;
  document.getElementById("userCity").value = dataUser.address.city;
  document.getElementById("userZipCode").value = dataUser.address.zipcode;
});

// Evento boton Delete
$(document).on("click", ".btn-delete", (e) => {
  e.preventDefault();
  const id = $(e.target).closest('tr').find('td:first').text();
  const dataUser = getUserId(id);
  document.getElementById("idUserDelete").value = dataUser.id;
  document.getElementById("userNameDelete").value = dataUser.name;
  document.getElementById("nameUserDelete").value = dataUser.username;
  document.getElementById("userEmailDelete").value = dataUser.email;
});

// Evento boton Delete
$(document).on("click", "#btnOkDelete", (e) => {
  e.preventDefault();
  const id = $("#idUserDelete").val();
  const dataUser = getUserId(id);
  delUserId(id)
  location.reload();
});

// Evento boton new user
$(document).on("click", "#btnNewUser", (e) => {
  e.preventDefault();
  const id = +Math.floor(Math.random() * 10000);
  document.getElementById("idNewUser").value = id;
  document.getElementById("btnOkNewUser").disabled = true;
});

// Evento boton Ok new user
$(document).on("click", "#btnOkNewUser", (e) => {
  e.preventDefault();
  document.getElementById("nameReq").style.display = "none";
  document.getElementById("userNameReq").style.display = "none";
  document.getElementById("emailReq").style.display = "none";
  const dataNewUser = {
    "id": +document.getElementById("idNewUser").value,
    "name": document.getElementById("newUserName").value,
    "username": document.getElementById("newNameUSer").value,
    "email": document.getElementById("newUserEmail").value,
    "address": {
      "street": document.getElementById("newUserStreet").value,
      "suite": document.getElementById("newUserSuite").value,
      "city": document.getElementById("newUserCity").value,
      "zipcode": document.getElementById("newUserZipCode").value,
      "geo": {
        "lat": "",
        "lng": ""
      }
    },
    "phone": document.getElementById("newUserPhone").value,
    "website": "",
    "company": {
      "name": document.getElementById("newUserCompany").value,
      "catchPhrase": "",
      "bs": ""
    }
  };
  newUserId(dataNewUser);
  location.reload();
});

// Evento boton Close new user
$(document).on("click", "#btnCloseNewUser", (e) => {
  e.preventDefault();
  document.getElementById("nameReq").style.display = "none";
  document.getElementById("userNameReq").style.display = "none";
  document.getElementById("emailReq").style.display = "none";
  document.getElementById("btnOkNewUser").disabled = true;
  document.getElementById("alertOk").style.visibility = "hidden";
  document.getElementById("spinnerSave").style.visibility = "hidden";
});

// Evento boton Close new user
$(document).on("click", "#btnCloseNewUserPrimary", (e) => {
  e.preventDefault();
  document.getElementById("nameReq").style.display = "none";
  document.getElementById("userNameReq").style.display = "none";
  document.getElementById("emailReq").style.display = "none";
  document.getElementById("btnOkNewUser").disabled = true;
  document.getElementById("alertOk").style.visibility = "hidden";
  document.getElementById("spinnerSave").style.visibility = "hidden";
});

// Evento boton validar requeridos
$(document).on("click", "#btnValReq", (e) => {
  e.preventDefault();
  const nameElement = document.getElementById("newUserName").value;
  const userNameElement = document.getElementById("newNameUSer").value;
  const emailElement = document.getElementById("newUserEmail").value;
  if (Object.keys(nameElement).length === 0 || Object.keys(userNameElement).length === 0 || Object.keys(emailElement).length === 0) {
    document.getElementById("nameReq").style.display = "inline";
    document.getElementById("userNameReq").style.display = "inline";
    document.getElementById("emailReq").style.display = "inline";
    document.getElementById("btnOkNewUser").disabled = true;
  } else {
    document.getElementById("nameReq").style.display = "none";
    document.getElementById("userNameReq").style.display = "none";
    document.getElementById("emailReq").style.display = "none";
    document.getElementById("btnOkNewUser").disabled = false;
  }
});