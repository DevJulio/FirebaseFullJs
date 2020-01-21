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
var Area = "";
var cidade = "";
var docid = []

db.collection("Alunos").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            Area = doc.data().Area
            cidade = doc.data().Cidade


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


db.collection("Empresa")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            docid.push(doc.id)


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });




for (var i = 0; i < docid.length; i++) {
    db.collection("Empresa").doc(docid[i]).collection("Vagas")
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


