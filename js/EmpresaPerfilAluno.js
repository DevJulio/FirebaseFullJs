
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
var Profissional = document.getElementById("Profissional")
var Pessoal = document.getElementById("Pessoal")
var EnderecoDocumentoAluno = localStorage.getItem("EnderecoDocumentoAluno");







function mostraDiv(num) {
    if (num) {
        document.getElementById("Principal").style.display = "none"
        document.getElementById("Profissional").style.display = "block"
    } else {
        document.getElementById("Principal").style.display = "block"
        document.getElementById("Profissional").style.display = "none"
    }

}

function mostraDiv2(num) {
    if (num) {
        document.getElementById("Principal").style.display = "none"
        document.getElementById("Pessoal").style.display = "block"
    } else {
        document.getElementById("Principal").style.display = "block"
        document.getElementById("Pessoal").style.display = "none"
    }

}



db.collection("Alunos").where("uidDoc", "==", EnderecoDocumentoAluno)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            Pessoal.innerHTML = `
            </br></br></br>
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <h5>Dados Pessoais </h5>
                    
                </ul>
            </div>
            <div align="left" class="card-body">
            </br>
                   
                <div class="text-left">
                <h5 class="card-title text-center">${doc.data().Nome}</h5>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
                <p class="card-text text-left">Email: ${doc.data().Email} </p>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
             
                <div align="center" class="card-body">

                <button type="button" class="btn btn-success" onclick="mostraDiv2(false)">Voltar</button>
                </div>
            </div>
            </br>
    
                `

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

            Profissional.innerHTML = `    
            </br></br></br>   
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

        <button type="button" class="btn btn-success" onclick="mostraDiv(false)">Voltar</button>
        </div>
        </div>

    </div>
    </br>
       
 `


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

