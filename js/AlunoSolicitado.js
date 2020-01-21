firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var docid = localStorage.getItem("docid")
//var DadosMsg = document.getElementById('DadosMsg')
var n = 0;
var Mensagem = []
var docIDempresa = []
var docIDVaga = []
var ContatoEmpresa = document.getElementById('ContatoEmpresa');
var x = 0
var idDoContatoEmpresa = [];
var isEgresso;
console.log(docid)
db.collection("Alunos").doc(docid).collection("ContatoEmpresa")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            Mensagem.push(doc.data().Mensagem)
            docIDempresa.push(doc.data().idEmpresa)
            docIDVaga.push(doc.data().idVaga)
            idDoContatoEmpresa.push(doc.id);
            isEgresso = doc.data().Egresso
            console.log(Mensagem)
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(Mostra());
    }, 7000);
});

promise1.then(function (value) {
    //console.log(value);
    // expected output: "foo"
});

function Mostra() {


 




    ContatoEmpresa.innerHTML = ``;
    for (x = 0; x < docIDempresa.length; x++) {

        var nomeFantasia


        db.collection("Empresa").where("uid","==",docIDempresa[x]).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    nomeFantasia = doc.data().nomeFantasia
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    


        db.collection("Empresa").doc(docIDempresa[x]).collection("Vagas").where("uid", "==", docIDVaga[x])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.data().Mensagem);
                    var tamanhoHabilidades = doc.data().Habilidades.length;
                    var tamanhoPalavrasChave = doc.data().PalavrasChave.length;
                    console.log(docIDempresa)
                    localStorage.setItem("docIDempresa", docIDempresa)

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


                    // doc.data() is never undefined for query doc snapshots
                    //  console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Preenchida") {
                        n++;








                        ContatoEmpresa.innerHTML += `
                        
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                <p class="card-text text-left">A empresa: ${nomeFantasia}, se interessou pelo seu perfil profissional. </br>
                <h5 class="card-title text-center">A empresa tem uma mensagem para você</h5>
                <p class="card-text text-left">Mensagem: ${Mensagem[n - 1]}</p></br>
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</p></br>
                        <p class="card-text text-left">Descrição da vaga:</p>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        
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

                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Aprovar(id)"
                data-toggle="modal" data-target="#ModalAprovado">Aceitar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                data-toggle="modal" data-target="#ModalRecusado">Negar</button>
            <button id="${docIDempresa[n - 1]}" href="#" type="button" class="btn btn-primary"
                onclick="VerPerfilEmpresa(id)" data-toggle="modal" data-target="#ModalRecusado">Ver Perfil da empresa</button>
               
                </div>

            </div>
        </div>

 
    
                `

                    } else {
                        ContatoEmpresa.innerHTML = `
                      

                        
                            <div class="card-header">
                
                                <ul class="nav nav-pills card-header-pills">
                                    <h5>Oops..</h5>
                                </ul>
                            </div>
                            <div class="card-body">
                
                                <h5 class="card-title text-center">Não há empresas procurando por você! </h5>
                
                
                            </div>
                      
                
                        </br> </br>`
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });




    }


}

var docsEmpresa

function Aprovar(id) {
    //Alterar o status no banco de dados e começar a terminar o index da empresa
    //Feedback para o aluno e também feedback para a empresa
    docsEmpresa = docIDempresa[n - 1]

    var Att = db.collection("Empresa").doc(docsEmpresa).collection("Vagas").doc(id);


    return Att.update({
        StatusVaga: "Preenchida"

    })
        .then(function () {

            console.log("Document successfully updated!");
            //Pega o nome do aluno que aceitou o cargo e adicionar na coleção Empregados

            db.collection("Empresa").doc(docsEmpresa).collection("Vagas").doc(id).collection("Empregados").add({


                IdAluno: docid,
                estaEmpregado: true


            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    Aprovar2(docsEmpresa, id, docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    window.alert("Erro ao cadastrar! " + error)
                });



        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });


}

function Aprovar2(id, docVaga, idVaga) {

    var atualizacao = db.collection("Alunos").doc(docid);

    return atualizacao.update({

        EmpregadoPeloSistema: {
            Empregado: true,
            NomeEmpresa: id,
            idVaga: idVaga,
            docVaga: docVaga
        }



    })
        .then(function () {
            console.log("Document successfully updated!");
            window.alert("Suscesso!")
            if (isEgresso) {
                window.alert("Olá Egresso, atualize suas informações antes de continuar!")
                location.href = "./EgressoEditaRelatorio.html";
            } else {
                location.href = "./AlunoRelatorio.html";
            }


        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });

}


function Aprovar3() {
    //Pega o nome do aluno que aceitou o cargo e adicionar na coleção Empregados

}


function Recusar(id) {

    var idDoContatoEmpresa2


    for (var i = 0; i < idDoContatoEmpresa.length; i++) {
        if (id == docIDVaga[i]) {
            idDoContatoEmpresa2 = idDoContatoEmpresa[i]
        }
    }
    console.log(idDoContatoEmpresa2)
    db.collection("Alunos").doc(docid).collection("ContatoEmpresa").doc(idDoContatoEmpresa2).delete().then(function () {

        console.log("Document successfully deleted!");
        window.alert("Recusado!")

    }).catch(function (error) {
        console.error("Error removing document: ", error);
        window.alert("Erro")
    });
    // location.reload()

}

///////////////////
function capturaNome(id) {
    var nomeFantasia;
    /*
        db.collection("Empresa").doc(docIDempresa[n-1]).collection("Vagas").where("uid", "==", docIDVaga[x])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
    
    
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });*/

}
function VerPerfilEmpresa() {
    window.location.href = "./AlunoPerfilEmpresa.html";
}