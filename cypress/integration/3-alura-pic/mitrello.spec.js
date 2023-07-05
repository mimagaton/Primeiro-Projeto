describe('testes trello criar deletar board e card', () => {

let boardId, cardId

it('criar board', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.trello.com/1/boards/',
      body: { name: 'novo quadro' },
      qs: {
        key: 'fc38c480b08faa6593e5516807abbeb7',
        token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
      },
    }).then((res) => {
        expect(res.status).to.equal(200)
        boarID = res.body.id
          })
  })


it.only('criar card', () => {
    cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/cards',
        body: { name:'Card1', desc: 'card novo teste 01', },
          qs: {
          key: 'fc38c480b08faa6593e5516807abbeb7',
          token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
        },
    }).then((res) => {
        expect(res.status).to.equal(200)
        })

})

it('deletar card', () => {
    cy.request({
        method: 'DELETE',
        url: 'https://api.trello.com/1/boards/${cardId}/cards',
        qs: {
          key: 'fc38c480b08faa6593e5516807abbeb7',
          token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
        },
    }).then((res) => {
        expect(res.status).to.equal(200)
    })

it('deletar board', () => {
    cy.request({
         method: 'DELETE',
        url: 'https://api.trello.com/1/boards/${boardId}',
        qs: {
        key: 'fc38c480b08faa6593e5516807abbeb7',
        token: 'ATTA5c7f76677c585f607a3a55f7c7a9199543548bfba9b1a4466d8d9f7da8ea0c138512A67D',
            },
        }).then((res) => {
            expect(res.status).to.equal(200)
        })

})

    })
})