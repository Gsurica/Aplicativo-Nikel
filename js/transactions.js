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

    getTransactions();
    
    alert("Lançamento adicionado com sucesso!!")
});

// LOGIN FUNCTION
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

    getTransactions();

}
// SAVING DATA
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
// GETTING TRANSACTIONS WITH A FUNCTION 
function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saida"
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }

    document.getElementById('transactions-list').innerHTML = transactionsHtml;
}
// LOGOUT USER WITH A FUNCTION
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}