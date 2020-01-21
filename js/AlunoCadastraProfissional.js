

var Habilidades = ""
var Experiencia = ""
var PalavrasChave = ""
var idioma1 = ""
var idioma2 = ""
var ContatoRefNome = ""
var ContatoRefTelefone = ""
var Idiomas




//Função para enviar ao banco
function setProf() {
    //inicializando o firebase e o banco de dados



    //Pegando os valores do relatório 



    Habilidades = $('input[name^=HabilidadesVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();


    Experiencia = $('input[name^=ExperienciaVetor]').map(function (idx, elem) {
        return $(elem).val();
    }).get();

    PalavrasChave = $('input[name^=PalavrasChaveVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();


    idioma1 = document.getElementById("idioma1").value;
    idioma2 = document.getElementById("idioma2").value;
    ContatoRefNome = document.getElementById("Nome").value;
    ContatoRefTelefone = document.getElementById("Telefone").value;



    console.log(Habilidades)
    console.log(Experiencia)
    console.log(Idiomas)


    setProf2()

}

function setProf2() {

    var uid = window.localStorage.getItem('docid')
    window.alert(uid)

    var db = firebase.firestore();
    /*
     
    */

    var Aprovar = db.collection("Alunos").doc(uid);
    return Aprovar.update({




        Idiomas: {
            idioma1: idioma1,
            idioma2: idioma1

        },

        PalavrasChave: PalavrasChave,
        Experiencias: Experiencia,
        Habilidades: Habilidades,
        ReferenciaContato: {
            Nome: ContatoRefNome,
            Telefone: ContatoRefTelefone
        },
        DadosProfissionais: true


    })
        .then(function () {
            console.log("Document successfully updated!");

            location.reload();
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Erro ao aprovar!");

        });





}



