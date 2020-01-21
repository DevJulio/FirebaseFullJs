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
var alunos = document.getElementById('alunos');
var nA = 0;
var empresas = document.getElementById('empresas');
var vagas = document.getElementById('vagas');
var boasvindas = document.getElementById('boasvindas');
var nV = 0;
var TADS = 0;
var AGRON = 0;
var QUIM = 0;
var AGRO = 0;
var SECR = 0;
var TEDS = 0;
var MEDQUIM = 0;
var MEDAGRO = 0;
var Geral = 0;
var Medio = 0;
var Sup = 0;
var Egresso = 0;
var Administracao = 0;
var QntVagas = 0;
var Tecnico = 0;


var docid = window.localStorage.getItem("uid")



db.collection("Admin").where("uidDoc", "==", docid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            boasvindas.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().Nome);
            // window.localStorage.setItem("NomeEmpresa", doc.data().nomeFantasia)
            boasvindas.innerHTML +=
                `<h3>Bem vindo, ${doc.data().Nome}</h3>`


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });














var QntEmp = 0;
//1
db.collection("Alunos").get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            alunos.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots


            if (doc.data().Curso == "Tecnologia em Análise e Desenvolvimento de Sistemas" && !doc.data().Egresso) {
                TADS = TADS + 1;
            } else if (doc.data().Curso == "Agronegócio" && !doc.data().Egresso) {
                AGRON = AGRON + 1;
            } else if (doc.data().Curso == "Licenciatura em Química" && !doc.data().Egresso) {
                QUIM = QUIM + 1;
            } else if (doc.data().Curso == "Agronomia" && !doc.data().Egresso) {
                AGRO = AGRO + 1;
            } else if (doc.data().Curso == "Secretariado" && !doc.data().Egresso) {
                SECR = SECR + 1;
            } else if (doc.data().Curso == "Ensino Médio: TEDS" && !doc.data().Egresso) {
                TEDS = TEDS + 1;
            } else if (doc.data().Curso == "Ensino Médio: Qúmica" && !doc.data().Egresso) {
                MEDQUIM = MEDQUIM + 1;
            } else if (doc.data().Curso == "Ensino Médio: Agropecuária" && !doc.data().Egresso) {
                MEDAGRO = MEDAGRO + 1;
            } else if (doc.data().Curso == "Administração" && !doc.data().Egresso) {
                Administracao = Administracao + 1;
            }





            //Administração
            if (doc.data().Egresso) {
                Egresso = Egresso + 1

            }

            Geral = TADS + AGRON + QUIM + AGRO + SECR + TEDS + MEDQUIM + MEDAGRO + Egresso;
            Medio = TEDS + MEDQUIM + MEDAGRO;
            Tecnico = SECR + Administracao;
            sup = TADS + AGRON + QUIM + AGRO;


            alunos.innerHTML += `
            <div class="card-header">
            <h4 class="my-0 font-weight-normal">Nº de alunos</h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title">${Geral}</h1>
            <ul class="list-unstyled mt-3 mb-4" align="left">
                <li>${sup} de nível superior</li>
                <li>${Medio} de nível médio</li>
                <li>${Egresso} de nível egressos</li>
                <li>${Tecnico} de nível técnico</li>
            </ul>
            </br>
            <button type="button" class="btn btn-lg btn-block btn-outline-success"
                onclick="Redireciona(1)">Manter alunos</button>
        </div>
    
    
                `

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

var TI2 = 0;
var AGROP2 = 0;
var QUIM2 = 0;
var SECR2 = 0;
var Industria = 0
var Comercio = 0
var Servico = 0
var Agropecuaria = 0
var Agroindustria = 0



//3

db.collection("Empresa").get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            vagas.innerHTML = '';
            empresas.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots

            QntEmp = QntEmp + 1;



            console.log(doc.id, " => ", doc.data().VagasRaiz.TI);

            TI2 = TI2 + doc.data().VagasRaiz.TI
            AGROP2 = AGROP2 + doc.data().VagasRaiz.Agrarias
            QUIM2 = QUIM2 + doc.data().VagasRaiz.Quimica
            SECR2 = SECR2 + doc.data().VagasRaiz.Secretariado
            QntVagas = TI2 + AGROP2 + QUIM2 + SECR2
            vagas.innerHTML += `
            <div class="card-header">
            <h4 class="my-0 font-weight-normal">Nº de vagas</h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title">${QntVagas}</h1>
            <ul class="list-unstyled mt-3 mb-4" align="left" style="font-color: white">
            <li>${AGROP2} da área de Agrárias</li>
            <li>${TI2} da área de T.I</li>
            <li>${QUIM2} da área de Química</li>
            <li>${SECR2} da área de Secretariado</li>
            </ul>
            </br>
            <button type="button" class="btn btn-lg btn-block btn-outline-success"
                onclick="Redireciona(3)">Manter vagas</button>
        </div>
    
    

               
        `//2


            if (doc.data().Area == "Indústria") {
                Industria = Industria + 1
            }
            if (doc.data().Area == "Comércio") {
                Comercio = Comercio + 1
            }
            if (doc.data().Area == "Serviço") {
                Servico = Servico + 1
            }
            if (doc.data().Area == "Agropecuária") {
                Agropecuaria = Agropecuaria + 1
            }
            if (doc.data().Area == "Agroindústria") {
                Agroindustria = Agroindustria + 1
            }


            empresas.innerHTML += `
                <div class="card-header">
                <h4 class="my-0 font-weight-normal">Nº de empresas</h4>
            </div>
            <div class="card-body">
                <h1 class="card-title pricing-card-title">${QntEmp}</h1>
                <ul class="list-unstyled mt-3 mb-4" align="left" style="font-color: white">
                <li>${Industria} da área da Indústria</li>
                <li>${Comercio} da área de Comércio</li>
                <li>${Servico} da área de Serviço</li>
                <li>${Agropecuaria} da área de Agropecuária</li>
                <li>${Agroindustria} da área de Agroindústria</li>
                </ul>
                <button type="button" class="btn btn-lg btn-block btn-outline-success"
                    onclick="Redireciona(3)">Manter empresas</button>
            </div>
        
        
                    `
            /**
             * 
                                <option selected>Indústria</option>
                                <option selected>Comércio</option>
                                <option selected>Serviço</option>
                                <option selected>Agropecuária</option>
                                <option selected>Agroindústria</option>
            
            
             * 
             */
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });







function Redireciona(a) {
    if (a == 1) {
        window.location.href = "./ExtencaoManterAlunos.html"
    } else if (a == 2) {
        window.location.href = "./ExtencaoManterEmpresas.html"
    } else if (a == 3) {
        window.location.href = "./ExtencaoManterVagas.html"

    }


}





/*
           <option selected>Escritório de Advocacia</option>
                    <option selected>Escritório de Contabilidade</option>
                    <option selected>Lojista</option>
                    <option selected>Bebidas e Comidas</option>
                    <option selected>Distribuidora</option>
            </div>








            <div class="card mb-4 shadow-sm" id="vagas">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Nº de vagas</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">80</h1>
                    <ul class="list-unstyled mt-3 mb-4" align="left">
                        <li>50 Preenchidas</li>
                        <li>7 Disponíveis</li>
                        <li>13 Finalizadas</li>
                        <li>10 Aguardando confirmação</li>
                    </ul>
                    <button type="button" class="btn btn-lg btn-block btn-success" onclick="Redireciona(3)">Manter
                        vagas</button>
                </div>
            </div>
 */