firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var docid = window.localStorage.getItem('docid')
var idenificador
var db = firebase.firestore();
var Card = document.getElementById('CardPrincipal');
var CardB = document.getElementById('CardPrincipalB');
var CardSecundario = document.getElementById('CardSecundario')
var docidVaga = window.localStorage.getItem('IdVaga') // ao clicar na vaga
var docid = window.localStorage.getItem('docid')// No login
var j = 0;
var i;
var z = 0;
var Cidade;
var Curso;
var Periodo;
var Sexo;
var Idioma1;
var Idioma2;
var PalavrasChave = []
var PalavrasChaveAluno = []
var NomesAlunos = [];
var DocAlunos = [];
var AlunosMaiores = []
var AlunosMaioresIndice = []
var DemaisAlunosIndice = []
var tamanhoPalavrasChave;
var NomesAlunosAux = [];
var DemaisAlunos = []
//vai verificar se existe ou não nomes iguais.
var ExisteIgual = false

Card.innerHTML = '';
CardB.innerHTML = '';

db.collection("Empresa").doc(docid).collection("Vagas").where("uid", "==", docidVaga).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        Cidade = doc.data().Cidade
        Curso = doc.data().Curso
        Periodo = doc.data().Periodo
        Sexo = doc.data().Sexo
        Idioma1 = doc.data().Idioma1
        Idioma2 = doc.data().Idioma2
        PalavrasChave = doc.data().PalavrasChave
        tamanhoPalavrasChave = PalavrasChave.length;
        //  console.log("Tamanho: ", tamanhoPalavrasChave)

        for (i = 0; i < tamanhoPalavrasChave; i++) {


            db.collection("Alunos").where("Cidade", "==", Cidade).where("Area", "==", Curso).where("PalavrasChave", "array-contains", PalavrasChave[i]).onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    NomesAlunos.push(doc.id)
                    DocAlunos.push(doc.id)

                });
            });
        }
    });
});

var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(compara());
    }, 7000);
});

promise1.then(function (value) {
    //console.log(value);
    // expected output: "foo"
});

//console.log("fon");


function compara() {
    var indice = 0;
    var maior = 0;
    var nomes = NomesAlunos;
    var nomes_lista = [];
    var nomes_listaAux = [];
    var nome_existe = false;
    var a
    var b
    var c
    // percorrer a variavel nomes
    for (var i = 0; i < nomes.length; i++) {
        nome_existe = false;
        // percorre a tabela de nomes pra ver se ja existe
        for (var z = 0; z < nomes_lista.length; z++) {
            if (nomes[i] == nomes_lista[z].nome) {
                nome_existe = true;
                nomes_lista[z].total = nomes_lista[z].total + 1;
            }
        }
        if (!nome_existe) {
            nomes_lista.push({ nome: nomes[i], total: 1 })
        }
    }

    //console.log(nomes_lista.length);
    //Ensino Médio: TEDS
    maior = nomes_lista[0].total
    for (a = 0; a < nomes_lista.length; a++) {
        if (maior < nomes_lista[a].total) {
            maior = nomes_lista[a].total
            indice = a
        }

        console.log(nomes_lista[a].nome, "   ", nomes_lista[a].total)



    }
    console.log(maior)
    //Aqui é verificado se existe uma outra pessoa que tenha quantidades iguais de palavras chave em comum
    for (b = 0; b < nomes_lista.length; b++) {
        if (maior == nomes_lista[b].total && nomes_lista[indice].nome != nomes_lista[b].nome) {
            AlunosMaiores.push(nomes_lista[b].nome)
            AlunosMaioresIndice.push(b)
            ExisteIgual = true;


        } else {

        }
    }


    if (ExisteIgual) {

        for (b = 0; b < nomes_lista.length; b++) {
            if (maior > nomes_lista[b].total) {
                console.log(nomes_lista[b].nome, b)
                DemaisAlunosIndice.push(b)
            }
        }


        AlunosMaioresIndice.push(indice)
        AlunosMaiores.push(nomes_lista[indice].nome)
        CardB.innerHTML = '';


        Card.innerHTML += ` <h5 class="card-title text-center">Existe mais de um aluno recomendado para essa vaga.</h5>`


        for (i = 0; i < AlunosMaioresIndice.length; i++) {

            var docRef = db.collection("Alunos").doc(nomes_lista[AlunosMaioresIndice[i]].nome)

            docRef.get().then(function (doc) {
                if (doc.exists) {


                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());

                    var tamanhoExperiencias = doc.data().Experiencias.length;

                    // console.log(tamanhoExperiencias)
                    var z = 0;
                    var Experiencias = "";
                    for (z = 0; z < tamanhoExperiencias; z++) {
                        Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                    }

                    Experiencias = Experiencias.split('*');

                    for (let i = 0; i < Experiencias.length; i++)
                        Experiencias[i] = Experiencias[i] + "<br>";

                    Experiencias = Experiencias.join('');

                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    /////////////////////////////////////////////////////////////////// 

                    var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                    // console.log(tamanhoPalvrasChave)
                    var z = 0;
                    var PalavrasChave = "";
                    for (z = 0; z < tamanhoPalvrasChave; z++) {
                        PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                    }

                    PalavrasChave = PalavrasChave.split('*');

                    for (let i = 0; i < PalavrasChave.length; i++)
                        PalavrasChave[i] = PalavrasChave[i] + "<br>";

                    PalavrasChave = PalavrasChave.join('');


                    CardB.innerHTML += `  
                      <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <h5>Dados Profissionais </h5>
                </ul>
            </div>
            <div align="left" class="card-body">
            <h2 class="card-title text-center"> ${doc.data().Nome}</h2>
            <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
            <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
            <p class="card-text text-left">Experiências: </p>
            <p class="card-text text-left">${Experiencias}</p>
            <p class="card-text text-left">Habilidades: </p>
            <p class="card-text text-left">${Habilidades} </p>
            <p class="card-text text-left">Palavras chave : </p>
            <p class="card-text text-left">${PalavrasChave} </p>
            <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>
            
            </div>
            
            </div>
            </br>
                
            <div align="center" class="card-body">

            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="capturaId(id)"
                data-toggle="modal" data-target="#ModalEmail">Enviar Email</button>

        </div>
        </br>
            `


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }



        CardSecundario.innerHTML = `  `

        for (i = 0; i < DemaisAlunosIndice.length; i++) {


            console.log(nomes_lista[DemaisAlunosIndice[i]].nome)






            var docRef = db.collection("Alunos").doc(nomes_lista[DemaisAlunosIndice[i]].nome)

            docRef.get().then(function (doc) {
                if (doc.exists) {

                    console.log(doc.data().Nome)
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());

                    var tamanhoExperiencias = doc.data().Experiencias.length;

                    // console.log(tamanhoExperiencias)
                    var z = 0;
                    var Experiencias = "";
                    for (z = 0; z < tamanhoExperiencias; z++) {
                        Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                    }

                    Experiencias = Experiencias.split('*');

                    for (let i = 0; i < Experiencias.length; i++)
                        Experiencias[i] = Experiencias[i] + "<br>";

                    Experiencias = Experiencias.join('');

                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    /////////////////////////////////////////////////////////////////// 

                    var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                    // console.log(tamanhoPalvrasChave)
                    var z = 0;
                    var PalavrasChave = "";
                    for (z = 0; z < tamanhoPalvrasChave; z++) {
                        PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                    }

                    PalavrasChave = PalavrasChave.split('*');

                    for (let i = 0; i < PalavrasChave.length; i++)
                        PalavrasChave[i] = PalavrasChave[i] + "<br>";

                    PalavrasChave = PalavrasChave.join('');


                    CardSecundario.innerHTML += `  
                                  <div class="card text-center">
                        <div class="card-header">
                            <ul class="nav nav-pills card-header-pills">
                                <h5>Dados Profissionais </h5>
                            </ul>
                        </div>
                        <div align="left" class="card-body">
                        <h2 class="card-title text-center"> ${doc.data().Nome}</h2>
                        <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
                        <p class="card-text text-left">Idiomas: </p>
                        <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
                        <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
                        <p class="card-text text-left">Experiências: </p>
                        <p class="card-text text-left">${Experiencias}</p>
                        <p class="card-text text-left">Habilidades: </p>
                        <p class="card-text text-left">${Habilidades} </p>
                        <p class="card-text text-left">Palavras chave : </p>
                        <p class="card-text text-left">${PalavrasChave} </p>
                        <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>
                        
                        </div>
                        
                        </div>
                        </br>
                            
                        <div align="center" class="card-body">
            
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="capturaId(id)"
                            data-toggle="modal" data-target="#ModalEmail">Enviar Email</button>
            
                    </div>
                    </br>
                        `


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }



    } else {

        ///Alunos simples:



        for (b = 0; b < nomes_lista.length; b++) {
            if (nomes_lista[b].nome != nomes_lista[indice].nome) {
                nomes_listaAux.push(nomes_lista[b].nome)
            }

        }


        for (b = 0; b < nomes_listaAux.length; b++) {
            console.log(nomes_listaAux[b])
        }

        Card.innerHTML = `

        <h5 class="card-title text-left">Este aluno é mais recomendado para essa vaga.</h5>
        <p class="card-text text-left">Possuindo: ${nomes_lista[indice].total} das ${tamanhoPalavrasChave} palavras chave solicidatadas </p>`


        //Nas linhas de cima a variavel "DocAlunos", recebe todos os docIds dos alunos compativeis. o indice que é acessado no vetor citado
        //é o indice da pessoa com a maior capacidade encontrada para a vaga

        var docRef = db.collection("Alunos").doc(DocAlunos[indice])

        docRef.get().then(function (doc) {
            if (doc.exists) {

                CardB.innerHTML = '';
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());

                var tamanhoExperiencias = doc.data().Experiencias.length;

                //console.log(tamanhoExperiencias)
                var z = 0;
                var Experiencias = "";
                for (z = 0; z < tamanhoExperiencias; z++) {
                    Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                }

                Experiencias = Experiencias.split('*');

                for (let i = 0; i < Experiencias.length; i++)
                    Experiencias[i] = Experiencias[i] + "<br>";

                Experiencias = Experiencias.join('');

                ///////////////////////////////////////////////////////////////////

                var tamanhoHabilidades = doc.data().Habilidades.length;

                // console.log(tamanhoHabilidades)
                var z = 0;
                var Habilidades = "";
                for (z = 0; z < tamanhoHabilidades; z++) {
                    Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                }

                Habilidades = Habilidades.split('*');

                for (let i = 0; i < Habilidades.length; i++)
                    Habilidades[i] = Habilidades[i] + "<br>";

                Habilidades = Habilidades.join('');


                ///////////////////////////////////////////////////////////////////

                var tamanhoHabilidades = doc.data().Habilidades.length;

                //console.log(tamanhoHabilidades)
                var z = 0;
                var Habilidades = "";
                for (z = 0; z < tamanhoHabilidades; z++) {
                    Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                }

                Habilidades = Habilidades.split('*');

                for (let i = 0; i < Habilidades.length; i++)
                    Habilidades[i] = Habilidades[i] + "<br>";

                Habilidades = Habilidades.join('');


                /////////////////////////////////////////////////////////////////// 

                var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                // console.log(tamanhoPalvrasChave)
                var z = 0;
                var PalavrasChave = "";
                for (z = 0; z < tamanhoPalvrasChave; z++) {
                    PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                }

                PalavrasChave = PalavrasChave.split('*');

                for (let i = 0; i < PalavrasChave.length; i++)
                    PalavrasChave[i] = PalavrasChave[i] + "<br>";

                PalavrasChave = PalavrasChave.join('');


                CardB.innerHTML += `  
                  <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <h5>Dados Profissionais </h5>
            </ul>
        </div>
        <div align="left" class="card-body">
        <h2 class="card-title text-center">${doc.data().Nome}</h2>
        <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
        <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
        <p class="card-text text-left">Idiomas: </p>
        <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
        <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
        <p class="card-text text-left">Experiências: </p>
        <p class="card-text text-left">${Experiencias}</p>
        <p class="card-text text-left">Habilidades: </p>
        <p class="card-text text-left">${Habilidades} </p>
        <p class="card-text text-left">Palavras chave : </p>
        <p class="card-text text-left">${PalavrasChave} </p>
        <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>
        
        </div>
        
        </div>
        </br>
            
        <div align="center" class="card-body">

        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="capturaId(id)"
            data-toggle="modal" data-target="#ModalEmail">Enviar Email</button>

    </div>
    </br>
        
        `
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });




        ////////////////////////////////////////////



        CardSecundario.innerHTML = `  `

        for (i = 0; i < nomes_listaAux.length; i++) {




            var docRef = db.collection("Alunos").doc(nomes_listaAux[i])

            docRef.get().then(function (doc) {
                if (doc.exists) {

                    console.log(doc.data().Nome)
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());

                    var tamanhoExperiencias = doc.data().Experiencias.length;

                    // console.log(tamanhoExperiencias)
                    var z = 0;
                    var Experiencias = "";
                    for (z = 0; z < tamanhoExperiencias; z++) {
                        Experiencias = Experiencias + doc.data().Experiencias[z] + "*"
                    }

                    Experiencias = Experiencias.split('*');

                    for (let i = 0; i < Experiencias.length; i++)
                        Experiencias[i] = Experiencias[i] + "<br>";

                    Experiencias = Experiencias.join('');

                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    ///////////////////////////////////////////////////////////////////

                    var tamanhoHabilidades = doc.data().Habilidades.length;

                    // console.log(tamanhoHabilidades)
                    var z = 0;
                    var Habilidades = "";
                    for (z = 0; z < tamanhoHabilidades; z++) {
                        Habilidades = Habilidades + doc.data().Habilidades[z] + "*"
                    }

                    Habilidades = Habilidades.split('*');

                    for (let i = 0; i < Habilidades.length; i++)
                        Habilidades[i] = Habilidades[i] + "<br>";

                    Habilidades = Habilidades.join('');


                    /////////////////////////////////////////////////////////////////// 

                    var tamanhoPalvrasChave = doc.data().PalavrasChave.length;

                    // console.log(tamanhoPalvrasChave)
                    var z = 0;
                    var PalavrasChave = "";
                    for (z = 0; z < tamanhoPalvrasChave; z++) {
                        PalavrasChave = PalavrasChave + doc.data().PalavrasChave[z] + "*"
                    }

                    PalavrasChave = PalavrasChave.split('*');

                    for (let i = 0; i < PalavrasChave.length; i++)
                        PalavrasChave[i] = PalavrasChave[i] + "<br>";

                    PalavrasChave = PalavrasChave.join('');


                    CardSecundario.innerHTML += `  
                              <div class="card text-center">
                    <div class="card-header">
                        <ul class="nav nav-pills card-header-pills">
                            <h5>Dados Profissionais </h5>
                        </ul>
                    </div>
                    <div align="left" class="card-body">
                    <h2 class="card-title text-center"> ${doc.data().Nome}</h2>
                    <h5 class="card-title text-center">Área: ${doc.data().Area}</h5>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Instituição: IF Goiano, Campus Iporá</p>
                    <p class="card-text text-left">Idiomas: </p>
                    <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
                    <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
                    <p class="card-text text-left">Experiências: </p>
                    <p class="card-text text-left">${Experiencias}</p>
                    <p class="card-text text-left">Habilidades: </p>
                    <p class="card-text text-left">${Habilidades} </p>
                    <p class="card-text text-left">Palavras chave : </p>
                    <p class="card-text text-left">${PalavrasChave} </p>
                    <p class="card-text text-left">Referências para contato: ${doc.data().ReferenciaContato.Nome}, ${doc.data().ReferenciaContato.Telefone} </p>
                    
                    </div>
                    
                    </div>
                    </br>
                        
                    <div align="center" class="card-body">
        
                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="capturaId(id)"
                        data-toggle="modal" data-target="#ModalEmail">Enviar Email</button>
        
                </div>
                </br>
                    `


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }


    }

    console.log(AlunosMaiores)
}
function capturaId(id) {
    idenificador = id;
}

function EnviaEmail() {
    var textoEmail = document.getElementById('textoEmail').value;
    var existe = false


    db.collection("Alunos").doc(idenificador).collection("ContatoEmpresa").where("idVaga", "==", docidVaga)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    existe = true

                } else {

                }

            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

    window.alert("Aguarde...")
    var promise1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(EnviaEmail2(textoEmail, existe));
        }, 3000);
    });

    promise1.then(function (value) {
        //console.log(value);
        // expected output: "foo"
    });




}
function EnviaEmail2(textoEmail, existe) {
    
    var a = false
    var b = false
    existe = false

    if (existe) {
        window.alert("Já foi mandado uma solicitação dessa vaga para esse aluno, aguarde resposta.")
    } else {


        db.collection("Alunos").doc(idenificador).collection("ContatoEmpresa").add({
            Mensagem: textoEmail,
            idEmpresa: docid,
            idVaga: docidVaga

        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                window.alert("Mensagem enviada com sucesso!")

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                window.alert("Erro ao enviar! " + error)
            });
        console.log(textoEmail);







    }




}

/*

Este código é dividido da seguinte forma:

1º Quando o usuário clicar na vaga que ele deseja procurar os alunos compativeis,
o sistema fará uma pesquisa no banco de dados com cada uma das palavras chave.

2º O sistema verificará qual é o usuário tem mais palavras chave em comum com a vaga de emprego que foi clicada,
Após isso verificar quem possui a maior quantidade de palavras chave em comum com a vaga, o sistema verificará se existe
uma outra pessoa que possui o mesmo número, ou seja: Maior == outroDoVetor[].

3º Após verificar se existe ou não podem acontecer duas coisas:
    3.1: Caso exista o sistema concatenará os mais indicados e os menos indicados, dispondo em partes diferentes da tela;
    3.2: Caso não exista, o usuário mais recomendado ficará separado assim como no item anterior.

Esse código durou cerca de 3 semanas para ser escrito e só foi possível com a ajuda de Guilhermy e do Erick.
*/