
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"

});
var db = firebase.firestore();
var email = "";
var password = "";
var uid = "";
var Alunos = document.getElementById('Aceitar');
var num = 0

db.collection("Alunos").where("StatusCadastro", "==", "Aguardando").get().then(function (querySnapshot) {
    Alunos.innerHTML = ``
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
       
    
        if (doc.exists) {
            
            num++
            Alunos.innerHTML += `       
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <h5>Requerimento nº ${num} </h5>
                </ul>
            </div>
            <div align="left" class="card-body">
    
                <h5 class="card-title">Aluno(a): ${doc.data().Nome}</h5>
                <p class="card-text">Area:  ${doc.data().Curso} </p>
                <p class="card-text">Período:  ${doc.data().Periodo}</p>
                <p class="card-text">Matrícula:  ${doc.data().Matricula}</p>
                <p class="card-text">Email:  ${doc.data().Email}</p>
                <div align="center" class="card-body">
    
                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Aprovar(id)"
                        data-toggle="modal" data-target="#ModalAprovado">Aprovar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                     data-toggle="modal"
                        data-target="#ModalRecusado">Recusar</button>
    
                </div>
            </div>
    
        </div>
        </br>
           
    
     `
        } else {
            Alunos.innerHTML += `       
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
        
                </ul>
            </div>
            <div align="left" class="card-body">
    
                <h5 class="card-title">Não existem alunos aguardando aprovação</h5>
            
    
                </div>
            </div>
    
        </div>
        </br>
           
    
    
     `
        }

    });
});

function Aprovar(e) {

    uid = e;
    var Aprovar = db.collection("Alunos").doc(e);
    return Aprovar.update({
        StatusCadastro: "Aprovado",
        Ativado: true

    })
        .then(function () {
            console.log("Document successfully updated!");
            cadastraUsuario(uid)
             window.alert("Cadastro aprovado");
            location.reload();
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao aprovar!");
            return Aprovar.update({
                StatusCadastro: "Aguardando",
                Ativado: false

            })
        });
}

function Recusar(e) {

    var Recusar = db.collection("Alunos").doc(e);

    // Set the "capital" field of the city 'DC'
    return Recusar.update({
        StatusCadastro: "Recusado"

    })
        .then(function () {
            console.log("Document successfully updated!");
            window.alert("Cadastro Negado!");
            location.reload();
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao recusar!");
        });
}
function cadastraUsuario(uid) {

    db.collection("Alunos").doc(uid)

        .onSnapshot(function (doc) {
            console.log("Current data: ", doc.data().email);
            password = doc.data().Senha
            email = doc.data().Email


        });

    cadastraUsuario2();
}

function cadastraUsuario2() {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode + " " + errorMessage);
    });
}