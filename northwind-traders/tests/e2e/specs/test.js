// https://docs.cypress.io/api/introduction/api.html

describe("General", () => {
    it("Visits the app root url", () => {
        cy.visit("/");
        cy.contains("h1", "Welcome to Your Vue.js App");
    });

    it("Visits non-existent routes", () => {
        cy.visit("/non-existent");
        cy.contains("h1", "Oops");
    });
});