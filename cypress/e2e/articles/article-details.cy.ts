let currentArticleId: string;

describe('Article Details Page Visit', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles');
            cy.createArticle().then((article) => {
                currentArticleId = article.id;
                cy.visit(`articles/${article.id}`);
            });
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });
    it('User see article details', () => {
        cy.getByTestId('ArticleDetails.Success').should('exist');
    });
    it('User see article recomendations', () => {
        cy.getByTestId('ArticleRecomendationList').should('exist');
    });
    it('User send comment', () => {
        cy.getByTestId('ArticleDetails.Success').should('exist');
        cy.getByTestId('ArticleDetailsPageComents').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('User set rating', () => {
        cy.getByTestId('ArticleDetails.Success').should('exist');
        cy.getByTestId('StarRating').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
    it('User set rating on fixtures', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleDetails.Success').should('exist');
        cy.getByTestId('StarRating').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
