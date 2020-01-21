var config = {
  apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
  authDomain: "banco-virtual-de-talentos.firebaseapp.com",
  databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
  projectId: "banco-virtual-de-talentos",
  storageBucket: "banco-virtual-de-talentos.appspot.com",
  messagingSenderId: "463860022406"
};
firebase.initializeApp(config);
var db = firebase.firestore();

//var user = firebase.auth().currentUser;
//var user = user.uid;
var tabela = document.getElementById('dados');
var urldownload = "";
var uid = window.localStorage.getItem('uid')

var docid = window.localStorage.getItem('docid')

db.collection("Alunos").where("uid", "==", uid)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      tabela.innerHTML = '';
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      if (doc.data().Egresso) {
        tabela.innerHTML += `
                
                <div class="text-left">

                <div class="form-group  col-sm-6 ">
                <label for="Nome" style="background-color: white">Nome: </label>
                <input type="text" class="form-control" id="Nome" placeholder="Nome" value="${doc.data().Nome}">
                </br>
                <img src=${doc.data().urldownload} width="250" height="200" class="rounded">
                </br></br>
              
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="EditarFoto()">Editar Foto</button>
                </br>
                  </div>
                  <div class="form-group col-sm-6">
                  <label for="inputState" style="background-color: white">Curso: </label>
                  <select id="Curso" class="form-control">
                      <option selected>Escolha...</option>
                      <option >Tecnologia em Análise e Desenvolvimento de Sistemas</option>
                      <option >Agronegócio</option>
                      <option >Licenciatura em Química</option>
                      <option >Agronomia</option>
                      <option >Secretariado</option>
                      <option >Administração</option>
                      <option >Ensino Médio: TEDS</option>
                      <option >Ensino Médio: Qúmica</option>
                      <option >Ensino Médio: Agropecuária</option>
                  </select>
              </div>
              <div class="form-group col-sm-6">
              <label for="Estado" style="background-color: white">Estado</label>
              <input type="text" class="form-control" id="Estado" placeholder="Estado"  value="${doc.data().Estado}">
              </div>


                  <div class="form-group  col-sm-6 ">
                  <label for="Nome" style="background-color: white">Sexo: </label>
                  <input type="text" class="form-control" id="Sexo" placeholder="Sexo" value="${doc.data().Sexo}">
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputState" style="background-color: white">Período: </label>
                    <select id="Periodo" class="form-control">
                        <option selected>Escolha...</option>
                        <option>1º Ano Ensino Médio</option>
                        <option>2º Ano Ensino Médio</option>
                        <option>3º Ano Ensino Médio</option>
                        <option>1º</option>
                        <option>2º</option>
                        <option>3º</option>
                        <option>4º</option>
                        <option>5º</option>
                        <option>6º</option>
                        <option>7º</option>
                        <option>8º</option>
                        <option>9º</option>
                        <option>10º</option>
                    </select>
                </div>
                      <div class="form-group  col-sm-6 ">
                      <label for="Nome" style="background-color: white">Endereço: </label>
                      <input type="text" class="form-control" id="Endereco" placeholder="Endereço" value="${doc.data().Endereco}">
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Número: </label>
                        <input type="text" class="form-control" id="Numero" placeholder="Numero" value="${doc.data().Numero}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Bairro: </label>
                          <input type="text" class="form-control" id="Bairro" placeholder="Bairro" value="${doc.data().Bairro}">
                            </div>

                            <div class="form-group col-sm-6">
                            <label for="Cidade">Cidade de residencia: </label>
                            <select id="Cidade" class="form-control">
                                <option selected>Escolha...</option>
                                <option >Iporá</option>
                                <option >Caiapônia</option>
                                <option >Amorinópolis</option>
                                <option >Israelândia</option>
                                <option >Fazenda nova</option>
                                <option >Baciância</option>
                                <option >São luis de montes Belos</option>
                                <option >Goiâna</option>
                            </select>
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">CEP: </label>
                        <input type="text" class="form-control" id="CEP" placeholder="Bairro" value="${doc.data().CEP}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">CPF: </label>
                          <input type="text" class="form-control" id="CPF" placeholder="Bairro" value="${doc.data().CPF}">
                            </div>
                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">RG: </label>
                        <input type="text" class="form-control" id="RG" placeholder="Bairro" value="${doc.data().RG}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Órgão Expedior: </label>
                          <input type="text" class="form-control" id="OE" placeholder="Bairro" value="${doc.data().OE}">
                            </div>
                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Telefone 1: </label>
                        <input type="text" class="form-control" id="Telefone1" placeholder="Bairro" value="${doc.data().Telefone1}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Telefone 2: </label>
                          <input type="text" class="form-control" id="Telefone1"  value="${doc.data().Telefone2}">
                            </div>
                            
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Nome Orientador: </label>
                          <input type="text" class="form-control" id="Telefone2" placeholder="Bairro" value="${doc.data().DadosOrientador.NomeOrientador}">
                            </div>
               


                            <div class="form-group  col-sm-6 ">
                            <label for="idioma1" style="background-color: white">Idioma 1: </label>
                            <select id="idioma1" class="form-control">
                                <option selected>Escolha...</option>
                                <option >Inglês</option>
                                <option >Francês</option>
                                <option >Espanhol</option>
                                <option >Libras</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="idioma2" style="background-color: white">Idioma 2: </label>
                            <select id="idioma2" class="form-control">
                                <option selected>Escolha...</option>
                                <option>Não possuo</option>
                                <option>Espanhol</option>
                                <option>Libras</option>
                                <option>Inglês</option>
                                <option>Francês</option>
                            </select>
                        </div>
            </br>
            <div align="center" class="card-body">
    
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar()"
                    data-toggle="modal" data-target="#ModalAprovado">Salvar</button>
                    
    
            </div>
    
    
                `
      } else {
        tabela.innerHTML += `
                
                <div class="text-left">


                <div class="form-group  col-sm-6 ">
                <label for="Nome" style="background-color: white">Nome: </label>
                <input type="text" class="form-control" id="Nome" placeholder="Nome" value="${doc.data().Nome}">
                  </div>
                  <div class="form-group  col-sm-6 ">
                  <label for="Nome" style="background-color: white">Sexo: </label>
                  <input type="text" class="form-control" id="Sexo" placeholder="Sexo" value="${doc.data().Sexo}">
                    </div>
                    <div class="form-group col-sm-6">
                    <label for="inputState" style="background-color: white">Curso: </label>
                    <select id="Curso" class="form-control">
                        <option selected>Escolha...</option>
                        <option>Tecnologia em Análise e Desenvolvimento de Sistemas</option>
                        <option>Agronegócio</option>
                        <option>Licenciatura em Química</option>
                        <option>Agronomia</option>
                        <option>Secretariado</option>
                        <option>Administração</option>
                        <option>Ensino Médio: TEDS</option>
                        <option>Ensino Médio: Qúmica</option>
                        <option>Ensino Médio: Agropecuária</option>
                    </select>

        
                   


                    <div class="form-group  col-sm-6 ">
                    <label for="idioma1" style="background-color: white">Idioma 1: </label>
                    <select id="idioma1" class="form-control">
                        <option selected>Escolha...</option>
                        <option>Inglês</option>
                        <option>Francês</option>
                        <option>Espanhol</option>
                        <option>Libras</option>
                    </select>
                </div>
                <div class="form-group col-sm-6">
                    <label for="idioma2" style="background-color: white">Idioma 2: </label>
                    <select id="idioma2" class="form-control">
                        <option selected>Escolha...</option>
                        <option>Não possuo</option>
                        <option>Espanhol</option>
                        <option>Libras</option>
                        <option>Inglês</option>
                        <option>Francês</option>
                    </select>
                </div>


                </div>
                
                <div class="form-group col-md-6">
                <label for="inputState" style="background-color: white">Período: </label>
                <select id="Periodo" class="form-control">
                    <option selected>Escolha...</option>
                    <option>Egresso</option>
                    <option>1º Ano Ensino Médio</option>
                    <option>2º Ano Ensino Médio</option>
                    <option>3º Ano Ensino Médio</option>
                    <option>1º</option>
                    <option>2º</option>
                    <option>3º</option>
                    <option>4º</option>
                    <option>5º</option>
                    <option>6º</option>
                    <option>7º</option>
                    <option>8º</option>
                    <option>9º</option>
                    <option>10º</option>
                </select>
            </div>
                      <div class="form-group  col-sm-6 ">
                      <label for="Nome" style="background-color: white">Endereço: </label>
                      <input type="text" class="form-control" id="Endereco" placeholder="Endereço" value="${doc.data().Endereco}">
                        </div>
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Número: </label>
                        <input type="text" class="form-control" id="Numero" placeholder="Numero" value="${doc.data().Numero}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Bairro: </label>
                          <input type="text" class="form-control" id="Bairro" placeholder="Bairro" value="${doc.data().Bairro}">
                            </div>

                            <div class="form-group col-sm-6">
                            <label for="Cidade">Cidade de residencia: </label>
                            <select id="Cidade" class="form-control">
                                <option selected>Escolha...</option>
                                <option>Iporá</option>
                                <option>Caiapônia</option>
                                <option>Amorinópolis</option>
                                <option>Israelândia</option>
                                <option>Fazenda nova</option>
                                <option>Baciância</option>
                                <option>São luis de montes Belos</option>
                                <option>Goiâna</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                        <label for="Estado" style="background-color: white">Estado</label>
                        <input type="text" class="form-control" id="Estado" placeholder="Estado"  value="${doc.data().Estado}">
                        </div>
          
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">CEP: </label>
                        <input type="text" class="form-control" id="CEP" placeholder="Bairro" value="${doc.data().CEP}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">CPF: </label>
                          <input type="text" class="form-control" id="CPF" placeholder="Bairro" value="${doc.data().CPF}">
                            </div>
                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">RG: </label>
                        <input type="text" class="form-control" id="RG" placeholder="Bairro" value="${doc.data().RG}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Órgão Expedior: </label>
                          <input type="text" class="form-control" id="OE" placeholder="Bairro" value="${doc.data().OE}">
                            </div>
                            <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Telefone 1: </label>
                        <input type="text" class="form-control" id="Telefone1" placeholder="Bairro" value="${doc.data().Telefone1}">
                          </div>
                          <div class="form-group  col-sm-6 ">
                          <label for="Nome" style="background-color: white">Telefone 2: </label>
                          <input type="text" class="form-control" id="Telefone2" ${doc.data().Telefone2}">
                            </div>
                    
            </div>
            </br>
            <div align="center" class="card-body">
                
                <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Editar()"
                    data-toggle="modal" data-target="#ModalAprovado">Editar</button>
    
            </div>
    
    
                `
      }

    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

function Editar() {

  var Egresso
  var Nome = document.getElementById("Nome").value;
  var Curso = document.getElementById("Curso").value;
  var Periodo = document.getElementById("Periodo").value;
  var Endereco = document.getElementById("Endereco").value;
  var Numero = document.getElementById("Numero").value;
  var Bairro = document.getElementById("Bairro").value;
  var Cidade = document.getElementById("Cidade").value;
  var Estado = document.getElementById("Estado").value;
  var Sexo = document.getElementById("Sexo").value;
  var CEP = document.getElementById("CEP").value;
  var CPF = document.getElementById("CPF").value;
  var RG = document.getElementById("RG").value;
  var OE = document.getElementById("OE").value;
  var Telefone1 = document.getElementById("Telefone1").value;
  var Telefone2 = document.getElementById("Telefone2").value;
  var Area = "";
  var idioma1 = document.getElementById("idioma1").value;
  var idioma2 = document.getElementById("idioma2").value;

  if (Curso == "Tecnologia em Análise e Desenvolvimento de Sistemas") {
    Area = "T.I"
  } else if (Curso == "Agronomia" || Curso == "Agronegócio") {
    Area = "Agrárias"
  } else {
    Area = Curso;
  }

  if (Periodo == "Egresso") {


    if (confirm("Você alterou seu status para Egresso, deseja continuar?")) {



      var atualizacao = db.collection("Alunos").doc(docid);

      return atualizacao.update({

        Nome: Nome,
        Curso: Curso,
        Area: Area,
        Periodo: Periodo,
        Endereco: Endereco,
        Numero: Numero,
        Bairro: Bairro,
        Cidade: Cidade,
        Estado: Estado,
        Sexo: Sexo,
        CEP: CEP,
        CPF: CPF,
        RG: RG,
        OE: OE,
        Idiomas: {
          idioma1: idioma1,
          idioma2: idioma2

        },
        Egresso: true,
        Telefone1: Telefone1,
        Telefone2: Telefone2



      })
        .then(function () {
          console.log("Document successfully updated!");
          window.alert("Perfil atualizado com suscesso!")
          window.location.href = "./AlunoPerfil.html"


        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          window.alert("Errro ao atualizar!");
        });


    } else {
      window.alert("Operação cancelada pelo usuário");
    }
  } else {


    if (confirm("Você alterou seu período ou ano, deseja continuar?")) {

      var atualizacao = db.collection("Alunos").doc(docid);

      return atualizacao.update({

        Nome: Nome,
        Curso: Curso,
        Area: Area,
        Periodo: Periodo,
        Endereco: Endereco,
        Numero: Numero,
        Bairro: Bairro,
        Cidade: Cidade,
        Estado: Estado,
        Sexo: Sexo,
        CEP: CEP,
        CPF: CPF,
        RG: RG,
        OE: OE,
        Idiomas: {
          idioma1: idioma1,
          idioma2: idioma2

        },
        Egresso: false,
        Telefone1: Telefone1,
        Telefone2: Telefone2



      })
        .then(function () {
          console.log("Document successfully updated!");
          window.alert("Perfil atualizado com suscesso!")
          window.location.href = "./AlunoPerfil.html"


        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          window.alert("Errro ao atualizar!");
        });


    } else {
      window.alert("Operação cancelada pelo usuário");
    }
  }



}

function EditarFoto() {
  window.location.href = "./AlteraFoto.html";
}