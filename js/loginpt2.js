
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"

});
var db = firebase.firestore();

var user = firebase.auth().currentUser;




var docRef = db.collection("Alunos").doc("EYddGteW0S0thSv03uIf");

docRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());

        if (doc.data().StatusCadastro == "Aguardando") {


            window.self.location.href = "./404.html";

        } else {

            window.self.location.href = "./AlunoIndex.html";
        }


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});


