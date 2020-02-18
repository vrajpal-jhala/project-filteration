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

var searchBar = document.getElementById("searchProject");

var areaLowerRange = 0, areaUpperRange = 0, ageLowerRange = 0, ageUpperRange = 0, priceLowerRange = 0, priceUpperRange = 0;

function showFilterBarValues() {
    areaFilterValue.innerHTML = "Value: " + areaFilterBar.value;
    ageFilterValue.innerHTML = "Value: " + ageFilterBar.value;
    priceFilterValue.innerHTML = "Value: " + priceFilterBar.value;
}

document.addEventListener("DOMContentLoaded", function () {
    projects = JSON.parse(data).projects;
    applyFilters();

    document.getElementById("projectTable").onclick = function (e) {
        var column = e.target;
        if (e.target.tagName == "TD" && !e.target.querySelector("span")) {
            var row = column.parentNode;
            var rowNo = row.querySelector("span").getAttribute("data-row");
            var columnNo = Array.from(row.querySelectorAll("td")).findIndex(column => column == e.target);

            currValue = column.innerHTML;
            if (columnNo == 1) {
                currValue = currValue.slice(0, -3);
            }

            if (columnNo == 2) {
                currValue = currValue.slice(0, -4);
            }

            if (columnNo == 3) {
                currValue = currValue.slice(0, -3);
            }

            if (columnNo == 4) {
                column.innerHTML = "<select name='newValue' id='newValue' class='form-control' onchange='updateProject(this, " + rowNo
                    + ")' onblur='updateProject(this, " + rowNo + ")' data-col='" + columnNo + "'><option value='Residential'>Residential</option>" +
                    "<option value='Commercial'>Commercial</option></select>"
            } else {
                column.innerHTML = "<input type='text' class='form-control' id='newValue' name='newValue' onchange='updateProject(this, "
                    + rowNo + ")' onblur='undoUpdate(this, " + rowNo + ")' value='" + currValue + "' data-col='" + columnNo + "'>";
            }

            document.getElementById("newValue").focus();
        }
    };
});

function setFilterBarRange(project) {
    ageLowerRange = ageLowerRange == 0 ? Number(project.projectAge) : ageLowerRange;
    areaLowerRange = areaLowerRange == 0 ? Number(project.projectArea) : areaLowerRange;
    priceLowerRange = priceLowerRange == 0 ? Number(project.projectPrice) : priceLowerRange;

    if (project.projectAge < ageLowerRange) {
        ageLowerRange = Number(project.projectAge);
        ageFilterBar.setAttribute("min", ageLowerRange);
    }

    if (project.projectAge > ageUpperRange) {
        ageUpperRange = Number(project.projectAge);
        ageFilterBar.setAttribute("max", ageUpperRange);
    }

    if (project.projectArea < areaLowerRange) {
        areaLowerRange = Number(project.projectArea);
        areaFilterBar.setAttribute("min", areaLowerRange);
    }

    if (project.projectArea > areaUpperRange) {
        areaUpperRange = Number(project.projectArea);
        areaFilterBar.setAttribute("max", areaUpperRange);
    }

    if (project.projectPrice < priceLowerRange) {
        priceLowerPrice = Number(project.projectPrice);
        priceFilterBar.setAttribute("min", priceLowerRange);
    }

    if (project.projectPrice > priceUpperRange) {
        priceUpperRange = Number(project.projectPrice);
        priceFilterBar.setAttribute("max", priceUpperRange);
    }
}

function addCellData(row, colData) {
    var newCell = row.insertCell();
    newCell.innerHTML = colData;
}

function applyFilters() {
    var rowNo = 0;
    var noResults = true;
    tableBody.innerHTML = "";

    var onlyResidential = categoryResidential.checked;
    var onlyCommercial = categoryCommercial.checked;
    var both = onlyResidential == onlyCommercial;

    for (project of projects) {
        setFilterBarRange(project);

        if (Number(areaFilterBar.value) >= project.projectArea && Number(ageFilterBar.value) >= project.projectAge && Number(priceFilterBar.value) >= project.projectPrice &&
            (project.projectCategory == (onlyResidential || both ? "Residential" : "") || project.projectCategory == (onlyCommercial || both ? "Commercial" : ""))
            && project.projectName.toLowerCase().includes(searchBar.value.toLowerCase())) {

            noResults = false;
            var newRow = tableBody.insertRow();

            addCellData(newRow, project.projectName);
            addCellData(newRow, project.projectPrice + "Lac");
            addCellData(newRow, project.projectArea + "SqFt");
            addCellData(newRow, project.projectAge + "Yrs");
            addCellData(newRow, project.projectCategory);
            addCellData(newRow, "<span onclick='removeProject(this)' data-row='" + rowNo + "'><i class='fas fa-times fa-2x text-danger'></i></span>");
        }

        rowNo++;
    }

    showFilterBarValues();

    var newRow = tableBody.insertRow();
    addCellData(newRow, "<input type='text' class='form-control' name='newProjectName' id='newProjectName'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectPrice' id='newProjectPrice'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectArea' id='newProjectArea'>");
    addCellData(newRow, "<input type='number' class='form-control' name='newProjectAge' id='newProjectAge'>");
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

    if (project.projectPrice == "") {
        $('#alertModal').find('.modal-body').html("Enter valid price");
        $('#alertModal').modal();
        return false;
    }

    if (project.projectArea == "") {
        $('#alertModal').find('.modal-body').html("Enter valid area");
        $('#alertModal').modal();
        return false;
    }

    if (project.projectAge == "") {
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
        projectPrice: newProjectPrice,
        projectArea: newProjectArea,
        projectAge: newProjectAge,
        projectCategory: newProjectCategory
    };

    if (validateProject(project)) {
        projects.push(project);
        applyFilters();
    }
}

function updateProject(obj) {
    var rowNo = Number(obj.parentNode.parentNode.querySelector("span").getAttribute("data-row"));
    var colNo = Number(obj.getAttribute("data-col"));

    if (colNo == 0)
        projects[rowNo].projectName = obj.value;

    if (colNo == 1)
        projects[rowNo].projectPrice = obj.value;

    if (colNo == 2)
        projects[rowNo].projectArea = obj.value;

    if (colNo == 3)
        projects[rowNo].projectAge = obj.value;

    if (colNo == 4)
        projects[rowNo].projectCategory = obj.value;

    applyFilters();
}

function undoUpdate(obj) {
    applyFilters();
}

function clearSearch() {
    searchBar.value = "";
    applyFilters();
}
