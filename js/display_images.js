const url_gallery =
//  'http://localhost:8080/';
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
            newDiv.appendChild(newImage);
            imageContainer.appendChild(newDiv);
        }
    }

}


function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return JSON.stringify(obj);
}
