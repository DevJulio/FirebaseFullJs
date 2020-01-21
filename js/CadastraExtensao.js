
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
};
firebase.initializeApp(config);
var db = firebase.firestore();

var email2 = "";
var senha2 = "";
//Função para enviar ao banco
function set() {

    var Nome = document.getElementById("nomeComleto").value;
    data = new Date
    var dia = data.getDate().toString();
    var mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
    var anoF = data.getFullYear();
    var dataCadastro = dia + "/" + mes + "/" + anoF;
    //var imagemPerfil = document.getElementById('imagemPerfil');

    if (Nome == "" || Nome == null) {
        window.alert("Verifique os campos e tente novamente!")
    } else {

        //inserindo os valores no banco, onde o valor antes dos ":" é o indice do banco e o nome depois do ":" são as variaveis locais
        db.collection("Admin").add({
            Nome: Nome,
            DataCadastro: dataCadastro,
            uid: "",
            uidDoc: "",
            Email: ""



        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                window.alert("Cadastro Realizado com sucesso!")
                // uploadFoto(imagemPerfil)
                window.localStorage.setItem("docRef", docRef.id);
                location.href = "./CadastraExtensao2.html";
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                window.alert("Erro ao cadastrar! " + error)
            });
    }
}


function set2() {

    var Email = document.getElementById("Email").value;
    var Senha = document.getElementById("Senha").value;
    email2 = Email;
    senha2 = Senha;


    if (Email == "" || Email == null || Senha == "" || Senha == null) {
        window.alert("Verifique os campos e tente novamente!")
    } else {




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
}


//uid é o uid do documento criado na coleção empresas uidDoc é o hash do auth
function set3(uid, email, Senha, uidDoc) {
    var db = firebase.firestore();
    var docRef = window.localStorage.getItem("docRef");
    var washingtonRef = db.collection("Admin").doc(docRef);

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

        window.alert("Erro" + errorMessage);
        // ...
    });
    //emaildescolado@gmail.com
    window.alert("Cadastro realizado com sucesso!");

    window.self.location.href = "./ExtencaoIndexNovo.html";

}




