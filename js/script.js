var data = "{\"projects\":[{\"projectName\":\"Fernando Abbott 866\",\"projectPrice\":\"62\",\"projectArea\":\"100\",\"projectAge\":\"5\",\"projectCategory\":\"Residential\"},{\"projectName\":\"AM House\",\"projectPrice\":\"72\",\"projectArea\":\"150\",\"projectAge\":\"2\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Fortalenza Photography Museum\",\"projectPrice\":\"50\",\"projectArea\":\"70\",\"projectAge\":\"10\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Adelaid Previdi Corporate\",\"projectPrice\":\"90\",\"projectArea\":\"190\",\"projectAge\":\"7\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Casa America Building\",\"projectPrice\":\"40\",\"projectArea\":\"120\",\"projectAge\":\"10\",\"projectCategory\":\"Residential\"},{\"projectName\":\"Quest MM18 Arquiteyura\",\"projectPrice\":\"95\",\"projectArea\":\"200\",\"projectAge\":\"1\",\"projectCategory\":\"Residential\"}]}";
var projects;

var table = document.getElementById("projectTable");
var tableBody = table.querySelector("tbody");

var areaFilterBar = document.getElementById("areaFilterBar");
var ageFilterBar = document.getElementById("ageFilterBar");
var priceFilterBar = document.getElementById("priceFilterBar");

var areaFilterValue = document.getElementById("areaFilterValue");
var ageFilterValue = document.getElementById("ageFilterValue");
var priceFilterValue = document.getElementById("priceFilterValue");

var categoryResidential = document.getElementById("categoryResidential");
var categoryCommercial = document.getElementById("categoryCommercial");

function showFilterBarValues() {
    areaFilterValue.innerHTML = "Value: " + areaFilterBar.value;
    ageFilterValue.innerHTML = "Value: " + ageFilterBar.value;
    priceFilterValue.innerHTML = "Value: " + priceFilterBar.value;
}

document.addEventListener("DOMContentLoaded", function () {
    projects = JSON.parse(data).projects;
    applyFilters();
});

function addCellData(row, colData) {
    var newCell = row.insertCell();
    newCell.innerHTML = colData;
}

function applyFilters() {
    var rowNo = 0;
    var noResults = true;
    showFilterBarValues();
    tableBody.innerHTML = "";

    var onlyResidential = categoryResidential.checked;
    var onlyCommercial = categoryCommercial.checked;
    var both = onlyResidential == onlyCommercial;

    for (project of projects) {
        if (Number(areaFilterBar.value) >= project.projectArea && Number(ageFilterBar.value) >= project.projectAge && Number(priceFilterBar.value) >= project.projectPrice &&
            (project.projectCategory == (onlyResidential || both ? "Residential" : "") || project.projectCategory == (onlyCommercial || both ? "Commercial" : ""))) {
            noResults = false;
            var newRow = tableBody.insertRow();

            addCellData(newRow, project.projectName);
            addCellData(newRow, project.projectPrice + "Lac");
            addCellData(newRow, project.projectArea + "SqFt");
            addCellData(newRow, project.projectAge + "Yrs");
            addCellData(newRow, project.projectCategory);
            addCellData(newRow, "<span onclick='removeProject(this)' data-row='" + (rowNo++) + "'><i class='fas fa-times fa-2x text-danger'></i></span>");
        }
    }

    var newRow = tableBody.insertRow();
    addCellData(newRow, "<input type='text' class='form-control' name='newProjectName' id='newProjectName'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectPrice' min='1' max='95' id='newProjectPrice'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectArea' min='1' max='200' id='newProjectArea'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectAge' min='1' max='50' id='newProjectAge'>");
    addCellData(newRow, "<select class='form-control' name='newProjectCategory' id='newProjectCategory'>" +
        "<option value='Residential'>Residential</option><option value='Commercial'>Commercial</option></select>");
    addCellData(newRow, "<span onclick='addProject()'><i class='fas fa-plus fa-2x text-success'></i></span>");

    if (noResults) {
        var newRow = tableBody.insertRow();
        var newCell = newRow.insertCell();
        newCell.colSpan = 5;
        newCell.innerHTML = "<h4 class='text-center my-5'>No Results</h4>";
    }
}

function removeProject(obj) {
    projects.splice(obj.getAttribute('data-row'), 1);
    tableBody.deleteRow(obj.getAttribute('data-row'));
}

function validateProject(project) {
    if (project.projectName == "") {
        $('#alertModal').find('.modal-body').html("Enter valid name");
        $('#alertModal').modal();
        return false;
    }

    if (project.projectPrice == "" || project.projectPrice > 95) {
        $('#alertModal').find('.modal-body').html("Enter valid price");
        $('#alertModal').modal();
        return false;
    }

    if (project.projectArea == "" || project.projectArea > 200) {
        $('#alertModal').find('.modal-body').html("Enter valid area");
        $('#alertModal').modal();
        return false;
    }

    if (project.projectAge == "" || project.projectAge > 10) {
        $('#alertModal').find('.modal-body').html("Enter valid age");
        $('#alertModal').modal();
        return false;
    }

    return true;
}

function addProject() {
    var newProjectName = document.getElementById("newProjectName").value;
    var newProjectPrice = document.getElementById("newProjectPrice").value;
    var newProjectArea = document.getElementById("newProjectArea").value;
    var newProjectAge = document.getElementById("newProjectAge").value;
    var newProjectCategory = document.getElementById("newProjectCategory").value;

    var project = {
        projectName: newProjectName,
        projectPrice: Number(newProjectPrice),
        projectArea: Number(newProjectArea),
        projectAge: Number(newProjectAge),
        projectCategory: newProjectCategory
    };

    if (validateProject(project)) {
        projects.push(project);
        applyFilters();
    }
}
