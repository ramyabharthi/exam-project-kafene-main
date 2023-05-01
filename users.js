

// login Credentials
let loginCredentials = localStorage.getItem("loginStatus");
if(loginCredentials == null || loginCredentials == "false"){
    location.assign("./index.html");
}

// API Fetch Here using Function
var tableData = [];
$.ajax({
    url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    type: "GET",
    success: function(response){ // Checking Success Response
        console.log(response);
        tableData = response;
        rowMaking(tableData);
    },
    error: function(error){
        console.log(error);
    }
})

function rowMaking(data) {
    $("#tableBody").html("");
    for (let i = 0; i < data.length; i++) {
        data[i].dob.split("-");
    }
    for (let i = 0; i < data.length; i++) {
        $(`#tableBody`).append(
            $("<tr>").append(
            $("<td>").attr("class", "dimColor").text(data[i].id),
            $("<td>").html(`<img src="${data[i].profilePic}" alt="profilePic"/>`),
            $("<td>").attr("class", "dimColor").text(`${data[i].fullName}`),
            $("<td>").text(`${data[i].dob}`),
            $("<td>").attr("class", "dimColor").text(data[i].gender),
            $("<td>").attr("class", "dimColor").text(`${data[i].currentCity}, ${data[i].currentCountry}`)
            )
        );
    }
}

// Search Functionality
let inputVal = document.getElementById("search-box");
$(`#cross`).click(() => {
    inputVal.value = "";
    rowMaking(tableData);
});

$(`#reset`).click(() => {
    inputVal.value = "";
    rowMaking(tableData);
});
setInterval(() => {
    var search = document.getElementById("search-box").value.length;
    if (search > 0) {
        $(`#cross`).show();
    } 
    else {
        $(`#cross`).hide();
    }
}, 0);

// Calling Function for form Search
document.getElementById("searchForm").onsubmit = (e) => {
    e.preventDefault();
    const value = $("#search-box").val();
    if (value.length >= 2) {
    let filteredData = search(value, tableData);
    rowMaking(filteredData);
    } 
    else {
        alert("Please enter at least 2 characters");
        rowMaking(tableData);
    }
};

function search(value, data) {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase();
        var firstName = data[i].fullName.toLowerCase();
        if (firstName.includes(value)) {
            newData.push(data[i]);
        }
    }
    return newData;
}

document.getElementById("sign-out").addEventListener("click", function () {
    localStorage.setItem("loginStatus", false);
    location.assign("./index.html");
});