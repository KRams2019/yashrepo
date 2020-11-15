//'use strict';

const url__ = "https://hindustan-sales-corporation.herokuapp.com/";
// const url__ =  "http://localhost:8080/";

var multipleUploadForm = document.querySelector('#multipleUploadForm');
var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');
var multipleFileUploadError = document.querySelector('#multipleFileUploadError');
var multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess');


function uploadMultipleFiles(files) {
    var formData = new FormData();
    for (var index = 0; index < files.length; index++) {
        formData.append("files1", files[index]);
    }
    formData.append("passedToken", localStorage.getItem('agri_token'));

    for (var key of formData.entries()) {
        // console.log(key);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url__ + "uploadMultipleFiles");

    xhr.onload = function() {
        console.log(xhr.responseText);
        var response = xhr.responseText;

        if (xhr.status == 200) {
            window.location = "gallery_admin.html";

        }
    }

    xhr.send(formData);
}

multipleUploadForm.addEventListener('submit', function(event) {
    var files = multipleFileUploadInput.files;
    if (files.length === 0) {
        multipleFileUploadError.innerHTML = "Please select at least one file";
        multipleFileUploadError.style.display = "block";
    }
    console.log(files);
    let size = 0;
    for (let i = 0; i < files.length; i++) {
        size = size + files[i].size;
    }
    size = size / (1024 * 1024);
    if (size <= 30) {
        uploadMultipleFiles(files);
    } else {
        multipleFileUploadError.innerHTML = "Please select  file less than or equal to 30MB";
        multipleFileUploadError.style.display = "block";
        setTimeout(() => {
            multipleFileUploadError.style.display = "none";
        }, 3000);

    }


    event.preventDefault();
}, true);