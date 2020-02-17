var data = "{\"projects\":[{\"projectName\":\"Fernando Abbott 866\",\"projectPrice\":\"62\",\"projectArea\":\"100\",\"projectAge\":\"5\",\"projectCategory\":\"Residential\"},{\"projectName\":\"AM House\",\"projectPrice\":\"72\",\"projectArea\":\"150\",\"projectAge\":\"2\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Fortalenza Photography Museum\",\"projectPrice\":\"50\",\"projectArea\":\"70\",\"projectAge\":\"10\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Adelaid Previdi Corporate\",\"projectPrice\":\"90\",\"projectArea\":\"190\",\"projectAge\":\"7\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Casa America Building\",\"projectPrice\":\"40\",\"projectArea\":\"120\",\"projectAge\":\"10\",\"projectCategory\":\"Residential\"},{\"projectName\":\"Quest MM18 Arquiteyura\",\"projectPrice\":\"95\",\"projectArea\":\"200\",\"projectAge\":\"1\",\"projectCategory\":\"Residential\"}]}";

var tableBody = document.getElementById("projectTable").querySelector("tbody");

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
    applyFilters();
});

function applyFilters() {
    showFilterBarValues();
    tableBody.innerHTML = "";
    var projects = JSON.parse(data).projects;

    var onlyResidential = categoryResidential.checked;
    var onlyCommercial = categoryCommercial.checked;
    var both = onlyResidential == onlyCommercial;

    for (project of projects) {
        if (Number(areaFilterBar.value) >= project.projectArea && Number(ageFilterBar.value) >= project.projectAge && Number(priceFilterBar.value) >= project.projectPrice &&
            (project.projectCategory == (onlyResidential || both ? "Residential" : "") || project.projectCategory == (onlyCommercial || both ? "Commercial" : ""))) {
            var newRow = tableBody.insertRow();
            var newCell = newRow.insertCell();
            newCell.innerHTML = project.projectName;

            var newCell = newRow.insertCell();
            newCell.innerHTML = project.projectPrice + "Lac";

            var newCell = newRow.insertCell();
            newCell.innerHTML = project.projectArea + "SqFt";

            var newCell = newRow.insertCell();
            newCell.innerHTML = project.projectAge + "Yrs";

            var newCell = newRow.insertCell();
            newCell.innerHTML = project.projectCategory;
        }
    }
}
