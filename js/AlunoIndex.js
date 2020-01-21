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
var tabela = document.getElementById('boasvindas');
var tabela2 = document.getElementById('boasvindas2');
var Area = ""
var cidade = "";
var vagasCidade = 0;
var vagasOutrasCidades = 0;
var AreaDoc = 0
var AreaDocOutrascidades = 0
var vagas = document.getElementById('vagas');
var empregado;
var idEmpresa

db.collection("Alunos").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            tabela.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().Nome);
            Area = doc.data().Area
            cidade = doc.data().Cidade
            console.log(cidade)
            empregado = doc.data().EmpregadoPeloSistema.Empregado
            idEmpresa = doc.data().EmpregadoPeloSistema.NomeEmpresa
            console.log(empregado);
            console.log(idEmpresa);
            if (empregado) {
                tabela.innerHTML +=
                    `<h3>Bem vindo(a), ${doc.data().Nome}</h3>`
                db.collection("Empresa").where("uid", "==", idEmpresa).get()
                    .then(function (querySnapshot) {

                        querySnapshot.forEach(function (doc) {
                            tabela2.innerHTML =
                                `<h5>Você está empregado na empresa: ${doc.data().nomeFantasia}</h5>`

                        });
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });

            } else {

                tabela.innerHTML +=
                    `<h3>Bem vindo, ${doc.data().Nome}</h3>`
                    tabela2.innerHTML =
                                ``
            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


var ti = []
var Agrarias = []
var quimica = []
var Superior = ["Tecnologia em Análise e Desenvolvimento de Sistemas", "Agronegócio", "Licenciatura em Química", "Agronomia"]
var Medio = ["Ensino Médio: TEDS", "Ensino Médio: Qúimica", "Ensino Médio: Agropecuária"]
var Tecnico = ["Secretariado", "Administração"]

//////////////////////
// vagas.innerHTML = '';
db.collection("Empresa").get()
    .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            console.log(Area)
            //  console.log(cidade)
            console.log("//////////////////")
            console.log(doc.data().Cidade)


            if (doc.data().Cidade == cidade) {

                if (Area == "T.I") {
                    AreaDoc = AreaDoc + doc.data().VagasRaiz.TI
                } else if (Area == "Agrárias") {
                    AreaDoc = AreaDoc + doc.data().VagasRaiz.Agrarias
                } else if (Area == "Administração") {
                    AreaDoc = AreaDoc + doc.data().VagasRaiz.Administracao
                } else if (Area == "Secretariado") {
                    AreaDoc = AreaDoc + doc.data().VagasRaiz.Secretariado
                }

                vagasCidade = AreaDoc;
            } else if (doc.data().Cidade != cidade) {

                if (Area == "T.I") {
                    AreaDocOutrascidades = AreaDocOutrascidades + doc.data().VagasRaiz.TI
                } else if (Area == "Agrárias") {
                    AreaDocOutrascidades = AreaDocOutrascidades + doc.data().VagasRaiz.Agrarias
                } else if (Area == "Administração") {
                    AreaDocOutrascidades = AreaDocOutrascidades + doc.data().VagasRaiz.Administracao
                } else if (Area == "Secretariado") {
                    AreaDocOutrascidades = AreaDocOutrascidades + doc.data().VagasRaiz.Secretariado
                }

                vagasOutrasCidades = AreaDocOutrascidades
            }

            
            vagas.innerHTML = `
            <div class="card-header">
            <h4 class="my-0 font-weight-normal">Todas as vagas da sua área</h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title">${vagasCidade + vagasOutrasCidades} </h1>
            <ul class="list-unstyled mt-3 mb-4" align="left">
                <li>Vagas para a sua cidade: ${vagasCidade}</li>
                <li>Vagas de outras cidades: ${vagasOutrasCidades}</li>
            </ul>
            

        </div>
    
                `


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function Redireciona(){
    window.location.href = "./AlunoVagas.html"

}


