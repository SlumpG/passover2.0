async function getUsers() {
    let UsersList = await fetch('https://next.json-generator.com/api/json/get/NJ-UoW2Xq');
    let Users = await UsersList.json();
    let HTML = '';

    for (let user of Users) {
        HTML += `<div id="${user['index']}" class="card shadow m-1 mb-4 bg-white rounded""> `;
        for (let userKey in user) {
            if (typeof user[userKey] === "object") {
                HTML += `<li class="list-group-item text-capitalize"><h5>${userKey}: `;
                for (let nameKey in user[userKey]) {
                    HTML += `${user[userKey][nameKey]}`;
                }
                HTML += `</h5></li>`
            } else if (userKey === 'picture') {
                HTML += ` <img class="card-img-top" src="${user[userKey]}" > <ul class="list-group list-group-flush">`;
            }
            else if (user[userKey] != user['_id'] && user[userKey] != user['picture'] && user[userKey] != user['index']) {
                HTML += `<li class="list-group-item text-capitalize"> ${userKey}: ${user[userKey]}</li> `;
            }
        }
        HTML += ` </ul></div>`;

    }
    usersCardView.innerHTML += HTML
    HTML = '';
    HTML += `<table class="table table-hover table-dark" > `;

    for (let user of Users) {
        if (user['index'] < 1) {
            HTML += `<tr>`;

            for (let thKey in user) {
                if (user[thKey] != user['_id'] && user[thKey] != user['index']) {
                    HTML += ` <th scope="col"> ${thKey}</th>`;

                }
            }
        }

        HTML += `</tr>`;


        HTML += `<tr>`;
        for (let userKey in user) {
            if (typeof user[userKey] === "object") {
                HTML += `<td>`;
                for (let nameKey in user[userKey]) {
                    HTML += ` ${user[userKey][nameKey]} `;
                }
                HTML += `</td>`;
            } else if (userKey === 'picture') {
                HTML += `<td> <img src="${user[userKey]}" ></td>`;
            }
            else if (user[userKey] != user['_id'] && user[userKey] != user['picture'] && user[userKey] != user['index']) {
                HTML += ` <td>${user[userKey]}</td> `;
            }
        }
        HTML += `</tr>`;

    }
    HTML += `</table>`;
    userTableView.innerHTML = HTML;

    HTML = '';
    HTML += `<form id="registerForm" class="mx-auto bg-dark p-3 m-3 rounded">
  
<div class="form-row">
    <div class="col-md-6 mb-3 ">
        <label class="text-light" for="fname">First name:</label><br/>
        <input type="text" id="fname" name="fname" required>
    </div>

    <div class="col-md-6 mb-3" >
        <label class="text-light" for="lname"">Last name:</label><br/>
        <input type="text" id="lname" name="lname" required>
    </div>
</div>
<div class="form-row">
    <div class="col-md-6 mb-3 ">
        <label class="text-light" for="email"> email:</label><br/>
        <input type="email" id="email" name="email" required>

    </div>
    <div class="col-md-6 mb-3 ">
        <label class="text-light" for="email2"> re email:</label><br/>
        <input type="email" id="email2" name="email2" required>

    </div>
</div>
<div class="form-row">
    <div class="col-md-6 mb-3 ">
        <label class="text-light" for="phone"> phone number:</label><br/>
        <input type="text" id="phone" name="phone" required>
    </div>
    <div class="col-md-6 mb-3 ">
        <label class="text-light" for="age">age: </label><br/>
        <input type="text" id="age" name="age" required>

    </div>
</div>
<div class="form-row">
<div class="col-md-6 mb-3  ">
    <button class="btn btn-secondary" id="submitForm" type="submit" >Submit</button>
    </div>
    </div>
    <div id="errorMsg" class="rounded">
    </div>
  </form>
   `;



    userFormView.innerHTML = HTML;
    submitForm.addEventListener('click', () => {
        if (email.value === email2.value) {
            errorMsg.innerHTML = `<p class="bg-success text-light" >${fname.value} ${lname.value} Register successfully!<p>`;
            setTimeout(() => {
                errorMsg.innerHTML = '';
            }, 3000);
        } else {
            errorMsg.innerHTML += `<p class="bg-danger text-light rounded" >Please check the from and  fill it again<p>`;
            setTimeout(() => {
                errorMsg.innerHTML = '';
            }, 3000);

        }
    });

    infoInCardForm.addEventListener('click', () => {
        userTableView.style.maxHeight= '0px';
        userFormView.style.maxHeight= '0px';
        singleCardView.style.maxHeight= '0px';
        usersCardView.style.maxHeight= '10000px';
        usersCardView.style.transition='all 2s';
    })
    infoInTableForm.addEventListener('click', () => {
        usersCardView.style.maxHeight= '0px';
        userFormView.style.maxHeight= '0px';
        singleCardView.style.maxHeight= '0px';
        userTableView.style.maxHeight= '10000px';
        userTableView.style.transition='all 2s';
    });

    register.addEventListener('click', () => {
        userTableView.style.maxHeight= '0px';
        usersCardView.style.maxHeight= '0px';
        singleCardView.style.maxHeight= '0px';
        userFormView.style.maxHeight = "10000px";
        userFormView.style.transition='all 2s';


    });

    for (let user of Users) {
        HTML = ''
        document.getElementById(`${user['index']}`).addEventListener('click', () => {
            HTML = ''
            HTML += `<div class="card mb-3 text-capitalize class="mx-auto"" style="min-width: 660px;"><div class="row no-gutters">`
            for (userKKey in user) {
                if (typeof user[userKKey] === "object") {
                    HTML += `<h4 class="card-title">${userKKey}: `;
                    for (let nameKey in user[userKKey]) {
                        HTML += `${user[userKKey][nameKey]} `;
                    }
                    HTML += `<h4/>`;
                } else if (userKKey === 'picture') {
                    HTML += ` <div class="col-md-4"><img src="${user[userKKey]}" > </div><div class="col-md-8"><div class="card-body">`;
                }
                else if (user[userKKey] != user['_id'] && user[userKKey] != user['picture'] && user[userKKey] != user['index']) {
                    HTML += ` <h4 class="card-text">${userKKey}: ${user[userKKey]}</h4> `;
                }

            }
            HTML += `</div></div></div></div>`;
            singleCardView.innerHTML = HTML;
            userTableView.style.maxHeight='0px';
            usersCardView.style.maxHeight='0px';
            userFormView.style.maxHeight='0px';
            singleCardView.style.maxHeight="10000px";
            singleCardView.style.transition='all 2s';
    
        })


    }

    userTableView.style.maxHeight = "0px"
    userFormView.style.maxHeight = "0px"
    singleCardView.style.maxHeight = "0px"
    usersCardView.style.maxHeight = "10000px"

}
getUsers();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

