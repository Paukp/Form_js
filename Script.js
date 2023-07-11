// Almacenar datos en el objeto y convertirlo en JSON
function saveDataToJSON(data, filename) {
    const formulario = document.querySelector('#formulario');
    const procesaTodo= (event)=>{
        event.preventDefault();
        const datos= new FormData(EventTarget);
        console.log(EventTarget);
        console.log(datos);
        const datosCompletos = Object.fromEntries(datos.entries);
        console.log(json.stringify(datosCompletos));

    }
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  
  // Leer datos JSON y mostrarlos en la página
  function showDataOnPage(data, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
  
    data.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.textContent = JSON.stringify(item);
      element.appendChild(listItem);
    });
  }
  
  $(document).ready(function () {
    let doctors = [];
    let patients = [];
  
    // Manejar envío de formulario de Doctores
    $("#doctor-form").submit(function (event) {
      event.preventDefault();
  
      // Obtener valores de los campos del formulario
      const name = $("#doctor-name").val();
      const lastName = $("#doctor-lastname").val();
      const cedula = $("#doctor-cedula").val();
      const specialty = $("#doctor-specialty").val();
      const office = $("#doctor-office").val();
      const email = $("#doctor-email").val();
  
      // Crear objeto Doctor
      const doctor = {
        name,
        lastName,
        cedula,
        specialty,
        office,
        email,
      };
  
      // Agregar el objeto Doctor al array
      doctors.push(doctor);
  
      // Guardar datos en el archivo JSON
      saveDataToJSON(doctors, "doctors");
  
      // Limpiar campos del formulario
      $("#doctor-name").val("");
      $("#doctor-lastname").val("");
      $("#doctor-cedula").val("");
      $("#doctor-specialty").val("");
      $("#doctor-office").val("");
      $("#doctor-email").val("");
    });
  
    // Manejar envío de formulario de Pacientes
    $("#patient-form").submit(function (event) {
      event.preventDefault();
  
      // Obtener valores de los campos del formulario
      const name = $("#patient-name").val();
      const lastName = $("#patient-lastname").val();
      const cedula = $("#patient-cedula").val();
      const age = $("#patient-age").val();
      const phone = $("#patient-phone").val();
      const specialty = $("#patient-specialty").val();
  
      // Crear objeto Paciente
      const patient = {
        name,
        lastName,
        cedula,
        age,
        phone,
        specialty,
      };
  
      // Agregar el objeto Paciente al array
      patients.push(patient);
  
      // Guardar datos en el archivo JSON
      saveDataToJSON(patients, "patients");
  
      // Limpiar campos del formulario
      $("#patient-name").val("");
      $("#patient-lastname").val("");
      $("#patient-cedula").val("");
      $("#patient-age").val("");
      $("#patient-phone").val("");
      $("#patient-specialty").val("");
    });
  
    // Cargar datos de Pacientes y Doctores desde los archivos JSON
    $.getJSON("patients.json", function (data) {
      patients = data;
      showDataOnPage(patients, "patient-list");
    });
  
    $.getJSON("doctors.json", function (data) {
      doctors = data;
      showDataOnPage(doctors, "doctor-list");
    });
  });
  
  formulario.addEventListener('submit',procesaTodo);