var email2 = "";
var senha2 = "";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com"
};
firebase.initializeApp(config);
var db = firebase.firestore();
const storageRef = firebase.storage().ref();

//Função para enviar ao banco
data = new Date
var dia = data.getDate().toString();
var mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
var anoF = data.getFullYear();
var dataCadastro = dia + "/" + mes + "/" + anoF;
function set() {
    //inicializando o firebase e o banco de dados


    // Create a storage reference from our storage service


    //Pegando os valores do relatório 
    var nomeFantasia = document.getElementById("nomeFantasia").value;
    var razaoSocial = document.getElementById("razaoSocial").value;
    var CNPJ = document.getElementById("CNPJ").value;
    var RepresentanteLegal = document.getElementById("RepresentanteLegal").value;
    var Endereco = document.getElementById("Endereco").value;
    var numero = document.getElementById("Numero").value;
    var Bairro = document.getElementById("Bairro").value;
    var Cidade = document.getElementById("Cidade").value;
    var Estado = document.getElementById("Estado").value;
    var NomeRepresentante = document.getElementById("Nome").value;
    var CargoRepresentante = document.getElementById("Cargo").value;
    var CEP = document.getElementById("CEP").value;
    var CPF = document.getElementById("CPF").value;
    var RG = document.getElementById("RG").value;
    var OE = document.getElementById("OE").value;
    var Telefone1 = document.getElementById("Telefone1").value;
    var Telefone2 = document.getElementById("Telefone2").value;
    var Area = document.getElementById("Area").value

    //var imagemPerfil = document.getElementById('imagemPerfil');

    if (nomeFantasia == "" || nomeFantasia == null || razaoSocial == "" || razaoSocial == null || Endereco == "" || Endereco == null || Matricula == "" || Matricula == null || Curso == "" || Curso == null ||
        Periodo == "" || Periodo == null || numero == "" || numero == null || Bairro == "" || Bairro == null || Cidade == "" || Cidade == null ||
        Estado == "" || Estado == null || RepresentanteLegal == "" || RepresentanteLegal == null || CEP == "" || CEP == null || CPF == "" || CPF == null || RG == "" || RG == null ||
        OE == "" || OE == null || Telefone1 == "" || Telefone1 == null || Telefone2 == "" || Telefone2 == null) {
        window.alert("Verifique os campos e tente novamente!")
    } else {

    }

    //inserindo os valores no banco, onde o valor antes dos ":" é o indice do banco e o nome depois do ":" são as variaveis locais
    db.collection("Empresa").add({
        nomeFantasia: nomeFantasia,
        Ativado: true,
        Area: Area,
        razaoSocial: razaoSocial,
        CNPJ: CNPJ,
        Telefone1: Telefone1,
        Telefone2: Telefone2,
        RepresentanteLegal: RepresentanteLegal,
        Endereco: Endereco,
        numero: numero,
        Bairro: Bairro,
        Cidade: Cidade,
        Estado: Estado,
        NomeRepresentante: NomeRepresentante,
        CargoRepresentante: CargoRepresentante,
        CEP: CEP,
        CPF: CPF,
        RG: RG,
        OE: OE,
        Telefone1: Telefone1,
        Telefone2: Telefone2,
        uid: "",
        uidDoc: "",
        Email: "",
        QntVagas: 0,
        DataCadastro: dataCadastro,
        Ativado: true,
        VagasRaiz: {

            Agrarias: 0,
            TI: 0,
            Quimica: 0,
            Secretariado: 0,
            Adminstracao: 0
        }



    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            window.alert("Cadastro Realizado com sucesso!")
            // uploadFoto(imagemPerfil)
            window.localStorage.setItem("docRef", docRef.id);
            location.href = "./CadastraEmpresa2.html";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            window.alert("Erro ao cadastrar! " + error)
        });
}


function set2() {

    var Email = document.getElementById("Email").value;
    var Senha = document.getElementById("Senha").value;
    email2 = Email;
    senha2 = Senha;
    firebase.auth().createUserWithEmailAndPassword(email2, senha2).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
        console.log(errorCode + " " + errorMessage);
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            var uidDoc = user.uid;
            var uid = window.localStorage.getItem('docRef')
            set3(uid, email, senha2, uidDoc);

        } else {

        }
    });
}


//uid é o uid do documento criado na coleção empresas uidDoc é o hash do auth
function set3(uid, email, Senha, uidDoc) {
    var db = firebase.firestore();
    var docRef = window.localStorage.getItem("docRef");
    var washingtonRef = db.collection("Empresa").doc(docRef);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        uid: uid,
        uidDoc: uidDoc,
        Email: email
    })
        .then(function () {
            console.log("Document successfully updated!");

            set4(email, Senha)
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

}





function set4(userEmail, userPass) {



    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Deu ruim" + errorMessage);
        // ...
    });
    //emaildescolado@gmail.com
    window.alert("Pronto, tente realizar seu login!");
    window.self.location.href = "./loginEmpresa.html";

}








/*
window.onload = function () {

    var imagemPerfil = document.getElementById('imagemPerfil')
    var progressbar = document.getElementById('progressbar')

    imagemPerfil.addEventListener('change', function (e) {
        var file2 = e.target.files[0];
        var user = firebase.auth().currentUser;

        var storageRef = firebase.storage().ref('Empresa');

        var task = storageRef.put(file2);

        task.on('state_changed', function (snapshot) {

            var percetage = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
            console.log("upload is " + percetage + "%");
            progressbar.value = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
            uploadStatus2.style.display = "block"


        },
            function error(err) {
                //window.alert("err"+err)
                uploadStatus2.innerHTML = "Erro no upload"
            },
            function complete() {
                uploadStatus2.innerHTML = "Upload Completo"
                upload2Completed = true
                storageRef.getDownloadURL().then(function (url) {
                    imgBanner = url
                    console.log(imgBanner)
                });

            }

        );
    });
}

*/


