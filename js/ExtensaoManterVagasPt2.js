firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});

var db = firebase.firestore();
var n = 0;

var tabela = document.getElementById('maior');
var docid = window.localStorage.getItem('EmpresaId')


var NomeEmpresa = "";
var RepresentanteLegal = "";

var docRef = db.collection("Empresa").doc(docid);

docRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        NomeEmpresa = doc.data().nomeFantasia,
            RepresentanteLegal = doc.data().RepresentanteLegal
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});


//Essa função, executa uma pesquisa no banco de dados.
db.collection("Empresa").doc(docid).collection("Vagas")
    .get()
    .then(function (querySnapshot) {
        tabela.innerHTML = '';
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            var tamanhoHabilidades = doc.data().Habilidades.length;


            var Habilidades = "";
            for (z = 0; z < tamanhoHabilidades; z++) {
                Habilidades = Habilidades + doc.data().Habilidades[z] + "*";
                console.log(doc.data().Habilidades[z])

            }


            Habilidades = Habilidades.split('*');

            for (let i = 0; i < Habilidades.length; i++)
                Habilidades[i] = Habilidades[i] + "<br>";

            Habilidades = Habilidades.join('');

            if (doc.data().StatusVaga == "Aberta") {
                n++;

                tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        <h5 class="card-title text-center">Habilidades Solicitadas:</h5>
                        <p class="card-text">${Habilidades}</p>  
                        </br>
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <p class="card-text text-left">Não possui aluno vinculado!</p>
                        
                      </br>
                      <h5 class="card-title text-center">Horários</h5>
                      </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                
                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

                </div>

            </div>
        </div>

        </br> </br>

    
                `
            } else if (doc.data().StatusVaga != "Aberta") {


                tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                       
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <div align="center" class="card-body" id="InfoAluno">
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                        data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                        </div>
                        </br>
                        <h5 class="card-title text-center">Horários</h5>
                        </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                
                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

                </div>

            </div>
        </div>

        </br> </br>

    
                `
            }
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });







function fon() {
    //  mostraDiv();
    var Curso = document.getElementById("Curso").value;
    var Vaga = document.getElementById("Vaga").value;
    if (Curso == "Escolha..." && Vaga == "Escolha...") {

        tabela.innerHTML = "";
        tabela.innerHTML +=
            `
        <div align="center" >

        <h5> Opções inválidas! </h5>

        </div>        
        
       `
    }

    else if (Curso == "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("StatusVaga", "==", Vaga)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <p class="card-text text-left">Não possui aluno vinculado!</p>
                        
                      </br>
                      <h5 class="card-title text-center">Horários</h5>
                      </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

                </div>

            </div>
        </div>

        </br> </br>

    
                `
                    } else {


                        tabela.innerHTML += `
                
            <div class="card text-center">
            <div class="card-header">

                <ul class="nav nav-pills card-header-pills">
                    <h5>Vaga Nº ${n}</h5>
                </ul>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                        <p class="card-text text-left">Descrição da vaga:</br>
                            </br>
                            ${doc.data().Descricao}

                        </p>
                        </br>
                        <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                        <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                        </br>
                        <h5 class="card-title text-center">Requerimentos:</h5>
                        <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                        <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                        <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                        <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                        <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                        </br>
                        <h5 class="card-title text-center">Dados do Aluno</h5>
                        </br>
                        <div align="center" class="card-body" id="InfoAluno">
                        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                        data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                        </div>
                        </br>
                        <h5 class="card-title text-center">Horários</h5>
                        </br>
                        <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                        <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                        <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                        <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
                </div>
                </br>
                <div align="center" class="card-body">

                    
                    <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                    <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                        data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

                </div>

            </div>
        </div>

        </br> </br>

    
                `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    else if (Vaga == "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("Curso", "==", Curso)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
            
        <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>Vaga Nº ${n}</h5>
            </ul>
        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Descrição da vaga:</br>
                        </br>
                        ${doc.data().Descricao}

                    </p>
                    </br>
                    <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                    <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                    </br>
                    <h5 class="card-title text-center">Requerimentos:</h5>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                    <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                    </br>
                    <h5 class="card-title text-center">Dados do Aluno</h5>
                    </br>
                    <p class="card-text text-left">Não possui aluno vinculado!</p>
                    
                  </br>
                  <h5 class="card-title text-center">Horários</h5>
                  </br>
                    <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                    <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                    <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                    <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
            </div>
            </br>
            <div align="center" class="card-body">

      
                <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

            </div>

        </div>
    </div>

    </br> </br>


            `
                    } else {


                        tabela.innerHTML += `
            
        <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>Vaga Nº ${n}</h5>
            </ul>
        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                    <p class="card-text text-left">Descrição da vaga:</br>
                        </br>
                        ${doc.data().Descricao}

                    </p>
                    </br>
                    <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                    <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                    </br>
                    <h5 class="card-title text-center">Requerimentos:</h5>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                    <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                    </br>
                  
                    <h5 class="card-title text-center">Dados do Aluno</h5>
                    </br>
                    <div align="center" class="card-body" id="InfoAluno">
                    <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                    data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                    </div>
                    </br>
                    <h5 class="card-title text-center">Horários</h5>
                    </br>
                    <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                    <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                    <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                    <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
            </div>
            </br>
            <div align="center" class="card-body">

        
                <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
                <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                    data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

            </div>

        </div>
    </div>

    </br> </br>


            `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    if (Curso != "Escolha..." && Vaga != "Escolha...") {
        db.collection("Empresa").doc(docid).collection("Vagas").where("Curso", "==", Curso).where("StatusVaga", "==", Vaga)
            .get()
            .then(function (querySnapshot) {
                tabela.innerHTML = '';
                querySnapshot.forEach(function (doc) {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().StatusVaga == "Aberta") {
                        n++;

                        tabela.innerHTML += `
        
    <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>Vaga Nº ${n}</h5>
        </ul>
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                <p class="card-text text-left">Descrição da vaga:</br>
                    </br>
                    ${doc.data().Descricao}

                </p>
                </br>
                <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                </br>
                <h5 class="card-title text-center">Requerimentos:</h5>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                </br>
                <h5 class="card-title text-center">Dados do Aluno</h5>
                </br>
                <p class="card-text text-left">Não possui aluno vinculado!</p>
                
              </br>
              <h5 class="card-title text-center">Horários</h5>
              </br>
                <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
        </div>
        </br>
        <div align="center" class="card-body">

  
            <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

        </div>

    </div>
</div>

</br> </br>


        `
                    } else {


                        tabela.innerHTML += `
        
    <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>Vaga Nº ${n}</h5>
        </ul>
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Status da vaga: ${doc.data().StatusVaga}</br>
                <p class="card-text text-left">Descrição da vaga:</br>
                    </br>
                    ${doc.data().Descricao}

                </p>
                </br>
                <p class="card-text text-left">Empresa: ${NomeEmpresa}</p>
                <p class="card-text text-left">Representante da empresa: ${RepresentanteLegal} </p>
                </br>
                <h5 class="card-title text-center">Requerimentos:</h5>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Idioma(s): ${doc.data().Idioma1}, ${doc.data().Idioma2}</p>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Sexo: ${doc.data().Sexo}</p>
                <p class="card-text text-left">Cidade de residencia: ${doc.data().Cidade}</p>
                </br>
                <h5 class="card-title text-center">Dados do Aluno</h5>
                </br>
                <div align="center" class="card-body" id="InfoAluno">
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="VerInfo(id)"
                data-toggle="modal" data-target="#ModalEmail">Ver informações do aluno vinculado</button>
                </div>
                </br>
                <h5 class="card-title text-center">Horários</h5>
                </br>
                <p class="card-text text-left">Período do estágio: ${doc.data().Comeco} a  ${doc.data().Final}</p>
                <p class="card-text text-left">Total de horas do estágio: ${doc.data().Horas} Hrs</p>
                <p class="card-text text-left">Carga horária diária: ${doc.data().CargaHoraria}</p>
                <p class="card-text text-left">Data do cadastro:  ${doc.data().dataCadastro}</p>
        </div>
        </br>
        <div align="center" class="card-body">

        
            <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Recusar(id)"
                data-toggle="modal" data-target="#ModalRecusado">Desativar</button>
            <button id="${doc.id}" href="#" type="button" class="btn btn-primary" onclick="RedirecionaCadastro(id)"
                data-toggle="modal" data-target="#ModalRecusado">Alunos compatíveis</button>

        </div>

    </div>
</div>

</br> </br>


        `
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }




}





function RedirecionaCadastro(id) {


    window.localStorage.setItem("IdVaga", id)
    window.localStorage.setItem("docid", docid)
    window.location.href = "./ExtencaoIdentifica.html"



}


function VerInfo(id) {


    db.collection("Empresa").doc(docid).collection("Vagas").doc(id).collection("Empregados")
        .get()
        .then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {

                IdAluno = doc.data().IdAluno
                window.localStorage.setItem("EnderecoDocumentoAluno", IdAluno)
                window.location.href = "./ExtensaoPerfilAluno.html"

            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });




}
