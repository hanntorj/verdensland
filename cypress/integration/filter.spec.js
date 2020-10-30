describe("Filter test", ()=>{
    beforeEach(()=>{
        cy.visit("/")
    })

    const regions = ["Europe", "Americas", "Oceania", "Antarctica", "Asia", "Africa"]

    it("Can add region", () => {
        for(let i in regions){
            cy.get("#" + regions[i]).click().should("have.class", "RegionButtonClicked")
        }
    })
    it("Can remove region", () => {
        for(let i in regions){
            cy.get("#" + regions[i]).click().should("have.class", "RegionButton")
        }
    })

    it("Can filter on area", () => {
        cy.get("#areaMin").type("-2").should("have.value", "")
        cy.get("#areaMin").type("12345").should("have.value", "12345")
        cy.get("#areaMax").type("-2").should("have.value", "")
        cy.get("#areaMax").type("23456").should("have.value", "23456")

    })

    it("Can filter on pop", () => {
        cy.get("#popMin").type("-3").should("have.value", "")
        cy.get("#popMin").type("12345").should("have.value", "12345")
        cy.get("#popMax").type("-3").should("have.value", "")
        cy.get("#popMax").type("23456").should("have.value", "23456")
    })

    it("Can toggle filters", ()=> {
        cy.get("#areaSlider").click()
        cy.get("#areaCheck").should("have.checked", "true")
        cy.get("#popSlider").click()
        cy.get("#popCheck").should("have.checked", "true")
    })
    
    it("Can reset filters", ()=>{
        for(let i in regions){
            cy.get("#" + regions[i]).click()
        }
        cy.get("#resetButton").click()
        for(let i in regions){
            cy.get("#" + regions[i]).should("have.class", "RegionButton")
        }
        cy.get("#popSlider").click()
        cy.get("#popCheck").should("have.checked", "false")
    })
})