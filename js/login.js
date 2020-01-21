
/*
function Acessa() {
    txtEmail = document.getElementById('inputEmail').value;
    txtPassword = document.getElementById('inputPassword').value;

    if (txtEmail == "aluno") {
        window.location.href = "./AlunoIndex.html"
    } else if (txtEmail == "empresa") {
        window.location.href = "./EmpresaIndex.html"
    } else if (txtEmail == "extencao") {
        window.location.href = "./ExtencaoIndexNovo.html"
    }


}

*/
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
     
        var user = firebase.auth().currentUser;
     //   window.alert(user.uid)


        window.self.location.href = "./AlunoIndex.html";
    } else {
        // No user is signed in.

    }
});



function login() {

    var userEmail = localStorage.getItem("Email");

    var userPass = localStorage.getItem("Senha");

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Erro" + errorMessage);
        // ...
    });


}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}



/*






firebase.auth().signOut().then(function () {

    console.log("Cliente deslogado")
}).catch(function (error) {
    window.alert("Erro ao deslogar")
});

function login() {
    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            window.alert("A Senha está incorreta");
        } else if (errorCode === 'auth/invalid-email') {
            window.alert("Email inválido");
        } else if (errorCode === 'auth/user-not-found') {
            window.alert("Usuário nao encontrado");
        } else if (errorCode === 'auth/user-disabled') {
            window.alert("Seu acesso foi desabilitado! ");
        } else {
            window.alert("Erro" + errorMessage)
        }

    });

}

firebase.auth().onAuthStateChanged(function (user) {
    window.alert("e")
    if (user) {
        var db = firebase.firestore();
        db.collection("Admin").doc(user.uid).get().then(function (doc) {
            if (doc.exists) {

                console.log(`${doc.id} => ${doc.data()}`);
                if (doc.data().NivelAcesso == "Empresa") {
                    window.self.location.href = "./EmpresaIndex.html";
                }


            } else {
                window.alert("Você não tem permissão para acessar esse módulo");
            }



        });
        //window.self.location.href = "dashboard.html";
    }

});*/