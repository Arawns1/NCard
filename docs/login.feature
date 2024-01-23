#language:pt
Funcionalidade: Login
  Como um usuário
  Eu quero poder fazer login
  Para que eu possa acessar o sistema

  Cenário: Login com sucesso
    Dado que eu possuo uma conta no sistema
    Quando eu preencho o campo "email" com o final "gabriel@neki-it.com.br" ou "gabriel@neki.com.br"
    E eu preencho o campo "senha" com "12345678"
    Quando eu acionar a opção para logar
    Então eu devo ser redirecionado para a página principal

  Cenário: Login Social com Sucesso
    Dado que eu possuo uma conta no sistema
    E uma conta no github ou google
    Quando eu acionar a opção para logar com o github ou google
    E eu estar na organização Neki-IT ou possuir final do email "@neki-it.com.br" ou "@neki.com.br"
    Então eu deve ser redirecionado para a página principal






  Cenário: Visualizar Cartão
    Dado que eu possuo uma conta no sistema
    E estou logado
    Quando eu ver meu cartão 
    Então ele deve conter meu "nome" ou "nome social" se o usuário tiver adicionado
    E "email"
    E "foto"
    E "Redes Sociais"
    E "id"

   Cenário: Editar Biografia
    Dado que eu possuo uma conta no sistema
    E estou logado
    E estou na tela de ver meu carão
    Quando eu acionar a opção para editar minha biografia
    Então eu devo conseguir editar minha biografia
    E ela deve conter menos que 120 caracteres