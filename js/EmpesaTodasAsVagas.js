firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var n = 0;
var ModalEmail = document.getElementById("ModalEmail")
var tabela = document.getElementById('maior');
var docid = window.localStorage.getItem('docid')
var QntVagas = 0
var NomeEmpresa = "";
var RepresentanteLegal = "";
var z = 0;
var k = 0;
var TodasAsHabilidades = "";
var IdAluno

var docRef = db.collection("Empresa").doc(docid);

docRef.get().then(function (doc) {
    if (doc.exists) {
        //     console.log("Document data:", doc.data());
        NomeEmpresa = doc.data().nomeFantasia,
            RepresentanteLegal = doc.data().RepresentanteLegal
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

window.onload = function () {



    var docRef = db.collection("Empresa").doc(docid);
    docRef.get().then(function (doc) {
        if (doc.exists) {

            console.log(doc.id, " => ", doc.data().VagasRaiz.TI);
            QntVagas = doc.data().QntVagas



        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


}

//Essa função, executa uma pesquisa no banco de dados.
db.collection("Empresa").doc(docid).collection("Vagas")
    .get()
    .then(function (querySnapshot) {
        tabela.innerHTML = '';
        querySnapshot.forEach(function (doc) {
            var tamanhoHabilidades = doc.data().Habilidades.length;
            var tamanhoPalavrasChave = doc.data().PalavrasChave.length;


            var PalavrasChaveArray = [];
            var PalavrasChave = "";
            for (k = 0; k < tamanhoPalavrasChave; k++) {
                PalavrasChave = PalavrasChave + doc.data().PalavrasChave[k] + "*";
                PalavrasChaveArray[k] = doc.data().PalavrasChave[k]
                console.log(doc.data().PalavrasChave[k])

            }


            PalavrasChave = PalavrasChave.split('*');

            for (let j = 0; j < PalavrasChave.length; j++)
                PalavrasChave[j] = PalavrasChave[j] + "<br>";

            PalavrasChave = PalavrasChave.join('');




            var Habilidades = "";
            for (z = 0; z < tamanhoHabilidades; z++) {
                Habilidades = Habilidades + doc.data().Habilidades[z] + "*";
                // console.log(doc.data().Habilidades[z])

            }


            Habilidades = Habilidades.split('*');

            for (let i = 0; i < Habilidades.length; i++)
                Habilidades[i] = Habilidades[i] + "<br>";

            Habilidades = Habilidades.join('');



            if (doc.data().StatusVaga == "Aberta") {
                n++;

                tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
        
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        <h5 class="card-title text-center">Habilidades Solicitadas:</h5>
                        <p class="card-text">${Habilidades}</p>  
                        <h5 class="card-title text-center">Palavras Chave:</h5>
                        <p class="card-text">${PalavrasChave}</p> 
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <p class="card-text text-left">Não possui aluno vinculado!</p>
                        
                      </br>
                      <h5 class="card-title text-center">Horários</h5>
                      </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)">Editar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
                  
                        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="finalizaVaga(id)">Finalizar vaga</button>
                        
                </div>

            </div>
        </div>

        </br> </br>

    
                `
            } else if (doc.data().StatusVaga == "Preenchida") {




                console.log(IdAluno)
                tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <div align="center" class="card-body" id="InfoAluno">
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                        data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                        </div>
                        </br>
                        <h5 class="card-title text-center">Horários</h5>
                        </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)"
                        data-toggle="modal" data-target="#ModalAprovado">Editar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
                        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="finalizaVaga(id)">Finalizar vaga</button>

                     
                        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desvincular(id)">Desvincular Aluno</button>
                </div>

            </div>
        </div>

        </br> </br>

    
                `
            } else if (doc.data().StatusVaga == "Finalizada") {
                tabela.innerHTML += `
                
                <div class="card text-center">
                <div class="card-header">
    
                    <ul class="nav nav-pills card-header-pills">
                        <h5>Vaga Nº ${n}</h5>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="text-left">
                        <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                        <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                        <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                            <p class="card-text text-left">Descrição da vaga:</br>
                                </br>
                                ${doc.data().Descricao}
    
                            </p>
                            </br>
                            <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                            <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                            </br>
                            <h5 class="card-title text-center">Requerimentos:</h5>
                            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                            <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                            <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                            <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                            </br>
                            <h5 class="card-title text-center">Dados do Aluno</h5>
                            </br>
                            <div align="center" class="card-body" id="InfoAluno">
                            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                            data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                            </div>
                            </br>
                            <h5 class="card-title text-center">Horários</h5>
                            </br>
                            <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                            <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                            <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                            <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                    </div>
                    </br>
                    <div align="center" class="card-body">
    
                       
                        <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)">Desativar</button>
                      
                    </div>
    
                </div>
            </div>
    
            </br> </br>
    
        
                    `
            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function VerInfo(id) {


    db.collection("Empresa").doc(docid).collection("Vagas").doc(id).collection("Empregados")
        .get()
        .then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {

                IdAluno = doc.data().IdAluno
                window.localStorage.setItem("EnderecoDocumentoAluno", IdAluno)
                window.location.href = "./EmpresaPerfilAluno.html"


            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

}

function mostraDiv() {
    document.getElementById("menor").style.display = "none"
    document.getElementById("maior").style.display = "block"
}

function RedirecionaCadastro(id) {


    window.localStorage.setItem("IdVaga", id)

    window.location.href = "./EmpresaIdentifica.html"



}

function AtivarVaga(id) {


    var Att = db.collection("Empresa").doc(id).collection("Vagas").doc(id)
    return Att.update({
        StatusVaga: "Aberta"


    })
        .then(function () {
            console.log("Document successfully updated!");

        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });


}

function Desativa(id) {


    var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(id)
    return Att.update({
        StatusVaga: "Desativada"


    })
        .then(function () {
            console.log("Document successfully updated!");

        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });


}

function Editar(id) {

    window.location.href = "./EmpresaEditaVaga.html"
    window.localStorage.setItem("docidVaga", id)


}

function deleta(id) {

    db.collection("Empresa").doc(docid).collection("Vagas").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        window.alert("Vaga excluída com sucesso")


        //aqui


        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas - 1,


        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    }).catch(function (error) {
        console.error("Error removing document: ", error);
        window.alert("Erro ao excluir a vaga")
    });


}

function Desvincular(id) {

    var IdVaga
    var idVaga2

    if (confirm("Você está prestes a desvincular um aluno de seu cargo, você deseja continuar?")) {

        db.collection("Empresa").doc(docid).collection("Vagas").doc(id).collection("Empregados")
            .get()
            .then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {

                    IdAluno = doc.data().IdAluno
                    IdVaga = doc.id;
                    console.log(IdAluno)

                    var atualizacao = db.collection("Alunos").doc(IdAluno);

                    return atualizacao.update({

                        EmpregadoPeloSistema: {
                            Empregado: false,
                            NomeEmpresa: "",
                            idVaga: ""
                        },
                        Formulario: {
                            Trabalhando: "Não",
                            TrabalhandoArea: "Não"
                        }


                    })
                        .then(function () {
                            console.log("Document successfully updated!");


                            db.collection("Aluno").doc(IdAluno).collection("ContatoEmpresa").where("idVaga", "==", id)
                                .get()
                                .then(function (querySnapshot) {

                                    querySnapshot.forEach(function (doc) {
                                        idVaga2 = doc.id;
                                        console.log(idVaga2)
                                    });
                                })
                                .catch(function (error) {
                                    console.log("Error getting documents: ", error);
                                });

                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                            var atualizacao = db.collection("Empresa").doc(docid).collection("Vagas").doc(id).collection("Empregados").doc(IdVaga);

                            return atualizacao.update({

                                estaEmpregado: false

                            })
                                .then(function () {
                                    console.log("Document successfully updated!");

                                    //////////////////////////////////////abre a vaga
                                    var atualizacao = db.collection("Empresa").doc(docid).collection("Vagas").doc(id);

                                    return atualizacao.update({

                                        StatusVaga: "Aberta"

                                    })
                                        .then(function () {
                                            console.log("Document successfully updated!");
                                            location.reload()

                                            /////////////////////////////////////


                                            /////////////////////////////////////
                                            /*
                                    db.collection("Aluno").doc(IdAluno).collection("ContatoEmpresa").doc(idVaga2).delete().then(function () {
                                    console.log("Document successfully deleted!");
                                        window.alert("Suscesso!")

                                    }).catch(function (error) {
                                        console.error("Error removing document: ", error);
                                        window.alert("Erro")
                                    });
                                            */

                                            // window.alert("Suscesso!")

                                        })
                                        .catch(function (error) {
                                            // The document probably doesn't exist.
                                            console.error("Error updating document: ", error);
                                            window.alert("Errro ao atualizar!");
                                        });

                                })
                                .catch(function (error) {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                    window.alert("Errro ao atualizar!");
                                });

                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                            window.alert("Errro ao atualizar!");
                        });





                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    } else {
        window.alert("Ação cancelada pelo usuário")
    }


}

function fon() {
    mostraDiv();
    var Curso = document.getElementById("Curso").value;
    var Vaga = document.getElementById("Vaga").value;
    if (Curso == "Escolha..." && Vaga == "Escolha...") {

        tabela.innerHTML = "";
        tabela.innerHTML +=
            `
        <div align="center" >

        <h5> Opções inválidas! </h5>

        </div>        
        
       `
    }

    else if (Curso == "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("StatusVaga", "==", Vaga)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                        
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <p class="card-text text-left">Não possui aluno vinculado!</p>
                        
                      </br>
                      <h5 class="card-title text-center">Horários</h5>
                      </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)">Editar</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
                    data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
                  

                </div>

            </div>
        </div>

        </br> </br>

    
                `
                    } else {


                        tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº 36</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <div align="center" class="card-body" id="InfoAluno">
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                        data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                        </div>
                        </br>
                        <h5 class="card-title text-center">Horários</h5>
                        </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)"
                data-toggle="modal" data-target="#ModalAprovado">Editar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="AtivarVaga(id)">Ativar Vaga</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
                data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
               
                <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desvincular(id)">Desvincular Aluno</button>

                </div>

            </div>
        </div>

        </br> </br>

    
                `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    else if (Vaga == "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("Curso", "==", Curso)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
            
        <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>Vaga Nº ${n}</h5>
            </ul>
        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                    <p class="card-text text-left">Descrição da vaga:</br>
                        </br>
                        ${doc.data().Descricao}

                    </p>
                    </br>
                    <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                    <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                    </br>
                    <h5 class="card-title text-center">Requerimentos:</h5>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                    <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                    </br>
                    <h5 class="card-title text-center">Dados do Aluno</h5>
                    </br>
                    <p class="card-text text-left">Não possui aluno vinculado!</p>
                    
                  </br>
                  <h5 class="card-title text-center">Horários</h5>
                  </br>
                    <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                    <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                    <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                    <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
            </div>
            </br>
            <div align="center" class="card-body">

            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)">Editar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)"
                data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
                data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
            
            </div>

        </div>
    </div>

    </br> </br>


            `
                    } else {


                        tabela.innerHTML += `
            
        <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>Vaga Nº 36</h5>
            </ul>
        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                    <p class="card-text text-left">Descrição da vaga:</br>
                        </br>
                        ${doc.data().Descricao}

                    </p>
                    </br>
                    <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                    <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                    </br>
                    <h5 class="card-title text-center">Requerimentos:</h5>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                    <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                    </br>
                    <h5 class="card-title text-center">Dados do Aluno</h5>
                    </br>
                    <div align="center" class="card-body" id="InfoAluno">
                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                    data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                    </div>
                    </br>
                    <h5 class="card-title text-center">Horários</h5>
                    </br>
                    <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                    <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                    <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                    <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
            </div>
            </br>
            <div align="center" class="card-body">

            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)"
            data-toggle="modal" data-target="#ModalAprovado">Editar</button>
        <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="AtivarVaga(id)">Ativar Vaga</button>
        <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
            data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
            data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
          
            <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desvincular(id)">Desvincular Aluno</button>

            </div>

        </div>
    </div>

    </br> </br>


            `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    if (Curso != "Escolha..." && Vaga != "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("Curso", "==", Curso).where("StatusVaga", "==", Vaga)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
        
    <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>Vaga Nº ${n}</h5>
        </ul>
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
            <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                <p class="card-text text-left">Descrição da vaga:</br>
                    </br>
                    ${doc.data().Descricao}

                </p>
                </br>
                <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                </br>
                <h5 class="card-title text-center">Requerimentos:</h5>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                </br>
                <h5 class="card-title text-center">Dados do Aluno</h5>
                </br>
                <p class="card-text text-left">Não possui aluno vinculado!</p>
                
              </br>
              <h5 class="card-title text-center">Horários</h5>
              </br>
                <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
        </div>
        </br>
        <div align="center" class="card-body">

        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)">Editar</button>
        <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desativa(id)"
            data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
        <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
            data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
            data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
   
        </div>

    </div>
</div>

</br> </br>


        `
                    } else {


                        tabela.innerHTML += `
        
    <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>Vaga Nº 36</h5>
        </ul>
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
            <p class="card-text text-left">Modalidade da vaga: ${doc.data().TipoVaga}</br>
                <p class="card-text text-left">Descrição da vaga:</br>
                    </br>
                    ${doc.data().Descricao}

                </p>
                </br>
                <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                </br>
                <h5 class="card-title text-center">Requerimentos:</h5>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                </br>
                <h5 class="card-title text-center">Dados do Aluno</h5>
                </br>
                <div align="center" class="card-body" id="InfoAluno">
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                </div>
                </br>
                <h5 class="card-title text-center">Horários</h5>
                </br>
                <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
        </div>
        </br>
        <div align="center" class="card-body">
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar(id)"
        data-toggle="modal" data-target="#ModalAprovado">Editar</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="AtivarVaga(id)">Ativar Vaga</button>
    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>
        <button id="${doc.id}" href="#" type="button" class="btn btn-secondary " onclick="RedirecionaCadastro()"
        data-toggle="modal" data-target="#ModalRecusado">Adicionar Aluno a vaga</button>
       
        <button id="${doc.id}" href="#" type="button" class="btn btn-warning" onclick="Desvincular(id)">Desvincular Aluno</button>

        </div>

    </div>
</div>

</br> </br>


        `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }




}
function finalizaVaga() {
    if (confirm("Você está prestes a finalizar uma vaga, você deseja continuar?")) {
        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(id)
        return Att.update({
            StatusVaga: "Finalizada"


        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });
    } else {
        window.alert("Operação cancelada pelo usuário")
    }
}