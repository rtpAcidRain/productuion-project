export const setRate = (starCount: number = 5, feedback: string = 'feedback') => {
    cy.getByTestId(`StarRating.${starCount}`).click();
    cy.getByTestId('RatingCard.Input').type(feedback);
    cy.getByTestId('RatingCard.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starCount: number, feedback: string): Chainable<void>;
        }
    }
}
