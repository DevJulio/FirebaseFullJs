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
var tabela = document.getElementById('perfil');
var Descricao = document.getElementById('Descricao')
var Periodo = document.getElementById('PeriodoDeTrabalho')
var HabilidadesLista = document.getElementById('HabilidadesLista')
var PalavrasChaveLista = document.getElementById('PalavrasChaveLista')
var Aluno = document.getElementById('Aluno');
var Habilidades2 = [];
var PalavrasChave2 = [];
var Habilidades3 = "";
var tamanhoHabilidades
var tamanhoPalavrasChave
var y = 0;


var docRef = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

docRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        tamanhoHabilidades = doc.data().Habilidades.length;
        tamanhoPalavrasChave = doc.data().PalavrasChave.length;


        Descricao.innerHTML = `  


<div class="form-group">
<label for="exampleFormControlTextarea1">Descrição da vaga</label>
<textarea class="form-control" id="descricao" rows="5" >${doc.data().Descricao}</textarea>
</div>


`


        Periodo.innerHTML = ` 
<div class="form-row">


<div class="form-group col-md-6">
 <label for="Endereco" style="background-color: white">Período do estágio, de:</label>
 <input type="text" class="form-control" id="Comeco" placeholder="Começo" value="${doc.data().Comeco}">
</div>
<div class="form-group col-md-6">
 <label for="Endereco" style="background-color: white">Período do estágio, até</label>
 <input type="text" class="form-control" id="Final" placeholder="Final"value="${doc.data().Final}">
</div>
<div class="form-group col-md-6">
 <label for="Endereco" style="background-color: white">Total de horas:</label>
 <input type="text" class="form-control" id="Horas" placeholder="horas" value="${doc.data().Horas}">
</div>
<div class="form-group col-md-6">
 <label for="Endereco" style="background-color: white">Carga horária diária:</label>
 <input type="text" class="form-control" id="CargaHoraria" placeholder="Carga horária" value="${doc.data().CargaHoraria}">
</div>
</div>`


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

        var z = 0;
        PalavrasChaveLista.innerHTML = ``
        for (z = 0; z < tamanhoPalavrasChave; z++) {
            PalavrasChave2[z] = doc.data().PalavrasChave[z];
            PalavrasChaveLista.innerHTML += `


<div class="form-group  col-sm-6 " id="PalavrasChavedeDiv${z}>
<label for="Nome" style="background-color: white">Palavra Chave ${z + 1}: </label>
<input type="text" class="form-control" id="${z - 1}" placeholder="Nome" value="${doc.data().PalavrasChave[z]}">
</br>

<button id="${z}" href="#" type="button" class="btn btn-danger" onclick="ExcluirPalavraChave(id)">Excluir</button>
</div>


    `

            if (doc.data().StatusVaga = "Preenchida") {
                Aluno.innerHTML = `
                
              
                <div class="form-group col-md-6">
                <label for="Endereco" style="background-color: white">Período do estágio, de:</label>
                <input type="text" class="form-control" id="Comeco" placeholder="Começo" value="${doc.data().Comeco}">           

                </div>
                
                
                `
            }


        }


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});


function ExcluirHabilidade(z) {

    if (Habilidades2.length == 1) {
        window.alert("Você não pode deixar a vaga sem informações!")
    } else {
        Habilidades2.splice(z, 1)


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




}

function ExcluirPalavraChave(z) {

    if (PalavrasChave2.length == 1) {
        window.alert("Você não pode deixar a vaga sem informações!")
    } else {


    PalavrasChave2.splice(z, 1)


    var tamanhoPalavrasChave2 = PalavrasChave2.length;
    for (z = 0; z < tamanhoPalavrasChave2; z++) {
        console.log(z, PalavrasChave2[z])

    }
    console.log("//////////////////")


    var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

    return Att.update({
        PalavrasChave: PalavrasChave2
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

}

function atualizaVaga() {

    var b = false
    var c = false

    var HabilidadesFinal
    var PalavrasChaveFinal



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


    if (Habilidades == "" || Habilidades == '' || Habilidades == null) {

        b = false
    } else {
        b = true
        HabilidadesFinal = Habilidades.concat(Habilidades)
    }

    if (PalavrasChave == "" || PalavrasChave == '' || PalavrasChave == null) {

        c = false
    } else {
        c = true
        PalavrasChaveFinal = PalavrasChave.concat(PalavrasChave2)
    }

    if (b && c) {
        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

        return Att.update({

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
            Habilidades: HabilidadesFinal,
            PalavrasChave: PalavrasChaveFinal


        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Vaga atualizada com suscesso!")
                window.location.href = "./AlunoIndex.html"
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });

    } else if (b) {
        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

        return Att.update({

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
            Habilidades: HabilidadesFinal



        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Vaga atualizada com suscesso!")
                window.location.href = "./AlunoIndex.html"
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });

    } else if (c) {
        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

        return Att.update({

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
            PalavrasChave: PalavrasChaveFinal


        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Vaga atualizada com suscesso!")
                window.location.href = "./AlunoIndex.html"
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });
    } else {



        var Att = db.collection("Empresa").doc(docid).collection("Vagas").doc(docidVaga);

        return Att.update({

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
            Idioma2: Idioma2


        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Vaga atualizada com suscesso!")
                window.location.href = "./AlunoIndex.html"
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    }




}