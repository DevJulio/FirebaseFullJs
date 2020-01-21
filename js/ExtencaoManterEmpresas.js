
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
var cont = 0 ;


db.collection("Empresa")
    .get()
    .then(function (querySnapshot) {
        tabela.innerHTML = '';
        querySnapshot.forEach(function (doc) {
    
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            if(doc.data().Ativado){
                tabela.innerHTML += `
                <div class="card text-center" >         
                   
            <div class="card-header">
    
            <ul class="nav nav-pills card-header-pills">
                <h5>Perfil da Empresa Nº ${cont+1} </h5>
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
    
      
    
    </br>
    
    </br>
    <div align="center" class="card-body">
    
    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Aprovar(id)"
    data-toggle="modal" data-target="#ModalAprovado">Acessar Vagas</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativar(id)"
    data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="deleta(id)"
    data-toggle="modal" data-target="#ModalRecusado">Excluir</button>
    
    </div>
    
    </div>
    </div>
    </br></br>
                    `
            }else{
                tabela.innerHTML += `
                <div class="card text-center" >         
                   
            <div class="card-header">
    
            <ul class="nav nav-pills card-header-pills">
                <h5>Perfil da Empresa Nº ${cont+1} </h5>
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
    
      
    
    </br>
    
    </br>
    <div align="center" class="card-body">
    
    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Aprovar(id)"
    data-toggle="modal" data-target="#ModalAprovado">Acessar Vagas</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)"
    data-toggle="modal" data-target="#ModalRecusado">Ativar</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="deleta(id)"
    data-toggle="modal" data-target="#ModalRecusado">Excluir</button>
    
    </div>
    
    </div>
    </div>
    </br></br>
                    `
            }
           
                cont ++
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function Editar() {
    window.location.href = "./EmpresaEditaPerfil.html"
}
function Desativar(e){
    uid = e;
    var Desativar = db.collection("Empresa").doc(e);
    return Desativar.update({
        Ativado: false

    })
        .then(function () {
            console.log("Document successfully updated!");
           
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao aprovar!");
            return Aprovar.update({
               
                Ativado: true

            })
        });

}
function Ativar(e){
    uid = e;
    var Desativar = db.collection("Empresa").doc(e);
    return Desativar.update({
        Ativado: true

    })
        .then(function () {
            console.log("Document successfully updated!");
           
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao aprovar!");
            return Aprovar.update({
               
                Ativado: false

            })
        });

}
function mostraDiv() {
    document.getElementById("menor").style.display = "none"
    document.getElementById("Empresa").style.display = "block"
}



function deleta(e){

    db.collection("Empresa").doc(e).delete().then(function() {
        console.log("Document successfully deleted!");
        window.alert("Empresa excluída com sucesso")


       //aqui



    }).catch(function(error) {
        console.error("Error removing document: ", error);
        window.alert("Erro ao excluir a Empresa")
    });
    


}