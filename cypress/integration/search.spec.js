describe("Search test", ()=> {
    it("Can search", ()=> {
        cy.visit("/")
        cy.get("input[name='searchBar']").type("nor").should("have.value", "nor")
        cy.get("#searchButton").click()
        cy.get("input[name='searchBar']").clear().should("have.value", "")
        cy.get("#searchButton").click()
    })
})