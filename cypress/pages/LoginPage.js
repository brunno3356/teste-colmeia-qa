/**
 * @class LoginPage
 * @description Page Object para a tela de login.
 * Centraliza todos os seletores e ações, tornando os testes
 * independentes de detalhes de implementação da UI.
 */
class LoginPage {

  // ─── Seletores ────────────────────────────────────────────────────────────
  get emailInput()    { return cy.get('input[name="email"]') }
  get passwordInput() { return cy.get('input[name="password"]') }
  get btnEntrar()     { return cy.get('button[type="submit"]') }
  get btnContinuar()  { return cy.get('button').contains('Continuar') }

  // Mensagens de feedback
  get mensagemLoginIncorreto()      { return cy.contains('Seu login está incorreto, quer continuar?') }
  get mensagemCredenciaisInvalidas(){ return cy.contains('Usuário ou senha inválidos') }

  // ─── Ações ────────────────────────────────────────────────────────────────

  /**
   * Navega para a página de login e aguarda o campo de e-mail estar pronto.
   */
  acessarPagina() {
    cy.visit('/')
    this.emailInput.should('be.visible')
  }

  preencherEmail(email) {
    this.emailInput.clear().type(email)
  }

  preencherSenha(password) {
    // log: false oculta a senha nos logs e relatórios do Cypress
    this.passwordInput.clear().type(password, { log: false })
  }

  clicarEntrar() {
    this.btnEntrar.click()
  }

  clicarContinuar() {
    this.btnContinuar.click()
  }

  // ─── Asserções ────────────────────────────────────────────────────────────

  /**
   * Valida a mensagem de alerta exibida mesmo com credenciais válidas (BUG-001).
   * Valida também que o botão "Continuar" — que submete o formulário — está disponível.
   */
  validarMensagemLoginIncorreto() {
    this.mensagemLoginIncorreto
      .should('be.visible')
      .and('contain.text', 'Seu login está incorreto, quer continuar?')
    this.btnContinuar.should('be.visible').and('not.be.disabled')
  }

  validarMensagemCredenciaisInvalidas() {
    this.mensagemCredenciaisInvalidas
      .should('be.visible')
      .and('contain.text', 'Usuário ou senha inválidos')
    // Valida que não houve redirecionamento indevido
    cy.url().should('not.include', '/dashboard')
  }

  /**
   * Após clicar em "Continuar", o formulário é submetido e o usuário
   * deve ser redirecionado para a área interna. Como é um form submit
   * tradicional (sem chamada de API separada), a validação é feita
   * pela mudança de URL.
   */
  validarRedirecionamentoParaDashboard() {
    cy.url().should('not.include', '/login')
  }

  validarPaginaDeLoginVisivel() {
    this.emailInput.should('be.visible')
    this.passwordInput.should('be.visible')
    this.btnEntrar.should('be.visible')
    cy.url().should('not.include', '/dashboard')
  }

}

export default new LoginPage()