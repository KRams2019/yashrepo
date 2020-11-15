var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
const url_ = "https://hindustan-sales-corporation.herokuapp.com/";
// const url_ = 'http://localhost:8080/';


function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let credential = new Map();
    credential.set("id", username);
    credential.set("password", password);
    const requestPost = new Request(url_ + 'login');
    fetch(requestPost, {
            method: 'POST',
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: strMapToObj(credential),
        }).then(res => res.clone().json())
        .then(json => {
            console.log(json)
            if (json.token != null && json.token != undefined) {
                localStorage.setItem("agri_token", json.token);
                window.location = "gallery_admin.html";
            } else {
                throw new Error('invalid credential')
            }
        })

    .catch(function(e) {
        localStorage.removeItem("agri_token");
        console.log('Error', e);
        window.location = "login.html";
    });
    // if (username == "abc" && password == "abc") {
    //     alert("Login successfully");
    //     window.location = "success.html"; // Redirecting to other page.
    //     return true;
    // } else {
    //     attempt--; // Decrementing by one.
    //     alert("You have left " + attempt + " attempt;");
    //     // Disabling fields after 3 attempts.
    //     if (attempt == 0) {
    //         document.getElementById("username").disabled = true;
    //         document.getElementById("password").disabled = true;
    //         document.getElementById("submit").disabled = true;
    //         return false;
    //     }
    // }
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return JSON.stringify(obj);
}