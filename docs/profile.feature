Funcionalidade: Editar Perfil
  Como um usuário
  Eu quero poder editar meu Perfil
  Para que eu possa compartilhar com outras pessoas dados atualizados

  Cenário: Editar Perfil Com Sucesso
    Dado que eu possuo uma conta no sistema
    E estou logado
    Então eu devo conseguir editar meu Perfil

Funcionalidade: Exclusão de Perfil
  Como um usuário
  Eu quero poder excluir meu perfil

  Cenário: Exclusão de Perfil Com Sucesso
    Dado que eu possuo uma conta no sistema
    E estou logado
    Quando eu acionar a opção para excluir meu perfil
    Então devo preencher o campo "senha" com "12345678"
    E confirmar a exclusão
    Então eu devo ter minha conta excluida

