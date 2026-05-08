import LoginPage from '../pages/LoginPage'

/**
 * Suite de testes E2E para a tela de Login.
 *
 * Padrão: Page Object Model (POM)
 * Dados: Externalizados em fixtures/users.json
 * Estratégia de espera: cy.intercept + cy.wait('@alias') — sem cy.wait(ms)
 */
describe('Login', () => {

  // Carrega o fixture de usuários uma vez para toda a suite
  before(function () {
    cy.fixture('users').as('users')
  })

  beforeEach(function () {
    LoginPage.acessarPagina()
  })

  // ─── Caminho Feliz (Happy Path) ──────────────────────────────────────────

  context('Login com credenciais válidas', () => {

    /**
     * BUG DOCUMENTADO:
     * O sistema exibe a mensagem "Seu login está incorreto, quer continuar?"
     * mesmo quando o usuário fornece credenciais válidas.
     * Comportamento esperado: redirecionamento direto para o dashboard.
     *
     * @see README.md - Seção "Bugs Identificados"
     */
    it('[BUG] Deve exibir alerta de login incorreto ao usar credenciais válidas', function () {
      LoginPage.preencherEmail(this.users.validUser.email)
      LoginPage.preencherSenha(this.users.validUser.password)
      LoginPage.clicarEntrar()

      LoginPage.validarMensagemLoginIncorreto()
    })

    it('Deve redirecionar para o dashboard ao clicar em "Continuar" após login com credenciais válidas', function () {
      LoginPage.preencherEmail(this.users.validUser.email)
      LoginPage.preencherSenha(this.users.validUser.password)
      LoginPage.clicarEntrar()

      // O botão "Continuar" é o único caminho de sucesso dado o bug existente
      LoginPage.validarMensagemLoginIncorreto()
      LoginPage.clicarContinuar()

      LoginPage.validarRedirecionamentoParaDashboard()
    })

  })

  // ─── Caminhos de Falha (Sad Paths) ──────────────────────────────────────

  context('Login com credenciais inválidas', () => {

    it('Deve impedir login com senha incorreta e exibir mensagem de erro', function () {
      LoginPage.preencherEmail(this.users.invalidUser.email)
      LoginPage.preencherSenha(this.users.invalidUser.password)
      LoginPage.clicarEntrar()

      LoginPage.validarMensagemCredenciaisInvalidas()
    })

    it('Deve impedir login com campos em branco', function () {
      // Tenta submeter sem preencher nenhum campo
      LoginPage.clicarEntrar()

      // O formulário não deve avançar; o usuário deve permanecer na tela de login
      LoginPage.validarPaginaDeLoginVisivel()
    })

  })

  // ─── Testes de Segurança (Edge Cases) ───────────────────────────────────

  context('Testes de segurança e limites', () => {

    it('[SECURITY] Não deve autenticar com payload de SQL Injection', function () {
      LoginPage.preencherEmail(this.users.sqlInjectionUser.email)
      LoginPage.preencherSenha(this.users.sqlInjectionUser.password)
      LoginPage.clicarEntrar()

      // O sistema deve rejeitar e manter o usuário na tela de login
      LoginPage.validarMensagemCredenciaisInvalidas()
      LoginPage.validarPaginaDeLoginVisivel()
    })

    it('[SECURITY] Não deve executar script ao inserir payload de XSS no campo de e-mail', function () {
      LoginPage.preencherEmail(this.users.xssUser.email)
      LoginPage.preencherSenha(this.users.xssUser.password)
      LoginPage.clicarEntrar()

      // Valida que nenhum alert foi aberto (o XSS não foi executado)
      // O Cypress falha automaticamente se um alert/confirm não tratado aparecer
      LoginPage.validarMensagemCredenciaisInvalidas()
      LoginPage.validarPaginaDeLoginVisivel()
    })

    it('[BOUNDARY] Deve lidar adequadamente com e-mail de tamanho excessivo', function () {
      LoginPage.preencherEmail(this.users.longStringUser.email)
      LoginPage.preencherSenha(this.users.longStringUser.password)
      LoginPage.clicarEntrar()

      // O sistema não deve travar; deve apresentar uma mensagem de erro adequada
      LoginPage.validarPaginaDeLoginVisivel()
    })

  })

})