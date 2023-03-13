const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);

function loadAllData() {
  fetch('http://localhost:8080/student/getAll', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  })
      .then(res => res.json())
      .then(dataset => {
          $("#myTable").DataTable({
              data: dataset,
              "columns": [
                  { "data": "id" },
                  { "data": "name" },
                  { "data": "address" },
                  { "data": "salary" },
              ]
          })
      })
      .catch(err => console.log(err))
}


hideContent();

function hideContent() {
    document.getElementById('form').style.display = "none";
    document.getElementById('table').style.display = "none";
    document.getElementById('management-welcome').style.display = "block";
    
}
function showHome(){
  document.getElementById('form').style.display = "none";
    document.getElementById('table').style.display = "none";
    document.getElementById('management-welcome').style.display = "block";
}


function ShowAddStudent() {
  document.getElementById('form').style.display = "block";
  document.getElementById('table').style.display = "none";
  document.getElementById('management-welcome').style.display = "none";
    
}



function ShowAllLoadedStudents() {
  document.getElementById('form').style.display = "none";
  document.getElementById('table').style.display = "block";
  document.getElementById('management-welcome').style.display = "none";

  /*  $(document).ready(function(){
        const baseurl = "http://localhost:8080/student";
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",baseurl+"/getAll",true);
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                const student = JSON.parse(xmlhttp.responseText);
                $("#myTable").DataTable({
                    data:student,
                    "columns" :[
                        {"data":"id"},
                        {"data":"name"},
                        {"data":"address"},
                        {"data":"salary"}
                    ]
                });
            }
        }
        xmlhttp.send();
    });*/

  
    
}