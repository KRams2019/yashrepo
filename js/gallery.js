const url_gallery = 
// 'http://localhost:8080/';
"https://hindustan-sales-corporation.herokuapp.com/";


const url = url_gallery + "files";
const request = new Request(url);
let imageId = document.querySelector("#image_");
fetch(request, { mode: 'cors' }).then(res => res.clone().json())
    .then(json => {
        displayImage(json);
    }).catch(e => {
        console.log(e);
    })

function displayImage(imgData) {

    if (imgData.length === 0) {
        document.querySelector("#no_image_found").style.display = "block";

    } else {
        document.querySelector("#no_image_found").style.display = "none";
        let imageContainer = document.querySelector("#image_container");


        for (let i = 0; i < imgData.length; i++) {
            // creating new div
            let newDiv = document.createElement('div');
            newDiv.classList.add("col-md-3");
            newDiv.classList.add("col-sm-4");
            newDiv.classList.add("my-2");
            // newDiv.classList.add("mx-2");
           // newDiv.style.border = "1px solid grey";
            newDiv.setAttribute("id", imgData[i].name);

            // creating new image
            let newImage = document.createElement('img');
            newImage.setAttribute("src", imgData[i].url);
            newImage.setAttribute("height", 200);
            newImage.setAttribute("width", 200);
            // newImage.classList.add("img-class");
            newImage.classList.add("img-thumbnail");

            // creating delete btn
            let newButton = document.createElement("button");
            newButton.classList.add('btn');
            newButton.classList.add('btn-danger');
            newButton.classList.add('btn-block');
            newButton.classList.add('my-2');
            newButton.innerHTML = 'DELETE';

            newButton.addEventListener('click', () => {
                deleteImage(imgData[i].name);
            });



            newDiv.appendChild(newImage);
            newDiv.appendChild(newButton);

            imageContainer.appendChild(newDiv);
        }
    }

}

function deleteImage(imageName) {
    console.log(imageName);
    let map = new Map();
    map.set('passedToken', localStorage.getItem('agri_token'));
    map.set('imageName', imageName);
    const link = url_gallery + 'delete-image/' + imageName + '/' + localStorage.getItem('agri_token');
    console.log(link);
    fetch(link).then((response) => { return response.json() })
        .then(result => {
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function deleteAll() {
    const link = url_gallery + 'delete-all-pics/' + localStorage.getItem('agri_token');
    console.log(link);
    fetch(link).then((response) => { return response.json() })
        .then(result => {
            console.log('Success:', result);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return JSON.stringify(obj);
}

function logout() {
    const link = url_gallery + 'logout/' + localStorage.getItem('agri_token');
    console.log(link);
    fetch(link).then((response) => { return response.json() })
        .then(result => {
            localStorage.clear('agri-token');
            window.location = "login.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}