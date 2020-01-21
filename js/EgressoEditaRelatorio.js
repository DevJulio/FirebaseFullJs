
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var Projeto = document.getElementById("Projeto").value;
var Trabalhando = document.getElementById("Trabalhando").value;
var TrabalhandoArea = document.getElementById("TrabalhandoArea").value;
var PosGraduacao = document.getElementById("PosGraduacao").value;
var TrabalhandoGraduacao = document.getElementById("TrabalhandoGraduacao").value;
var docid = window.localStorage.getItem('docid')


function EditaRelatorio() {
    var db = firebase.firestore();
    var docRef = window.localStorage.getItem("IdEgresso");
    var washingtonRef = db.collection("Alunos").doc(docid);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        Formulario: {
            Projeto: Projeto,
            Trabalhando: Trabalhando,
            TrabalhandoArea: TrabalhandoArea,
            PosGraduacao: PosGraduacao,
            TrabalhandoGraduacao: TrabalhandoGraduacao
        }

    })
        .then(function () {
            console.log("Document successfully updated!");
            window.alert("Alteração de formulário realizada com sucesso!")
            window.location.href = "./AlunoIndex.html"
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert(error)
        });


}