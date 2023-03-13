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
        headers: {'Content-Type': 'application/json'}

    })
        .then(res => res.json())
        .then(dataset => {

            $("#myTable").DataTable({

                data: dataset,
                "columns": [
                    {"data": "id"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "salary"}
                ],
                "bDestroy": true

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

function showHome() {
    document.getElementById('form').style.display = "none";
    document.getElementById('table').style.display = "none";
    document.getElementById('management-welcome').style.display = "block";
}


function ShowAddStudent() {
    document.getElementById('form').style.display = "block";
    document.getElementById('table').style.display = "none";
    document.getElementById('management-welcome').style.display = "none";

}


var count = 1;

function ShowAllLoadedStudents() {

   /* if (count >= 2) {
        location.reload();

    }
    count++;*/


    document.getElementById('form').style.display = "none";
    document.getElementById('table').style.display = "block";
    document.getElementById('management-welcome').style.display = "none";

    /* $(document).ready(function(){
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
    loadAllData();

}

/*$("#saveStudent").click(function (){
    var id=$("#st-id").val();
    var name=$("#name").val();
    var address=$("#address").val();
    var salary=$("#salary").val();

    $.post("http://localhost:8080/student",{
        id:id,
        name:name,
        address:address,
        salary:salary
    },function (response){
        $("#response").html("<div class='alert alert-success'>"+
            response.message+"</div>")
        clearField();

    });
});*/
function clearField() {
    $("#st-id").val("");
    $("#name").val("");
    $("#address").val("");
    $("#salary").val("");
}

function saveData() {

    if ($("#st-id").val() == "" || $("#name").val() == "" || $("#address").val() == ""
        || $("#salary").val() == "") {
        $("#response").html("<div class='alert alert-warning col p-1 m-0' role='alert'>"
            + "First Fill All Fields" + "</div>")

    } else {
        var st_id = $("#st-id").val();
        var st_name = $("#name").val();
        var st_address = $("#address").val();
        var st_salary = $("#salary").val();

        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: st_id,
                name: st_name,
                address: st_address,
                salary: st_salary


            })
        }).then(response => {
            if (response.ok) {
                console.log('save successful');
                $("#response").html("<div class='alert alert-success col p-1 m-0' role='alert'>"
                    + "Saved Successfully" + "</div>")
            } else {
                console.log('save failed');
                $("#response").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "Failed to Save Data" + "</div>")
            }
        }).catch(err => {
                console.log(err.message)
                $("#response").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "An error occurred" + "</div>")
            }).finally(clearField())

    }
}

