describe ('Login e registro de usuarios alura pic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com')

    })

    it('verifica mensagens validacao',() =>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Email is required!').should('be.visible');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','User name is required!').should('be.visible');
        cy.contains('ap-vmessage','Password is required!').should('be.visible');
        cy.contains('ap-vmessage','Full name is required!').should('be.visible');

    })

    it('verifica mensagens email invalido',() =>{
        cy.contains('a','Register now').click();
        cy.contains('button','Register').click();
        cy.get('input[formcontrolname="email"]').type('Michelle');
        cy.contains('ap-vmessage','Invalid e-mail').should('be.visible');
    })

    it('verifica mensagens de senha com menos de 8 caracteres',() =>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Mininum length is 8').should('be.visible');
       
    })

    it('verifica mensagens de letra maiuscula no campo username',() =>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="userName"]').type('MICHELLE');
        cy.contains('button','Register').click();
        cy.contains('ap-vmessage','Must be lower case').should('be.visible');
       
    })

    it('verifica login usuario valido',() =>{
        cy.login('flavio', '123');
        cy.contains('a', '(Logout)').should('be.visible');
       
    })
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuarios => {

        it.only(`registra novo usuario ${usuarios.userName} `, () => {
            cy.contains('a','Register now').click();
            cy.get('input[formcontrolname="email"]').type(usuarios.email);
            cy.get('input[formcontrolname="fullName"]').type(usuarios.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuarios.userName);
            cy.get('input[formcontrolname="password"]').type(usuarios.password);
            cy.contains('button', 'Register').click();
    }) })

})