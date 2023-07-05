describe('Testes API trello criar deletar board e card', () => {

let urlId
let idShortBoard
let idNewList
let idNewlist2
let idNewCard
let idNewBoard



    it('Realizar Autenticação', () => { //Realizando autenticação na api da trello
      cy.request({
        method: 'GET',
        url: 'https://api.trello.com/1/members/me/boards',
        qs:{
          key: 'fc38c480b08faa6593e5516807abbeb7',
          token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
        },
      }).then((res) => {
        expect(res.status).to.equal(200)
      })
        
    })
      
    it('Criar Board', () => {  // criar um novo Board, passando o nome e a descrição
        cy.request({
          method: 'POST',
          url: 'https://api.trello.com/1/boards/',
          body: { name: 'QUADRO GIGI FELIZ', desc: 'quadro novo da gigi' }, //passa o nome e a descrição para o board novo
          qs: {
            key: 'fc38c480b08faa6593e5516807abbeb7',
            token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('QUADRO GIGI FELIZ')
            expect(res.body.desc).to.equal('quadro novo da gigi')
            idNewBoard = res.body.id   // idNewBoard  = recebe o id do board criado
            urlId = res.body.shortUrl  // urlId = pega o link short da resposta
            const currentURL = urlId.split('/')  // pega a ultima posição do shortlink que é o id que precisamos para pesquisar as listas dentro do board  https://stackoverflow.com/questions/58135142/how-to-take-a-part-of-a-carrent-url-with-cypress-and-regex
            idShortBoard = currentURL[4] // ----------
          cy.log('Url encurtada', urlId)
          cy.log('Final da url encurtada', idShortBoard)
          cy.log('Id novo Board', idNewBoard)
        })   
      })
       
      it('Pesquisar Listas', () => { // tras as listas do Board, para conseguir o ID delas, assim conseguimos criar um card na lista desejada
        cy.request({
          method: 'GET',
          url: `https://api.trello.com/1/boards/${idShortBoard}/lists`,
            qs: {
            key: 'fc38c480b08faa6593e5516807abbeb7',
            token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            idNewList = res.body[0].id  //pega o ID[0] da primeira lista e para passar na criação do novo card
            idNewlist2 = res.body[1].id //pega o ID[1] da segunda lista e para passar na criação do novo card
            cy.log('Id da Lista para criar o card',idNewList) //exibe a resposta do id na primeira posição [0], coloquei isso no log para me achar nas tentivas
            cy.log('Nomes das Listas', res.body[0].name,res.body[1].name,res.body[2].name)
        })
      }) 

      it('Criar Card na lista A FAZER', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/cards/',
            body: { name:'NTTDATA A FAZER', desc: 'card novo do teste de automação'},
              qs: {
              idList: idNewList,  
              key: 'fc38c480b08faa6593e5516807abbeb7',
              token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            idNewCard = res.body.id  //pega o id do card novo
            cy.log('Nome do novo Card', res.body.name)
            cy.log('Id do novo card', idNewCard) //exibe a resposta no console do id na primeira posição [0]
        })
      })
      
      it('Criar Card2 na lista EM ANDAMENTO', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/cards/',
            body: { name:'NTTDATA EM ANDAMENTO', desc: 'card novo do teste de automação'},
              qs: {
              idList: idNewlist2,  
              key: 'fc38c480b08faa6593e5516807abbeb7',
              token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('NTTDATA EM ANDAMENTO')
            cy.log('Nome do novo Card', res.body.name)
            
        })
      })

      it('Excluir Card', () => {  //DELETAR UM CARD, CONFORME DOCUMENTAÇÃO DEVEMOS PASAR O ID DO CARD
        cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/cards/${idNewCard}`, //url passando o ID do card para ele poder excluir
              qs: {
               
              key: 'fc38c480b08faa6593e5516807abbeb7',
              token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            cy.log('Id do card Excluido', idNewCard)

        })
      })
       
      it('Excluir Board', () => {
        cy.request({
          method: 'DELETE',
          url: `https://api.trello.com/1/boards/${idShortBoard}`, //url passando o ID do board para ele poder excluir
            qs: {
            key: 'fc38c480b08faa6593e5516807abbeb7',
            token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)  
          
        })   
      })    

})
    
  


    
            


    
   
