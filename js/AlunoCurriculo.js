
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

var tabela2 = document.getElementById('prof');
var uid = window.localStorage.getItem('uid')
var uidEmpresa = ""
var idVaga = ""
var docVaga = ""

db.collection("Alunos").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            tabela2.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());





            if (doc.data().DadosProfissionais == false) {


                tabela2.innerHTML += `
                
                <div class="card text-center">
                <div class="card-header">
    
                    <ul class="nav nav-pills card-header-pills">
                        <h5>Dados Profissionais:</h5>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="text-left">
                        <h5 class="card-title text-center">Ainda não foram informados os dados!</h5>
                      
                    </div>
                    </br>
                    <div align="center" class="card-body">
    
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Cadastra()"
                            data-toggle="modal" data-target="#ModalAprovado">Cadastrar dados!</button>
    
                    </div>
    
                </div>
            </div>
                                

                `

            } else {

                if (doc.data().EmpregadoPeloSistema.Empregado) {

                    ///////////////////////////////////////////////////////////////////


                    var tamanhoExperiencias = doc.data().Experiencias.length;

                    console.log(tamanhoExperiencias)
                    var z = 0;
                    var Experiencias = "";
                    for (z = 0; z < tamanhoExperiencias; z++) {
                        Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                    }

                    Experiencias = Experiencias.split('*');

                    for (let i = 0; i < Experiencias.length; i++)
                        Experiencias[i] = Experiencias[i] + "<br>";

                    Experiencias = Experiencias.join('');

                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    /////////////////////////////////////////////////////////////////// 

                    var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                    console.log(tamanhoPalvrasChave)
                    var z = 0;
                    var PalavrasChave = "";
                    for (z = 0; z < tamanhoPalvrasChave; z++) {
                        PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                    }

                    PalavrasChave = PalavrasChave.split('*');

                    for (let i = 0; i < PalavrasChave.length; i++)
                        PalavrasChave[i] = PalavrasChave[i] + "<br>";

                    PalavrasChave = PalavrasChave.join('');


                    ///////////////////////////////////////////////////////////////////

                    uidEmpresa = doc.data().EmpregadoPeloSistema.NomeEmpresa
                    idVaga = doc.data().EmpregadoPeloSistema.idVaga
                    docVaga = doc.data().EmpregadoPeloSistema.docVaga





                    tabela2.innerHTML += `       
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <h5>Dados Profissionais </h5>
                    
                </ul>
            </div>
            <div align="left" class="card-body">
            </br>
                    <h5 class="card-text text-left">Parabéns, você está empregado! </h5>

                    </br>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desvincular(id)">Desvincular da empresa</button>
                    </br> </br>
            <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
            <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
            <p class="card-text text-left">Experiências: </p>
            <p class="card-text text-left">${Experiencias}</p>
            <p class="card-text text-left">Habilidades: </p>
            <p class="card-text text-left">${Habilidades} </p>
            <p class="card-text text-left">Palavras chave : </p>
            <p class="card-text text-left">${PalavrasChave} </p>
            <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>

                <div align="center" class="card-body">
    
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Editar(id)">Editar</button>
                
    
                </div>
            </div>
    
        </div>
        </br>
           
     `


                } else {

                    ///////////////////////////////////////////////////////////////////


                    var tamanhoExperiencias = doc.data().Experiencias.length;

                    console.log(tamanhoExperiencias)
                    var z = 0;
                    var Experiencias = "";
                    for (z = 0; z < tamanhoExperiencias; z++) {
                        Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                    }

                    Experiencias = Experiencias.split('*');

                    for (let i = 0; i < Experiencias.length; i++)
                        Experiencias[i] = Experiencias[i] + "<br>";

                    Experiencias = Experiencias.join('');

                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    /////////////////////////////////////////////////////////////////// 

                    var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                    console.log(tamanhoPalvrasChave)
                    var z = 0;
                    var PalavrasChave = "";
                    for (z = 0; z < tamanhoPalvrasChave; z++) {
                        PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                    }

                    PalavrasChave = PalavrasChave.split('*');

                    for (let i = 0; i < PalavrasChave.length; i++)
                        PalavrasChave[i] = PalavrasChave[i] + "<br>";

                    PalavrasChave = PalavrasChave.join('');


                    ///////////////////////////////////////////////////////////////////

                    tabela2.innerHTML += `       
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <h5>Dados Profissionais </h5>
                </ul>
            </div>
            <div align="left" class="card-body">
            <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
            <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
            <p class="card-text text-left">Experiências: </p>
            <p class="card-text text-left">${Experiencias}</p>
            <p class="card-text text-left">Habilidades: </p>
            <p class="card-text text-left">${Habilidades} </p>
            <p class="card-text text-left">Palavras chave : </p>
            <p class="card-text text-left">${PalavrasChave} </p>
            <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>

                <div align="center" class="card-body">
    
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Editar(id)">Editar</button>
                
    
                </div>
            </div>
    
        </div>
        </br>
           
     `

                }

            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function Cadastra() {
    window.location.href = "./AlunoCadastraProfissional.html"
}
function Editar(id) {
    localStorage.setItem("idDoAluno", id)
    window.location.href = "./AlunoEditaProfissional.html"
}
function Desvincular(id) {

    if (confirm("Você está prestes a desvincular um aluno de seu cargo, você deseja continuar?")) {
        var atualizacao = db.collection("Alunos").doc(id);

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

                var atualizacao = db.collection("Empresa").doc(uidEmpresa).collection("Vagas").doc(docVaga);

                return atualizacao.update({

                    StatusVaga: "Aberta"

                })
                    .then(function () {
                        console.log("Document successfully updated!");


                        db.collection("Empresa").doc(uidEmpresa).collection("Vagas").doc(docVaga).collection("Empregados").doc(idVaga).delete().then(function () {
                            console.log("Document successfully deleted!");
                            window.alert("Perfil atualizado com suscesso!")
                            location.reload()

                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                            window.alert("Erro")
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


    } else {
        window.alert("Operação cancelada pelo usuário");
    }
}