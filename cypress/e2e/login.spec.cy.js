import LoginPage from '../pages/LoginPage'

describe('Login', () => {

  beforeEach(() => {
    LoginPage.acessarPagina()
  })

  it('Deve exibir mensagem inesperada ao realizar login válido', () => {

    LoginPage.preencherEmail('qa@test.com')

    LoginPage.preencherSenha('123456')

    LoginPage.clicarEntrar()

    LoginPage.validarMensagemLoginIncorreto()

  })

  it('Deve impedir login com senha inválida', () => {

    LoginPage.preencherEmail('qa@test.com')

    LoginPage.preencherSenha('senhaErrada')

    LoginPage.clicarEntrar()

    LoginPage.validarMensagemCredenciaisInvalidas()

  })

})