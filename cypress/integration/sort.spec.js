describe("Sort test", ()=> {
    it("Can sort result", ()=> {
        cy.visit("/")
        cy.get("#sortBy").select("pop").should("have.value", "pop")
        cy.get("#sortBy").select("area").should("have.value", "area")
        cy.get("#sortBy").select("name").should("have.value", "name")

        cy.get("#sortOrder").select("Desc").should("have.value", "Desc")
        cy.get("#sortOrder").select("Asc").should("have.value", "Asc")
    })
})