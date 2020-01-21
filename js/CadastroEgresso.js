
function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") {

        return false;
    }

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {

        return false;
    }

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {

        return false;
    }
    return true;
}








var email2 = "";
var senha2 = "";
//Função para enviar ao banco
function setAluno() {
    //inicializando o firebase e o banco de dados
    data = new Date
    var dia = data.getDate().toString();
    var mes = (data.getMonth() + 1).toString() //+1 pois no getMonth Janeiro começa com zero.
    var anoF = data.getFullYear();
    var dataCadastro = dia + "/" + mes + "/" + anoF;

    var storageRef = firebase.storage().ref();
    var db = firebase.firestore();



    //Pegando os valores do relatório 
    var Nome = document.getElementById("nomeComleto").value;
    var Curso = document.getElementById("Curso").value;

    var Endereco = document.getElementById("Endereco").value;
    var Numero = document.getElementById("Numero").value;
    var Bairro = document.getElementById("Bairro").value;
    var Cidade = document.getElementById("Cidade").value;
    var Estado = document.getElementById("Estado").value;
    var Sexo = document.getElementById("Sexo").value;
    var CEP = document.getElementById("CEP").value;
    var CPF = document.getElementById("CPF").value;
    var RG = document.getElementById("RG").value;
    var OE = document.getElementById("OE").value;
    var Telefone1 = document.getElementById("Telefone1").value;
    var Telefone2 = document.getElementById("Telefone2").value;
    var Projeto = document.getElementById("Projeto").value;
    var Trabalhando = document.getElementById("Trabalhando").value;
    var TrabalhandoArea = document.getElementById("TrabalhandoArea").value;
    var PosGraduacao = document.getElementById("PosGraduacao").value;
    var TrabalhandoGraduacao = document.getElementById("TrabalhandoGraduacao").value;
    var idioma1 = document.getElementById("idioma1").value;
    var idioma2 = document.getElementById("idioma2").value;
    var Area = "";
    const file = $('#Foto').get(0).files[0];
    var nomeFoto = file.name;
    var urldownload





    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                urldownload = downloadURL
                console.log('KKKKKKKKKKKKKK', urldownload);



                var CPF2 = CPF.replace(".", "");
                CPF2 = CPF2.replace("-", "");
                CPF2 = CPF2.replace(".", "");
                console.log(CPF)
                console.log(CPF2)


                if (Curso == "Tecnologia em Análise e Desenvolvimento de Sistemas") {
                    Area = "T.I"
                } else if (Curso == "Agronomia" || Curso == "Agronegócio") {
                    Area = "Agrária"
                } else {
                    Area = Curso;
                }

                var Idiomas = {
                    Nome: ""
                }



                if (Nome == "" || Nome == null || Telefone1 == "" || Telefone1 == null || Endereco == "" || Endereco == null || Curso == "" || Curso == null ||
                    Periodo == "" || Periodo == null || Numero == "" || Numero == null || Bairro == "" || Bairro == null || Cidade == "" || Cidade == null ||
                    Estado == "" || Estado == null || Sexo == "" || Sexo == null || CEP == "" || CEP == null || CPF == "" || CPF == null || RG == "" || RG == null ||
                    OE == "" || OE == null || Telefone1 == "" || Telefone1 == null || TestaCPF(CPF2) == false) {
                    window.alert("Verifique os campos e tente novamente!")
                } else {

                    if (Telefone2 == "" || Telefone2 == null) {
                        Telefone2 = "Não possui"

                    }

                    //inserindo os valores no banco, onde o valor antes dos ":" é o indice do banco e o nome depois do ":" são as variaveis locais
                    db.collection("Alunos").add({
                        Egresso: true,
                        StatusCadastro: "Aguardando",
                        DadosPessoais: false,
                        DadosProfissionais: false,
                        DadosOrientador: false,
                        Ativado: false,
                        Nome: Nome,
                        Curso: Curso,
                        Matricula: "Egresso",
                        Area: Area,
                        Periodo: "Já finalizado",
                        Endereco: Endereco,
                        Numero: Numero,
                        Bairro: Bairro,
                        Cidade: Cidade,
                        Estado: Estado,
                        Sexo: Sexo,
                        CEP: CEP,
                        CPF: CPF,
                        RG: RG,
                        OE: OE,
                        uid: "",
                        Email: "",
                        urldownload: urldownload,
                        Telefone1: Telefone1,
                        Telefone2: Telefone2,
                        Idiomas: {
                            idioma1: idioma1,
                            idioma2: idioma2

                        },
                        Formulario: {
                            Projeto: Projeto,
                            Trabalhando: Trabalhando,
                            TrabalhandoArea: TrabalhandoArea,
                            PosGraduacao: PosGraduacao,
                            TrabalhandoGraduacao: TrabalhandoGraduacao,
                        },
                        Experiencias: "",
                        Habilidades: "",
                        ReferenciaContato: "",
                        DataCadastro: dataCadastro




                    })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            window.alert("Solicitação de cadastro realizada com sucesso, aguarde aprovação!")
                            window.localStorage.setItem("docRef", docRef.id);
                            location.href = "./Login.html";

                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                            window.alert("Erro ao cadastrar! " + error)

                        });

                }
            });
        });

}


function set2() {

    var Email = document.getElementById("Email").value;
    var Senha = document.getElementById("Senha").value;
    email2 = Email;
    senha2 = Senha;
    firebase.auth().createUserWithEmailAndPassword(email2, senha2).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
        console.log(errorCode + " " + errorMessage);
        if (errorMessage == "auth/email-already-in-use The email address is already in use by another account.") {
            window.alert("Email já usado por outra conta!")
        }
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            var uid = user.uid;
            set3(uid, email);
            window.alert("Conta Criada com sucesso! agora voce precisa ter seu cadastro aprovado!")

        } else {

        }
    });
}



function set3(uid, email) {
    var db = firebase.firestore();
    var docRef = window.localStorage.getItem("docRef");
    var washingtonRef = db.collection("Alunos").doc(docRef);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        uid: uid,
        Email: email
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });


}