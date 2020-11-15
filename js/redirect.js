const url_ = "https://hindustan-sales-corporation.herokuapp.com/";
// const url_ = 'http://localhost:8080/';

window.onload = function() {
    //reading token from local storage
    const passedToken = localStorage.getItem("agri_token");
    let tokenMap = new Map();
    tokenMap.set("passedToken", passedToken);
    const requestPost_ = new Request(url_ + 'token-check');
    fetch(requestPost_, {
            method: 'POST',
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: strMapToObj(tokenMap),
        }).then(res => res.clone().json())
        .then(json => {
            if (json == true) {
                document.querySelector("#main").style.display="block";
            } else {
                document.querySelector("#main").style.display="none";
                throw new Error("Failed to validate token");
            }
        })

    .catch(function(e) {
        localStorage.removeItem("agri_token");
        window.location = "login.html";
        console.log('Error', e);
    });
};

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return JSON.stringify(obj);
}
