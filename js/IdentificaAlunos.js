firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

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
                    NomesAlunos.push(doc.data().Nome)
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

    for (b = 0; b < nomes_lista.length; b++) {
        if (maior > nomes_lista[b].total) {

            DemaisAlunosIndice.push(b)
        }
    }


    AlunosMaioresIndice.push(indice)
    AlunosMaiores.push(nomes_lista[indice].nome)
    console.log(DemaisAlunosIndice)
    console.log(DemaisAlunosIndice.length)
    CardB.innerHTML = '';
    if (ExisteIgual) {


        Card.innerHTML += ` <h5 class="card-title text-center">Existe mais de um aluno recomendado para essa vaga.</h5>`


        for (i = 0; i < AlunosMaioresIndice.length; i++) {

            var docRef = db.collection("Alunos").doc(DocAlunos[AlunosMaioresIndice[i]])

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

            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Aprovar(id)"
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

            var docRef = db.collection("Alunos").doc(DocAlunos[DemaisAlunosIndice[i]])

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

            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Aprovar(id)"
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
        Card.innerHTML = `

        <h5 class="card-title text-left">O Aluno: ${nomes_lista[indice].nome} é mais recomendado para essa vaga.</h5>
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

        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Aprovar(id)"
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











   

    console.log(AlunosMaiores)







    //Caso existam pessoas com os números de palavra chave iguais.




    /*
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        if (AlunosMaiores.length > 1) {
            var i = 0
            for (i = 0; i < AlunosMaiores.length; i++) {
    
    
                Card.innerHTML += `
    
                <h5 class="card-title text-left">O Aluno: ${nomes_lista[indice].nome} é mais recomendado para essa vaga.</h5>
                <p class="card-text text-left">Possuindo: ${nomes_lista[indice].total} das ${tamanhoPalavrasChave} palavras chave solicidatadas </p>`
    
    
                //Nas linhas de cima a variavel "DocAlunos", recebe todos os docIds dos alunos compativeis. o indice que é acessado no vetor citado
                //é o indice da pessoa com a maior capacidade encontrada para a vaga
    
                var docRef = db.collection("Alunos").doc(DocAlunos[AlunosMaiores[i]])
    
                docRef.get().then(function (doc) {
                    if (doc.exists) {
    
                        CardB.innerHTML = '';
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
    
                        var tamanhoExperiencias = doc.data().Experiencias.length;
    
                        console.log(tamanhoExperiencias)
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
    
                        console.log(tamanhoHabilidades)
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
    
                        console.log(tamanhoHabilidades)
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
    
                        console.log(tamanhoPalvrasChave)
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
    
    
    
    
    
    
    
    
    */





}


