const myModal = new bootstrap.Modal('#registerModal');
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
checkLogged();
//Logar no sistema 
document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("password-login").value;
    const checkSession = document.getElementById("session-login").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o seu usuário ou a senha.");
        return;
    }
    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique o seu usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
    
});

// Função criar conta.
document.getElementById('create-form').addEventListener('submit', function(e){
    e.preventDefault();

    const email= document.getElementById("registerInputEmail").value;
    const password= document.getElementById("registerInputPassword").value;

    if(email.length < 5) {
        alert("Preencha o campo de e-mail, com um e-mail válido.");
        return;
    }
    if(password.length < 4) {
        alert("Preencha o campo de senha, com no mínimo quatro dígitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso!");
});
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html"
    }
}
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    
    sessionStorage.setItem("logged", data);
}