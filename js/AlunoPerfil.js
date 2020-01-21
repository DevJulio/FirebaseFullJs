
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
var tabela = document.getElementById('dados');
var Egresso = document.getElementById('Egresso')
var uid = window.localStorage.getItem('uid')
var docid = window.localStorage.getItem('docid')
var EgressoP = false

db.collection("Alunos").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            tabela.innerHTML = '';
            Egresso.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            if (doc.data().DadosOrientador.Status) {
                tabela.innerHTML += `
                
                <div class="text-left">
                
                <h5 class="card-title text-center">${doc.data().Nome}</h5>
                </br>
                <img src=${doc.data().urldownload} width="250" height="200" class="rounded">
                </br></br>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
                <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                <p class="card-text text-left">Email: ${doc.data().Email} </p>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                <p class="card-text text-left">RG: ${doc.data().RG} </p>
                <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
                </br>
                <p class="card-text text-left">Professor Orientador:${doc.data().DadosOrientador.NomeOrientador}</p>
                <p class="card-text text-left">Matrícula / SIAPE: ${doc.data().DadosOrientador.SIAPE}</p>
                <h5 class="card-title text-center">Dados do formulário</h5>
                <p class="card-text text-left">Você participou de algum projeto institucional? ${doc.data().Formulario.Projeto}</p>
                <p class="card-text text-left">Você está trabalhado? : ${doc.data().Formulario.Trabalhando}</p>
                <p class="card-text text-left">Você está trabalhado na sua área de formação? ${doc.data().Formulario.TrabalhandoArea}</p>
                <p class="card-text text-left">Você está fazendo ou fez alguma pós-graduação? ${doc.data().Formulario.PosGraduacao}</p>
                <p class="card-text text-left">Se você está trabalhando, começou a trabalhar durante ou depois da graduação? ${doc.data().Formulario.TrabalhandoGraduacao}</p>
                </br>
               
            </div>
            </br>
            <div align="center" class="card-body">
    
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Editar()"
                    data-toggle="modal" data-target="#ModalAprovado">Editar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="EditarEgresso()"
                    data-toggle="modal" data-target="#ModalAprovado">Editar Formulário</button>
    
            </div>
    
    
                `
            } else {
                tabela.innerHTML += `
                
                <div class="text-left">
                <h5 class="card-title text-center">${doc.data().Nome}</h5>
                </br>
                <img src=${doc.data().urldownload} width="250" height="200" class="rounded">
                </br></br>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
                <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                <p class="card-text text-left">Email: ${doc.data().Email} </p>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                <p class="card-text text-left">RG: ${doc.data().RG} </p>
                <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
                </br>
                <div  align="center">
                <h5 class="card-title text-center">Você não possui orientador vinculado! </h5>
                </br>
                </div>  
                <h5 class="card-title text-center">Dados do formulário </h5>
                <p class="card-text text-left">Você participou de algum projeto institucional? ${doc.data().Formulario.Projeto}</p>
                <p class="card-text text-left">Você está trabalhado? : ${doc.data().Formulario.Trabalhando}</p>
                <p class="card-text text-left">Você está trabalhado na sua área de formação? ${doc.data().Formulario.TrabalhandoArea}</p>
                <p class="card-text text-left">Você está fazendo ou fez alguma pós-graduação? ${doc.data().Formulario.PosGraduacao}</p>
                <p class="card-text text-left">Se você está trabalhando, começou a trabalhar durante ou depois da graduação?${doc.data().Formulario.TrabalhandoGraduacao}</p>
                </br>
                 
            </div>
            </br>
            <div align="center" class="card-body">
                
                <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="Editar()"
                    data-toggle="modal" data-target="#ModalAprovado">Editar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="EditarEgresso()"
                    data-toggle="modal" data-target="#ModalAprovado">Editar Formulário</button>
    
            </div>
    
    
                `
            }


            if (doc.data().Egresso) {
                EgressoP = true

            } else {
                EgressoP = false
            }



        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function Editar() {
    window.location.href = "./AlunoEditaPerfil.html"
}

function EditarEgresso() {
   
    if (EgressoP) {
        window.location.href = "./EgressoEditaRelatorio.html"
    }else{
        window.location.href = "./AlunoRelatorio.html"
    }
    
}