var data = "{\"projects\":[{\"projectName\":\"Fernando Abbott 866\",\"projectPrice\":\"62\",\"projectArea\":\"100\",\"projectAge\":\"5\",\"projectCategory\":\"Residential\"},{\"projectName\":\"AM House\",\"projectPrice\":\"72\",\"projectArea\":\"150\",\"projectAge\":\"2\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Fortalenza Photography Museum\",\"projectPrice\":\"50\",\"projectArea\":\"70\",\"projectAge\":\"10\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Adelaid Previdi Corporate\",\"projectPrice\":\"90\",\"projectArea\":\"190\",\"projectAge\":\"7\",\"projectCategory\":\"Commercial\"},{\"projectName\":\"Casa America Building\",\"projectPrice\":\"40\",\"projectArea\":\"120\",\"projectAge\":\"10\",\"projectCategory\":\"Residential\"},{\"projectName\":\"Quest MM18 Arquiteyura\",\"projectPrice\":\"95\",\"projectArea\":\"200\",\"projectAge\":\"1\",\"projectCategory\":\"Residential\"}]}";

document.addEventListener("DOMContentLoaded", function () {
    var projects = JSON.parse(data).projects;
    var tableBody = document.getElementById("projectTable").querySelector("tbody");
    for (i in projects) {
        var newRow = tableBody.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = projects[i].projectName;

        var newCell = newRow.insertCell();
        newCell.innerHTML = projects[i].projectPrice + "Lac";

        var newCell = newRow.insertCell();
        newCell.innerHTML = projects[i].projectArea + "SqFt";

        var newCell = newRow.insertCell();
        newCell.innerHTML = projects[i].projectAge + "Yrs";

        var newCell = newRow.insertCell();
        newCell.innerHTML = projects[i].projectCategory;
    }
});