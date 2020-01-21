
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
window.onload = logout()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var user = user.uid;
    var user2 = user.uid;
    console.log(user)

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        var user = firebase.auth().currentUser;
        var user2 = user.uid;
        localStorage.setItem("uid", user2)
        //   window.alert(user2)

        db.collection("Alunos").where("uid", "==", user2)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              localStorage.setItem("docid", doc.id);

              if (doc.data().StatusCadastro == "Aguardando") {
                console.log("Document data:", doc.data().DadosPessoais);

                window.self.location.href = "./404.html";


              } else {

                window.self.location.href = "./AlunoIndex.html";
              }
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });




        return firebase.auth().signInWithEmailAndPassword(email, password);

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  } else {
    //window.self.location.href = "./404.html";
  }

  
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Erro" + errorMessage);
    // ...
  });


}

function logout() {
  firebase.auth().signOut().then(function () {
    console.log("Deslogado")
    window.localStorage.clear();
  }).catch(function (error) {
    // An error happened.
  });
}
function redireciona(a) {

  if (a == 1) {
    location.href = "cadastrodeempresa.html";
  }
  else if (a == 2) {
    location.href = "VizualizaEmpresas.html";
  }

}
