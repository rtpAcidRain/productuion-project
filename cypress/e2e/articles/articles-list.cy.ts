describe('User visit article list page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles');
        });
    });
    it('Articles loaded', () => {
        cy.getByTestId('ArticleList.SuccessLoaded').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
