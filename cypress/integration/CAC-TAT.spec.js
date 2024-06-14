/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit("./src/index.html")
  })
  it('verifica o título da aplicação', function()  {
cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Ex 2.1
  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol,Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol, Teste karol '

    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karol@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    // cy.get('button[type="submit"]').click() >> fazendo pelo type
    // cy.get('.button').click()>> fazendo pela classe button
  })

  // Ex 2.2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karol@gmail,com')
    cy.get('#open-text-area').type('Teste Karol')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  // Ex 2.3
  it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
    cy.get('#phone')
    .type('abcdefghijkl')
    .should('have.value', '')
  })

  // Ex 2.4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karol@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste Karol')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

    // Ex 2.5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('Karol')
    .should('have.value', 'Karol')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Guerini')
    .should('have.value', 'Guerini')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('karol@gmail.com')
    .should('have.value', 'karol@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#phone')
    .type('2124656126')
    .should('have.value', '2124656126')
    .clear()
    .should('have.value', '')

  })

    // Ex 2.6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

    // Ex 2.7
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  // Ex 3
  it('seleciona um produto (Youtube) pelo seu texto', function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  // Ex 3.1
  it('seleciona um produto (Mentoria) pelo seu valor (value)', function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  //EX 3.2
  it.only('seleciona o produto (Blog) pelo seu índice', function(){
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  //Ex 4
  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"')
    .check()
    .should('have.value', 'feedback')
  })

//Ex 4.1
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

      //Ex 5
      it.only('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
      })
})

