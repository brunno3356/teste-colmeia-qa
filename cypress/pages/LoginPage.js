class LoginPage {

  acessarPagina() {
    cy.visit('https://teste-colmeia-qa.colmeia-corp.com/')
  }

  preencherEmail(email) {
    cy.get('[name="email"]').type(email)
  }

  preencherSenha(password) {
    cy.get('[name="password"]').type(password)
  }

  clicarEntrar() {
    cy.contains('Entrar').click()
  }

  validarMensagemLoginIncorreto() {
    cy.contains('Seu login está incorreto, quer continuar?')
      .should('be.visible')
  }

  validarMensagemCredenciaisInvalidas() {
    cy.contains('Usuário ou senha inválidos')
      .should('be.visible')
  }

}

export default new LoginPage()