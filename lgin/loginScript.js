function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Credenciais pré-definidas
    const userAdmin = "admin";
    const passAdmin = "admin123";

    if (username === userAdmin && password === passAdmin) {
        window.location.href = "../htmlFiles/menu.html" // Redireciona para a próxima tela
        return false;
    } else {
        alert("Usuário ou senha incorretos!");
        return false;
    }
}