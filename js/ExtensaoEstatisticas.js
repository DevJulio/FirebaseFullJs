//1º Egressos E Alunos
//2º Alunos Empregados e Desempregados
//3º Egressos Empregados e Desempregados
//4º Alunos Empregados na área de formação ou não
//5º Egressos Empregados na área de formação ou não
//6º Egressos E Alunos ensino médio e superior (4 partes)

firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var Egresso = 0
var Alunos = 0
var EmpregadoPeloSistema = 0
var NaoEmpregadoPeloSistema = 0
var EgressoEmpregadoPeloSistema = 0
var EgressoNaoEmpregadoPeloSistema = 0
var EgressoTrabalhandoArea = 0;
var EgressoNaoTrabalhandoArea = 0;

var AlunoTrabalhandoArea = 0;
var AlunoNaoTrabalhandoArea = 0;

var AlunoSuperior = 0
var AlunoMedio = 0
var AlunoTecnico = 0
var cont = 0
var Superior = ["Tecnologia em Análise e Desenvolvimento de Sistemas", "Agronegócio", "Licenciatura em Química", "Agronomia"]
var Medio = ["Ensino Médio: TEDS", "Ensino Médio: Qúimica", "Ensino Médio: Agropecuária"]
var Tecnico = ["Secretariado", "Administração"]
db.collection("Alunos").get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            cont++

            if (doc.data().EmpregadoPeloSistema.Empregado) {
                EmpregadoPeloSistema = EmpregadoPeloSistema + 1
            } else {
                NaoEmpregadoPeloSistema = NaoEmpregadoPeloSistema + 1
            }


            if (doc.data().Egresso) {


                if (doc.data().EmpregadoPeloSistema.Empregado) {

                    EgressoEmpregadoPeloSistema = EgressoEmpregadoPeloSistema + 1
                    if (doc.data().Formulario.TrabalhandoArea == "Sim") {
                        EgressoTrabalhandoArea = EgressoTrabalhandoArea + 1

                    } else {
                        EgressoNaoTrabalhandoArea = EgressoNaoTrabalhandoArea + 1
                    }
                } else {
                    EgressoNaoEmpregadoPeloSistema = EgressoNaoEmpregadoPeloSistema + 1
                }
                Egresso = Egresso + 1




            } else {

              


                Alunos = Alunos + 1
            }

            for (var i = 0; i < Superior.length; i++) {
                if (doc.data().Curso == Superior[i]) {
                    AlunoSuperior = AlunoSuperior + 1
                }
            }
            for (var i = 0; i < Medio.length; i++) {
                if (doc.data().Curso == Medio[i]) {
                    AlunoMedio = AlunoMedio + 1
                }
            }
            for (var i = 0; i < Tecnico.length; i++) {
                if (doc.data().Curso == Tecnico[i]) {
                    AlunoTecnico = AlunoTecnico + 1
                }
            }

            console.log(cont)
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });



var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(Graficos());
    }, 5000);
});

promise1.then(function (value) {
    //console.log(value);
    // expected output: "foo"
});



function Graficos() {

    var ctx = document.getElementById('myChart');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Alunos', 'Egressos'],
            datasets: [{
                label: '# of Votes',
                data: [Alunos, Egresso],
                backgroundColor: [
                    'rgb(255, 99, 132 )',
                    'rgb(54, 162, 235 )'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'

                ],
                borderWidth: 1
            }]
        }
    });

    var ctx = document.getElementById('myChart2');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Empregados', 'Desempregados'],
            datasets: [{
                label: '# of Votes',
                data: [EmpregadoPeloSistema, NaoEmpregadoPeloSistema],
                backgroundColor: [
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    var ctx = document.getElementById('myChart3');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Empregados', 'Desempregados'],
            datasets: [{
                label: '# of Votes',
                data: [EgressoEmpregadoPeloSistema, EgressoNaoEmpregadoPeloSistema],
                backgroundColor: [

                    'rgb(255, 206, 86 )',
                    'rgb(75, 192, 192)'

                ],
                borderColor: [

                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'

                ],
                borderWidth: 1
            }]
        }
    });

    var ctx = document.getElementById('myChart4');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Atuando', 'Não atuando'],
            datasets: [{
                label: '# of Votes',
                data: [23, 42],
                backgroundColor: [
                    'rgb(0,255,0 )',
                    'rgb(255,255,0)'

                ],
                borderColor: [
                    'rgba(0,255,0, 1)',
                    'rgba(255,255,0,1)'
                ],
                borderWidth: 1
            }]
        }
    });

    var ctx = document.getElementById('myChart5');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Atuando', 'Não atuando'],
            datasets: [{
                label: '# of Votes',
                data: [EgressoTrabalhandoArea, EgressoNaoTrabalhandoArea],
                backgroundColor: [
                    'rgb(192,192,192)',
                    'rgb(255,222,173 )'

                ],
                borderColor: [
                    'rgba(192,192,192 , 1)',
                    'rgba(255,222,173, 1)'
                ],
                borderWidth: 1
            }]
        }
    });


    var ctx = document.getElementById('myChart6');


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Médio', 'Superior ', 'Técnico'],
            datasets: [{
                label: '# of Votes',
                data: [AlunoMedio, AlunoSuperior, AlunoTecnico],
                backgroundColor: [
                    'rgb(220,20,60)',
                    'rgb(176,224,230)',
                    'rgb(55, 86, 144)'
                ],
                borderColor: [
                    'rgba(220,20,60,1)',
                    'rgba(176,224,230,1)',
                    'rgb(55, 86, 144,1)'
                ],
                borderWidth: 1
            }]
        }
    });
}


