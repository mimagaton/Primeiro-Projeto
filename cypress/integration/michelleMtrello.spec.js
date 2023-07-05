describe('testes trello criar deletar board e card', () => {

    
      
    it.only('criar board', () => {
        cy.request({
          method: 'POST',
          url: 'https://api.trello.com/1/boards/',
          body: { name: 'QUADRO GIGI' },
          qs: {
            key: 'fc38c480b08faa6593e5516807abbeb7',
            token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            const boardId = res.body.id
        })
      })



      it.only('Pesquisar Listas', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.trello.com/1/boards/${boardId}/lists',
          qs: {
            key: 'fc38c480b08faa6593e5516807abbeb7',
            token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            const idLista = res.body.idList
        })
      })



      it('criar card', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/cards/${idLista}',
            body: { name:'Card1', desc: 'card novo teste 01'},
              qs: {
            idList: idLista,
              key: 'fc38c480b08faa6593e5516807abbeb7',
              token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
          },
        }).then((res) => {
            expect(res.status).to.equal(200)
            })
    
    })

      
 
    })