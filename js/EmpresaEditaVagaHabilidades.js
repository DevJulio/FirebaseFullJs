
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();


var docid = window.localStorage.getItem('docid')



var docidVaga = window.localStorage.getItem('docidVaga')

var HabilidadesLista = document.getElementById('HabilidadesLista')
var Habilidades2 = [];
var Habilidades3 = "";
var tamanhoHabilidades

var y = 0;





var docRef = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

docRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        tamanhoHabilidades = doc.data().Habilidades.length;


        var z = 0;
        HabilidadesLista.innerHTML = ``
        for (z = 0; z < tamanhoHabilidades; z++) {
            Habilidades2[z] = doc.data().Habilidades[z];

            HabilidadesLista.innerHTML += `


<div class="form-group  col-sm-6 " id="HabilidadeDiv${z}>
<label for="Nome" style="background-color: white">Habilidade ${z + 1}: </label>
<input type="text" class="form-control" id="${z - 1}" placeholder="Nome" value="${doc.data().Habilidades[z]}">
</br>

<button id="${z}" href="#" type="button" class="btn btn-danger" onclick="ExcluirHabilidade(id)">Excluir</button>
</div>





    `
        }

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});


/*




 <div  class="d-flex justify-content-center" >

            <button type="button" class="btn btn-success" onclick="Redireciona()">Vizualizar e editar Habilidades </button>


        </div>

        <script>
            function Redireciona(){
                window.location.href = "./EmpresaEditaVagaHabilidades.html"
            }

        </script>










*/


function ExcluirHabilidade(z) {

    //style:block e excluir do firebase
    /*
        document.getElementById("HabilidadeDiv"+z).style.display = "block"
    
        console.log("//////////////////")
    */

   
        Habilidades2.splice(z, 1)



    // delete Habilidades2[z];

    var tamanhoHabilidades2 = Habilidades2.length;
    for (z = 0; z < tamanhoHabilidades2; z++) {
        console.log(z, Habilidades2[z])

    }
    console.log("//////////////////")

    
        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);
    
        return Att.update({
            Habilidades: Habilidades2
        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Habilidade atualizada com suscesso!")
                location.reload()
    
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });
    
  








            
}




