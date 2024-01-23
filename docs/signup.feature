Funcionalidade: Cadastro
  Como um usuário
  Eu quero poder me cadastrar
  Para que eu ter meu cartão e acessar o sistema

  Cenário: Cadastro Completo com sucesso
    Dado que eu não possuo uma conta no sistema
    Quando eu preencho o campo "nome completo" com "Gabriel Damico"
    E eu preencho o campo "email" com "gabriel@neki-it.com.br" ou "gabriel@neki.com.br"
    E eu preencho o campo "senha" com "12345678"
    E eu preencho o campo "data de nascimento" com "01/01/2000"
    E eu preencho o campo "nome social" com "Gabriela Damico"
    E eu preencho o campo "telefone" com "(21) 99999-9999"
    E eu adiciono uma foto
    E eu adiciono minhas redes sociais (facebook, instagram, linkedin, github)
    Então eu devo ter minha conta criada
    E ser redirecionado para a página principal
  
  Cenário: Cadastro Mínimo com sucesso
    Dado que eu não possuo uma conta no sistema
    E não quero preencher todos os campos
    Quando eu preencho o campo "nome completo" com "Gabriel Damico"
    E eu preencho o campo "email" com "gabriel@neki-it.com.br" ou "gabriel@neki.com.br"
    E eu preencho o campo "data de nascimento" com "01/01/2000"
    E eu adiciono uma foto
    Então eu devo ter minha conta criada
    E ser redirecionado para a página principal
  
  Cenário: Cadastro com mesmo email já cadastrado
    Dado que eu não possuo uma conta no sistema
    E já existe uma conta com o email "gabriel@neki-it.com.br" ou "gabriel@neki.com.br"
    Então eu devo ser informado que já existe uma conta com esse email
    E não ter minha conta cadastrada
