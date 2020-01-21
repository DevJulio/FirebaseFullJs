
firebase.initializeApp({
  apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
  authDomain: "banco-virtual-de-talentos.firebaseapp.com",
  databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
  projectId: "banco-virtual-de-talentos",
  storageBucket: "banco-virtual-de-talentos.appspot.com",
  messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var uid = window.localStorage.getItem('docid')
var docRef = window.localStorage.getItem('docid')
var tabela = document.getElementById('perfil');


db.collection("Empresa").where("uid", "==", uid)
  .get()
  .then(function (querySnapshot) {
    tabela.innerHTML = '';
    querySnapshot.forEach(function (doc) {

      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());


      tabela.innerHTML += `
                
                <div class="text-left">


                <div class="form-group  col-sm-6 ">
                <label for="Nome" style="background-color: white">Nome: </label>
                <input type="text" class="form-control" id="razaoSocial" placeholder="Nome" value="${doc.data().razaoSocial}">
                  </div>
                  <div class="form-group  col-sm-6 ">
                  <label for="Nome" style="background-color: white">Nome fantasia: </label>
                  <input type="text" class="form-control" id="nomeFantasia" placeholder="fantasia" value="${doc.data().nomeFantasia}">
                    </div>
                    <div class="form-group  col-sm-6 ">
                    <label for="Nome" style="background-color: white">CNPJ: </label>
                    <input type="text" class="form-control" id="CNPJ" placeholder="CNPJ" value="${doc.data().CNPJ}">
                      </div>
                      <div class="form-group  col-sm-6 ">
                      <label for="Nome" style="background-color: white">Representante legal : </label>
                      <input type="text" class="form-control" id="Nome" placeholder="Representante" value="${doc.data().NomeRepresentante}">
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Email:</label>
                        <input type="text" class="form-control" id="Email" placeholder="Email" value="${doc.data().Email}">
                          </div>
                          </br>
                          <h1> Endereços </h1>
                          </br>
                      <div class="form-group  col-sm-6 ">
                      <label for="Nome" style="background-color: white">Endereço: </label>
                      <input type="text" class="form-control" id="Endereco" placeholder="Endereco" value="${doc.data().Endereco}">
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Número: </label>
                        <input type="text" class="form-control" id="Numero" placeholder="Numero" value="${doc.data().numero}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Bairro: </label>
                          <input type="text" class="form-control" id="Bairro" placeholder="Bairro" value="${doc.data().Bairro}">
                            </div>

                            <div class="form-group col-sm-6">
                            <label for="Cidade">Cidade de residencia: </label>
                            <select id="Cidade" class="form-control">
                                <option selected>Escolha...</option>
                                <option selected>Iporá</option>
                                <option selected>Caiapônia</option>
                                <option selected>Amorinópolis</option>
                                <option selected>Israelândia</option>
                                <option selected>Fazenda nova</option>
                                <option selected>Baciância</option>
                                <option selected>São luis de montes Belos</option>
                                <option selected>Goiâna</option>
                            </select>
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">CEP: </label>
                        <input type="text" class="form-control" id="CEP" placeholder="CEP" value="${doc.data().CEP}">
                          </div>
                          </br>
                          <h1> Dados do surpervisor na empresa </h1>
                          </br>

                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Nome: </label>
                          <input type="text" class="form-control" id="RepresentanteLegal" placeholder="Celular" value="${doc.data().RepresentanteLegal}">
                            </div>
                            
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Cargo: </label>
                          <input type="text" class="form-control" id="Cargo" placeholder="Celular" value="${doc.data().CargoRepresentante}">
                            </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">CPF: </label>
                          <input type="text" class="form-control" id="CPF" placeholder="CPF" value="${doc.data().CPF}">
                            </div>

                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">RG: </label>
                        <input type="text" class="form-control" id="RG" placeholder="RG" value="${doc.data().RG}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Órgão Expedior: </label>
                          <input type="text" class="form-control" id="OE" placeholder="Expedior" value="${doc.data().OE}">
                            </div>
                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Celular : </label>
                        <input type="text" class="form-control" id="Telefone1" placeholder="Celular" value="${doc.data().Telefone1}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Celular 2: </label>
                          <input type="text" class="form-control" id="Telefone2" placeholder="Celular2" value="${doc.data().Telefone2}">
                            </div>
                            
            </br>
            <div align="center" class="card-body">
    
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar()"
                    data-toggle="modal" data-target="#ModalAprovado">Salvar</button>
    
            </div>
    
    
                `



    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });
///${doc.data().DadosOrientador.NomeOrientador} Trocar por número





function Editar() {



  var nomeFantasia = document.getElementById("nomeFantasia").value;
  var razaoSocial = document.getElementById("razaoSocial").value;
  var CNPJ = document.getElementById("CNPJ").value;
  var Telefone1 = document.getElementById("Telefone1").value;//
  var Telefone2 = document.getElementById("Telefone2").value;//
  var RepresentanteLegal = document.getElementById("RepresentanteLegal").value;
  var Email = document.getElementById("Email").value;
  var Endereco = document.getElementById("Endereco").value;
  var numero = document.getElementById("Numero").value;
  var Bairro = document.getElementById("Bairro").value;
  var Cidade = document.getElementById("Cidade").value;
 // var Estado = document.getElementById("Estado").value;//
  var NomeRepresentante = document.getElementById("Nome").value;  
  var CargoRepresentante = document.getElementById("Cargo").value;
  var CEP = document.getElementById("CEP").value;
  var CPF = document.getElementById("CPF").value;
  var RG = document.getElementById("RG").value;
  var OE = document.getElementById("OE").value;





  var Att = db.collection("Empresa").doc(docRef);

  return Att.update({


    nomeFantasia: nomeFantasia,
    razaoSocial: razaoSocial,
    CNPJ: CNPJ,
    Telefone1: Telefone1,
    Telefone2: Telefone2,
    RepresentanteLegal: RepresentanteLegal,
    Endereco: Endereco,
    numero: numero,
    Bairro: Bairro,
    Cidade: Cidade,
    Email: Email,
    NomeRepresentante: NomeRepresentante,
    CargoRepresentante: CargoRepresentante,
    CEP: CEP,
    CPF: CPF,
    RG: RG,
    OE: OE
   

  })
    .then(function () {
      console.log("Document successfully updated!");
      window.alert("Perfil atualizado com suscesso!")
      location.reload()

    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      window.alert("Errro ao atualizar!");
    });
}