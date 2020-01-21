
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
var tabela = document.getElementById('info');
var QntVagas = 0;
var QntVagas2 = 0;
var uid = window.localStorage.getItem('uid')
var docid = window.localStorage.getItem('docid')
var Curso2 = "";
var cod = 0;
var TI = 0;
var AGROP = 0;
var QUIM = 0;
var SECR = 0;

function setVaga() {
    var TipoVaga = localStorage.getItem("TipoVaga")
    if (TipoVaga == 1) {
        TipoVaga = "Estágio"
    } else {
        TipoVaga = "Definitivo"
    }
    var Descricao = document.getElementById("descricao").value;
    var Comeco = document.getElementById("Comeco").value;
    var Final = document.getElementById("Final").value;
    var Horas = document.getElementById("Horas").value;
    var CargaHoraria = document.getElementById("CargaHoraria").value;
    var Curso = document.getElementById("Curso").value;
    var Periodo = document.getElementById("Periodo").value;
    var Sexo = document.getElementById("Sexo").value;
    var Idioma1 = document.getElementById("Idioma1").value;
    var Idioma2 = document.getElementById("Idioma2").value;
    var Cidade = document.getElementById("Cidade").value;
    var Habilidades = $('input[name^=HabilidadesVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();
    var PalavrasChave = $('input[name^=PalavrasChaveVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();


    data = new Date
    var dia = data.getDate().toString();
    var mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
    var anoF = data.getFullYear();
    var dataCadastro = dia + "/" + mes + "/" + anoF;





    if (Descricao == "" || Descricao == null || Comeco == "" || Comeco == null || Final == "" || Final == null || Horas == "" || Horas == null || Curso == "" || Curso == null ||
        CargaHoraria == "" || CargaHoraria == null || Periodo == "" || Periodo == null || Idioma1 == "" || Idioma1 == null || Cidade == "" || Cidade == null ||
        Idioma2 == "" || Idioma2 == null || Sexo == "" || Sexo == null || Habilidades == "" || Habilidades == null || PalavrasChave == "" || PalavrasChave == null) {
        window.alert("Verifique os campos e tente novamente!")
    } else {




        db.collection("Empresa").doc(docid).collection("Vagas").add({
            StatusVaga: "Aberta",
            TipoVaga: TipoVaga,
            Cidade: Cidade,
            Descricao: Descricao,
            Comeco: Comeco,
            Final: Final,
            Horas: Horas,
            CargaHoraria: CargaHoraria,
            Curso: Curso,
            Periodo: Periodo,
            Sexo: Sexo,
            Idioma1: Idioma1,
            Idioma2: Idioma2,
            Habilidades: Habilidades,
            PalavrasChave: PalavrasChave,
            dataCadastro: dataCadastro,
            Empregado: "",
            Matricula: "",
            uid: "",
            msgRecebida: ""



        })
            .then(function (docRef) {
                AtualizaVagas(Curso);
                console.log("Document written with ID: ", docRef.id);
                window.alert("Cadastro de vaga realizado com sucesso!")
                setVaga2(docRef.id)
                // window.location.href = "./EmpresaIdentifica.html"

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                window.alert("Erro ao cadastrar! " + error)
            });


    }
}



function setVaga2(uid) {

    var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(uid);
    return Att.update({
        uid: uid

    })
        .then(function () {
            console.log("Document successfully updated!");

        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}


function AtualizaVagas(Curso) {







    if (Curso == "T.I") {
        Curso2 = "TI"
        cod = 1
        var docRef = db.collection("Empresa").doc(docid);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(doc.id, " => ", doc.data().VagasRaiz.TI);
                QntVagas = doc.data().QntVagas

                TI = doc.data().VagasRaiz.TI;
                AGROP = doc.data().VagasRaiz.Agrarias;
                QUIM = doc.data().VagasRaiz.Quimica;
                SECR = doc.data().VagasRaiz.Secretariado;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas + 1,
            VagasRaiz: {
                TI: TI + 1,
                Agrarias: AGROP,
                Quimica: QUIM,
                Secretariado: SECR
            }

        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });






    } else if (Curso == "Secretariado") {
        Curso2 = "Secretariado"
        cod = 2

        var docRef = db.collection("Empresa").doc(docid);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(doc.id, " => ", doc.data().VagasRaiz.Secretariado);
                QntVagas = doc.data().QntVagas

                TI = doc.data().VagasRaiz.TI;
                AGROP = doc.data().VagasRaiz.Agrarias;
                QUIM = doc.data().VagasRaiz.Quimica;
                SECR = doc.data().VagasRaiz.Secretariado;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });


        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas + 1,
            VagasRaiz: {

                TI: TI,
                Agrarias: AGROP,
                Quimica: QUIM,
                Secretariado: SECR + 1

            }

        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });







    } else if (Curso == "Agronegócio") {
        Curso2 = "Agrarias"
        cod = 3
        var docRef = db.collection("Empresa").doc(docid);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(doc.id, " => ", doc.data().VagasRaiz.Agrarias);
                QntVagas = doc.data().QntVagas

                TI = doc.data().VagasRaiz.TI;
                AGROP = doc.data().VagasRaiz.Agrarias;
                QUIM = doc.data().VagasRaiz.Quimica;
                SECR = doc.data().VagasRaiz.Secretariado;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });


        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas + 1,
            VagasRaiz: {



                TI: TI,
                Agrarias: AGROP + 1,
                Quimica: QUIM,
                Secretariado: SECR

            }

        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });



    } else if (Curso == "Agronomia") {
        Curso2 = "Agrarias"
        cod = 3

        var docRef = db.collection("Empresa").doc(docid);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(doc.id, " => ", doc.data().VagasRaiz.Agrarias);
                QntVagas = doc.data().QntVagas

                TI = doc.data().VagasRaiz.TI;
                AGROP = doc.data().VagasRaiz.Agrarias;
                QUIM = doc.data().VagasRaiz.Quimica;
                SECR = doc.data().VagasRaiz.Secretariado;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });


        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas + 1,
            VagasRaiz: {
                TI: TI,
                Agrarias: AGROP + 1,
                Quimica: QUIM,
                Secretariado: SECR
            }

        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    } else if (Curso == "Química") {
        Curso2 = "Quimica"
        cod = 4



        var docRef = db.collection("Empresa").doc(docid);

        docRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(doc.id, " => ", doc.data().VagasRaiz.Quimica);
                QntVagas = doc.data().QntVagas

                TI = doc.data().VagasRaiz.TI;
                AGROP = doc.data().VagasRaiz.Agrarias;
                QUIM = doc.data().VagasRaiz.Quimica;
                SECR = doc.data().VagasRaiz.Secretariado;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });








        var Att = db.collection("Empresa").doc(docid);
        return Att.update({
            QntVagas: QntVagas + 1,
            VagasRaiz: {



                TI: TI,
                Agrarias: AGROP,
                Quimica: QUIM + 1,
                Secretariado: SECR

            }

        })
            .then(function () {
                console.log("Document successfully updated!");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });




    }

}


function Redireciona() {

    window.location.href = "./EmpresaIdentifica.html"

}
function EnviaEmail() {
    window.alert("Email enviado com sucesso!")
}
function RedirecionaCadastro(a) {

    if (a == 1) {
        localStorage.setItem("TipoVaga", 1)
        window.location.href = "./CadastraVaga.html"

    } else {
        localStorage.setItem("TipoVaga", 2)
        window.location.href = "./CadastraVaga.html"
    }



}