var db = firebase.firestore();
//var user = firebase.auth().currentUser;
//var user = user.uid;
var tabela = document.getElementById('Contato');
var HabilidadesLista = document.getElementById('Habilidades');
var ExperienciasLista = document.getElementById('Experiencias');
var PalavrasChaveLista = document.getElementById('PalavrasChave');
var InfoLista = document.getElementById('info');


var Experiencias = [];
var Habilidades = [];
var PalavrasChaveArray = [];
var uid = window.localStorage.getItem('uid')
var docid = localStorage.getItem("idDoAluno")


db.collection("Alunos").where("uid", "==", uid)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            tabela.innerHTML = '';
            HabilidadesLista.innerHTML = '';
            ExperienciasLista.innerHTML = '';
            InfoLista.innerHTML = '';
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var tamanhoExperiencias = doc.data().Experiencias.length;
            var tamanhoHabilidades = doc.data().Habilidades.length;
            var tamanhoPalvrasChave = doc.data().PalavrasChave.length;
            /*
                        InfoLista.innerHTML += `
                        <div class="form-group  col-sm-6 ">
                        <label for="Nome" style="background-color: white">Curso: </label>
                        <input type="text" class="form-control" id="Curso" placeholder="Nome" value="${doc.data().Curso}">
                          </div>
                        <div class="form-group col-sm-6">
                            <label for="Telefone" style="background-color: white">Período: </label>
                            <input type="text" class="form-control" id="Periodo" placeholder="Telefone" value="${doc.data().Periodo}">
                        </div>
                      <h3> Instituição: IF Goiano, Campus Iporá</h3>
                      </br>
                        `
            */
















            tabela.innerHTML += `

                <div class="form-group  col-sm-6 ">
                <label for="Nome" style="background-color: white">Nome: </label>
                <input type="text" class="form-control" id="Nome" placeholder="Nome" value="${doc.data().ReferenciaContato.Nome}">
                  </div>
            <div class="form-group col-sm-6">
                <label for="Telefone" style="background-color: white">Contato: </label>
                <input type="text" class="form-control" id="Telefone" placeholder="Telefone" value="${doc.data().ReferenciaContato.Telefone}">
            </div>



                `

            var z = 0;

            for (z = 0; z < tamanhoHabilidades; z++) {
                Habilidades[z] = doc.data().Habilidades[z];

                HabilidadesLista.innerHTML += `


                <div class="form-group  col-sm-6 " id="HabilidadeDiv${z}>
                <label for="Nome" style="background-color: white">Habilidade ${z + 1}: </label>
                <input type="text" class="form-control" id="Habilidade${z}" placeholder="Nome" value="${doc.data().Habilidades[z]}">
                </br>
               
                <button id="${z}" href="#" type="button" class="btn btn-danger" onclick="ExcluirHabilidade(id)">Excluir Habilidade</button>
                </div>
                
                
                


                    `
            }





            var y = 0;

            for (y = 0; y < tamanhoExperiencias; y++) {
                Experiencias[y] = doc.data().Experiencias[y]
                ExperienciasLista.innerHTML += `


                <div class="form-group  col-sm-6 " id="ExperienciasDiv${y}>
                <label for="Nome" style="background-color: white">Experiencias ${y + 1}: </label>
                <input type="text" class="form-control" id="Experiencias${y}" placeholder="Nome" value="${doc.data().Experiencias[y]}">
                </br>
                
                 <button id="${y}" href="#" type="button" class="btn btn-danger" onclick="ExcluirExperiencias(id)">Excluir Experiencias</button>
                </div>
                
                 
                    `
            }








            var x = 0;

            for (x = 0; x < tamanhoPalvrasChave; x++) {
                PalavrasChaveArray[x] = doc.data().PalavrasChave[x];

                PalavrasChaveLista.innerHTML += `


                <div class="form-group  col-sm-6 " id="HabilidadeDiv${x}>
                <label for="Nome" style="background-color: white">Habilidade ${x + 1}: </label>
                <input type="text" class="form-control" id="Habilidade${x}" placeholder="Nome" value="${doc.data().PalavrasChave[x]}">
                </br>
               
                <button id="${x}" href="#" type="button" class="btn btn-danger" onclick="ExcluirPalavraChave(id)">Excluir Habilidade</button>
                </div>
                
                
                


                    `
            }











        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function ExcluirHabilidade(z) {


    if (Habilidades.length == 1) {
        window.alert("Você não pode deixar seu currículo sem informações!")
    } else {


        Habilidades.splice(z, 1)


        var Att = db.collection("Alunos").doc(docid);

        return Att.update({


            Habilidades: Habilidades


        })
            .then(function () {
                console.log("Document successfully updated!");
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });

    }
}

function ExcluirExperiencias(z) {

    if (Experiencias.length == 1) {
        window.alert("Você não pode deixar seu currículo sem informações!")
    } else {

        Experiencias.splice(z, 1)


        var Att = db.collection("Alunos").doc(docid);

        return Att.update({


            Experiencias: Experiencias


        })
            .then(function () {
                console.log("Document successfully updated!");
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


    if (PalavrasChaveArray.length == 1) {
        window.alert("Você não pode deixar seu currículo sem informações!")
    } else {

        PalavrasChaveArray.splice(z, 1)


        var Att = db.collection("Alunos").doc(docid);

        return Att.update({


            PalavrasChave: PalavrasChaveArray


        })
            .then(function () {
                console.log("Document successfully updated!");
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });
    }
}

function atualizaHabilidades() {
    var ExperienciasFinal
    var HabilidadesFinal
    var PalavrasChaveFinal


    var a = false
    var b = false
    var c = false

    var Experiencia2 = $('input[name^=ExperienciaVetor]').map(function (idx, elem) {
        return $(elem).val();
    }).get();

    var Habilidades2 = $('input[name^=HabilidadesVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();

    var PalavrasChave2 = $('input[name^=PalavrasChaveVetor]').map(function (idx, elem) {
        return $(elem).val().toLowerCase();
    }).get();




    console.log(Experiencia2)

    console.log(Habilidades2)


    var Curso = document.getElementById("Curso").value;
    var Periodo = document.getElementById("Periodo").value;
    var idioma1 = document.getElementById("idioma1").value;
    var idioma2 = document.getElementById("idioma2").value;
    var ContatoRefNome = document.getElementById("Nome").value;
    var ContatoRefTelefone = document.getElementById("Telefone").value;

    if (Experiencia2 == "") {
        a = false
    } else {
        a = true
        ExperienciasFinal = Experiencia2.concat(Experiencias)
    }
    if (Habilidades2 == "") {

        b = false
    } else {
        b = true
        HabilidadesFinal = Habilidades2.concat(Habilidades)
    }

    if (PalavrasChave2 == "") {

        c = false
    } else {
        c = true
        PalavrasChaveFinal = PalavrasChave2.concat(PalavrasChaveArray)
    }






    console.log(a)
    console.log(b)
    console.log(c)




    if (a && b) {

        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            },
            Experiencias: ExperienciasFinal,
            Habilidades: HabilidadesFinal



        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Currículo atualizado com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    } else if (a && b && c) {

        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            },
            Experiencias: ExperienciasFinal,
            Habilidades: HabilidadesFinal,
            PalavrasChave: PalavrasChaveFinal



        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Currículo atualizado com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    }


    else if (a) {

        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            },
            Experiencias: ExperienciasFinal

        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Currículo atualizado com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });



    } else if (b) {

        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            },

            Habilidades: HabilidadesFinal



        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Currículo atualizado com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    } else if (c) {

        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            },

            PalavrasChave: PalavrasChaveFinal



        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Currículo atualizado com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    }





    else {




        var Att = db.collection("Alunos").doc(docid);

        return Att.update({
            Curso: Curso,
            Periodo: Periodo,
            Idiomas: {
                idioma1: idioma1,
                idioma2: idioma2

            },
            ReferenciaContato: {
                Nome: ContatoRefNome,
                Telefone: ContatoRefTelefone
            }

        })
            .then(function () {
                console.log("Document successfully updated!");
                window.alert("Vaga atualizada com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });


    }

}