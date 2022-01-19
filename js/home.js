const myModal = new bootstrap.Modal('#transaction-Modal');
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let cashIn = [];
let cashOut = [];
let data = {
    transactions: []
}

// CHECK LOGIN
checkLogged();

// HEAR FUNCTION
document.getElementById('button-logout').addEventListener('click', logout);
document.getElementById('transactions-button').addEventListener('click', function(e){
    window.location.href = "transacoes.html";
})

document.getElementById('transactionForm').addEventListener('submit', function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById('valorInput').value);
    const description = document.getElementById('descriptionInput').value;
    const date = document.getElementById('dateInput').value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    
    getCashIn();
    getCashOut();
    getTotal();
    alert("Lançamento adicionado com sucesso!!")
});
// CHECKING THE USER 
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}
// LOGGING OUT THE USER
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}
// GETTING THE PLUS CASH ON YOUR WALLET
function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }else {
            limit = cashIn.length;
        }

        for(let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p> 
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById('cash-in-list').innerHTML = cashInHtml;
    }
}
// GETTING THE OUT CASH ON YOUR WALLET
function getCashOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "2");

    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }else {
            limit = cashIn.length;
        }

        for(let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p> 
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById('cash-out-list').innerHTML = cashInHtml;
    }
}
// GETTING THE TOTAL CASH ON YOUR WALLET
function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1"){
            total += item.value;
        }else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}
// SAVING THE DATA 
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
