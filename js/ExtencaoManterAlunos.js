
firebase.initializeApp({
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
});
var db = firebase.firestore();
var tabela2 = document.getElementById('Opc');
var tabela = document.getElementById('Alunos');

function TodosOsAlunos() {

    tabela2.innerHTML = '';
    tabela.innerHTML = '';

    db.collection("Alunos")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                if (doc.data().Ativado) {
                    tabela.innerHTML += `
                
                    <div class="card text-center">
            <div class="card-header">
    
                <ul class="nav nav-pills card-header-pills">
                    <h5>${doc.data().Nome}</h5>
    
                </ul>
    
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                    <p class="card-text text-left">Email: ${doc.data().Email}</p>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                    <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                    <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                    <p class="card-text text-left">RG: ${doc.data().RG} </p>
                    <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                    <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
                </div>
        </br>
    
    
    
            <div align="center" class="card-body" id="Botões">
    
      
                <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>
    
    
            </div>
    
        </div>
    </div >
    </br >
                    
                    
                    
                    
                    `

                } else {
                    tabela.innerHTML += `
                
                    <div class="card text-center">
            <div class="card-header">
    
                <ul class="nav nav-pills card-header-pills">
                    <h5>${doc.data().Nome}</h5>
    
                </ul>
    
            </div>
            <div class="card-body">
                <div class="text-left">
                    <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                    <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                    <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                    <p class="card-text text-left">Email: ${doc.data().Email}</p>
                    <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                    <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                    <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                    <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                    <p class="card-text text-left">RG: ${doc.data().RG} </p>
                    <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                    <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
                </div>
        </br>
    
    
    
            <div align="center" class="card-body" id="Botões">
    
               
                <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>
    
    
            </div>
    
        </div>
    </div >
    </br >
                    
                    
                    
                    
                    `
                }


            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

}

function Desativar(e) {
    uid = e;
    var Desativar = db.collection("Alunos").doc(e);
    return Desativar.update({
        Ativado: false

    })
        .then(function () {
            console.log("Document successfully updated!");
            window.alert("Desativado com sucesso!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao desativar!");
            return Aprovar.update({

                Ativado: true

            })
        });

}

function Ativar(e) {
    uid = e;
    var Desativar = db.collection("Alunos").doc(e);
    return Desativar.update({
        Ativado: true

    })
        .then(function () {
            console.log("Document successfully updated!");
            window.alert("Ativado com sucesso");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao ativar!");
            return Aprovar.update({

                Ativado: false

            })
        });

}

function Editar(e) {

    uid = e;
    var Aprovar = db.collection("Alunos").doc(e);
    return Aprovar.update({
        StatusCadastro: "Aprovado",
        Ativado: true

    })
        .then(function () {
            console.log("Document successfully updated!");
            cadastraUsuario(uid)
            location.reload();
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            window.alert("Errro ao aprovar!");
            return Aprovar.update({
                StatusCadastro: "Aguardando",
                Ativado: false

            })
        });

}

var QntDeTrue = 0;
var a, b, c, d, e = false;
var Para = []

function Pesquisar() {
    var QueryFinal = [];
    var QueryFinalAux = [];
    var Curso = document.getElementById("Curso").value;
    var Periodo = document.getElementById("Periodo").value;
    var Sexo = document.getElementById("Sexo").value;
    var Conclusao = document.getElementById("Conclusao").value;
    var Cidade = document.getElementById("Cidade").value;
    tabela.innerHTML = '';

    if (verificaTrue(Curso)) {
        QntDeTrue++
        QueryFinal.push(Curso)
        QueryFinalAux.push("Curso")

    }
    if (verificaTrue(Periodo)) {
        QntDeTrue++
        QueryFinal.push(Periodo)
        QueryFinalAux.push("Periodo")
    }
    if (verificaTrue(Sexo)) {
        QntDeTrue++
        QueryFinal.push(Sexo)
        QueryFinalAux.push("Sexo")
    }
    if (verificaTrue(Conclusao)) {
        QntDeTrue++
        QueryFinal.push(Conclusao)
        QueryFinalAux.push("Conclusao")
    }
    if (verificaTrue(Cidade)) {
        QntDeTrue++
        QueryFinal.push(Cidade)
        QueryFinalAux.push("Cidade")
    }

    if (QntDeTrue == 1) {
        console.log(QntDeTrue)
        console.log(QueryFinal)
        console.log(QueryFinalAux)

        db.collection("Alunos").where(QueryFinalAux[0], "==", QueryFinal[0])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
            
                <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>${doc.data().Nome}</h5>

            </ul>

        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                <p class="card-text text-left">Email: ${doc.data().Email}</p>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Idiomas: </p>
                <p class="card-text text-left">1º ${doc.data().Idiomas.idioma1}</p>
                <p class="card-text text-left">2º ${doc.data().Idiomas.idioma2}</p>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                <p class="card-text text-left">RG: ${doc.data().RG} </p>
                <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
            </div>
    </br>



        <div align="center" class="card-body" id="Botões">

             
            <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>


        </div>

    </div>
</div >
</br >
                
                
                
                
                `

                    } else {
                        tabela.innerHTML += `
            
                <div class="card text-center">
        <div class="card-header">

            <ul class="nav nav-pills card-header-pills">
                <h5>${doc.data().Nome}</h5>

            </ul>

        </div>
        <div class="card-body">
            <div class="text-left">
                <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
                <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
                <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
                <p class="card-text text-left">Email: ${doc.data().Email}</p>
                <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
                <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
                <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
                <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
                <p class="card-text text-left">RG: ${doc.data().RG} </p>
                <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
                <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
            </div>
    </br>



        <div align="center" class="card-body" id="Botões">

              
            <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>


        </div>

    </div>
</div >
</br >
                
                
                
                
                `
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });


    }
    if (QntDeTrue == 2) {
        console.log(QntDeTrue)
        console.log(QueryFinal)
        console.log(QueryFinalAux)
        db.collection("Alunos").where(QueryFinalAux[0], "==", QueryFinal[0]).where(QueryFinalAux[1], "==", QueryFinal[1])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `

                    } else {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    if (QntDeTrue == 3) {
        console.log(QntDeTrue)
        console.log(QueryFinal)
        console.log(QueryFinalAux)
        db.collection("Alunos").where(QueryFinalAux[0], "==", QueryFinal[0]).where(QueryFinalAux[1], "==", QueryFinal[1]).where(QueryFinalAux[2], "==", QueryFinal[2])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `

                    } else {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    if (QntDeTrue == 4) {
        console.log(QntDeTrue)
        console.log(QueryFinal)
        console.log(QueryFinalAux)
        db.collection("Alunos").where(QueryFinalAux[0], "==", QueryFinal[0]).where(QueryFinalAux[1], "==", QueryFinal[1]).where(QueryFinalAux[2], "==", QueryFinal[2]).where(QueryFinalAux[3], "==", QueryFinal[3])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
    
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `

                    } else {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    if (QntDeTrue == 5) {
        console.log(QntDeTrue)
        console.log(QueryFinal)
        console.log(QueryFinalAux)
        db.collection("Alunos").where(QueryFinalAux[0], "==", QueryFinal[0]).where(QueryFinalAux[1], "==", QueryFinal[1]).where(QueryFinalAux[2], "==", QueryFinal[2]).where(QueryFinalAux[3], "==", QueryFinal[3]).where(QueryFinalAux[4], "==", QueryFinal[4])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
    
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `

                    } else {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">

        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>

        </ul>

    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
</br>



    <div align="center" class="card-body" id="Botões">

          
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>


    </div>

</div>
</div >
</br >
            
            
            
            
            `
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    QntDeTrue = 0
    console.log(tabela)
    if (tabela == "<div class=container id=Alunos></div>") {
        tabela.innerHTML += `       
            <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
        
                </ul>
            </div>
            <div align="left" class="card-body">
    
                <h5 class="card-title">Não existem alunos com essas características</h5>
            
    
                </div>
            </div>
    
        </div>
        </br>
           
    
    
     `

    }
}

function verificaTrue(a) {
    if (a != "Escolha...") {
        return true
    } else {
        return false
    }

}

function PesquisarNome() {
    var nomeAluno = document.getElementById('NomeAluno').value
    tabela.innerHTML = '';

    db.collection("Alunos").where("Nome", "==", nomeAluno)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                if (doc.exists) {
                    if (doc.data().Ativado) {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">
    
        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>
    
        </ul>
    
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Idiomas: </p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
    </br>
    
    
    
    <div align="center" class="card-body" id="Botões">
    
          
        <button id="${doc.id}" href="#" type="button" class="btn btn-danger" onclick="Desativar(id)">Desativar</button>
    
    
    </div>
    
    </div>
    </div >
    </br >
            
            
            
            
            `

                    } else {
                        tabela.innerHTML += `
        
            <div class="card text-center">
    <div class="card-header">
    
        <ul class="nav nav-pills card-header-pills">
            <h5>${doc.data().Nome}</h5>
    
        </ul>
    
    </div>
    <div class="card-body">
        <div class="text-left">
            <h5 class="card-title text-center">Área: ${doc.data().Curso}</h5>
            <p class="card-text text-left">Período: ${doc.data().Periodo}</p>
            <p class="card-text text-left">Matrícula: ${doc.data().Matricula}</p>
            <p class="card-text text-left">Email: ${doc.data().Email}</p>
            <p class="card-text text-left">Curso: ${doc.data().Curso}</p>
            <p class="card-text text-left">Endereço: ${doc.data().Endereco}, Nº: ${doc.data().Numero}, Bairro: ${doc.data().Bairro} </p>
            <p class="card-text text-left">Cidade: ${doc.data().Cidade}, Cep: ${doc.data().CEP}</p>
            <p class="card-text text-left">CPF: ${doc.data().CPF} </p>
            <p class="card-text text-left">RG: ${doc.data().RG} </p>
            <p class="card-text text-left">Órgão expedidor: ${doc.data().OE} </p>
            <p class="card-text text-left">Celular: ${doc.data().Telefone1} </p>
        </div>
    </br>
    
    
    
    <div align="center" class="card-body" id="Botões">
    
          
        <button id="${doc.id}" href="#" type="button" class="btn btn-success" onclick="Ativar(id)">Ativar</button>
    
    
    </div>
    
    </div>
    </div >
    </br >
            
            
            
            
            `
                    }
                } else {
                    tabela.innerHTML += `
        
                    <div class="card text-center">
            <div class="card-header">
            
                <ul class="nav nav-pills card-header-pills">
                    <h5>Não existem correspondência</h5>
            
                </ul>
            
            </div>
           
            </br>       
            </div >
            </br >`
                }


            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });



}