
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
//var user = firebase.auth().currentUser;
//var user = user.uid;
var tabela = document.getElementById('info');

var uid = window.localStorage.getItem('docid')



db.collection("Empresa").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            tabela.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());


            tabela.innerHTML += `
                
               
        <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>Perfil da Empresa:</h5>
        </ul>
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">${doc.data().nomeFantasia}</h5>
            <p class="card-text text-left">Razão social: ${doc.data().razaoSocial}</p>
            <p class="card-text text-left">Nome fantasia: ${doc.data().nomeFantasia}</p>
            <p class="card-text text-left">CNPJ: ${doc.data().CNPJ}</p>
            <p class="card-text text-left">Representante legal: ${doc.data().RepresentanteLegal}r </p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <h5 class="card-title text-center">Endereços</h5>
            <p class="card-text text-left">Endereço:${doc.data().Endereco}, Nº${doc.data().numero}, Bairro ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade} ${doc.data().Estado}, Cep ${doc.data().CEP}
            </p>
            <h5 class="card-title text-center">Dados do orientador/surpervisor na empresa</h5>
            <p class="card-text text-left">Nome: ${doc.data().NomeRepresentante} </p>
            <p class="card-text text-left">Cargo: ${doc.data().CargoRepresentante} </p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
            <p class="card-text text-left">Celular 2: ${doc.data().Telefone2} </p>


        </div>
        </br>

    </div>

</br>

</br>
<div align="center" class="card-body">

    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar()" data-toggle="modal"
        data-target="#ModalAprovado">Editar</button>

</div>


    
    
                `
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function Editar() {
    window.location.href = "./EmpresaEditaPerfil.html"
}
