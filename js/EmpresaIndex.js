firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var uid = window.localStorage.getItem('uid')
var docid = window.localStorage.getItem('docid')
var tabela = document.getElementById('boasvindas');
var Vagas = document.getElementById('Vagas');

var Preenchidas = 0;
var Disponiveis = 0;
var Finalizadas = 0;
var QntVagas = 0;
var Desativadas = 0;
var NomeEmpresa;


db.collection("Empresa").doc(docid).collection("Vagas").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().StatusVaga);
        QntVagas = QntVagas + 1

        if (doc.data().StatusVaga == "Aberta") {
            Disponiveis = Disponiveis + 1;

        } else if (doc.data().StatusVaga == "Desativada") {
            Desativadas = Desativadas + 1;

        } else if (doc.data().StatusVaga == "Preenchida") {
            Preenchidas = Preenchidas + 1;

        } else if (doc.data().StatusVaga == "Finalizadas") {
            Finalizadas = Finalizadas + 1;

        }





    });
});


db.collection("Empresa").where("uidDoc", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            Vagas.innerHTML = '';
            tabela.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().nomeFantasia);
           // window.localStorage.setItem("NomeEmpresa", doc.data().nomeFantasia)
            tabela.innerHTML +=
                `<h3>Bem vindo, ${doc.data().nomeFantasia}</h3>`








            Vagas.innerHTML += `
          
            <div class="card-header">
                <h4 class="my-0 font-weight-normal">Nº de vagas</h4>
            </div>
            <div class="card-body">
                <h1 class="card-title pricing-card-title">${QntVagas}</h1>
                <ul class="list-unstyled mt-3 mb-4" align="left">
                    <li>${Preenchidas} Preenchidas</li>
                    <li>${Disponiveis}  Disponíveis</li>
                    <li>${Finalizadas}  Finalizadas</li>
                    <li>${Desativadas}  Desativadas</li>
                </ul>
                <button type="button" class="btn btn-lg btn-block btn-outline-success" onclick="Redireciona()">Manter
                    vagas</button>
            </div>
       
     
                 `


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });













function Redireciona() {

    window.location.href = "./EmpresaTodasAsVagas.html"


}







