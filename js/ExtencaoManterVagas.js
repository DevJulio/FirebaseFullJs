
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
var tabela = document.getElementById('Empresa');

var uid = window.localStorage.getItem('uid')
var cont = 0;


db.collection("Empresa")
    .get()
    .then(function (querySnapshot) {
        tabela.innerHTML = '';
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());


            tabela.innerHTML += `
                <div class="card text-center" >         
                   
            <div class="card-header">
    
            <ul class="nav nav-pills card-header-pills">
                <h5>Empresa Nº ${cont + 1} </h5>
            </ul>
        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">${doc.data().nomeFantasia}</h5>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº${doc.data().numero}, Bairro ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade} ${doc.data().Estado}, Cep ${doc.data().CEP}
                </p>
            </div>

    
    </br>
    <div align="center" class="card-body">
    
    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Vagas(id)">Acessar Vagas</button>
   
    
    </div>
    
    </div>
    </div>
    </br>
                    `


            cont++
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

    function Vagas(id){
        localStorage.setItem("EmpresaId",id);
     
        window.location.href = "./ExtensaoManterVagasPt2.html"
                
    }

