describe('service is available', () => {
    beforeEach(() => {

        cy.visit('http://тимлюйскийшифер.рф');
      })
      it('displays two todo items by default', () => {
  
        cy.get('.todo-list li').should('have.length', 2)
    


      })

  });