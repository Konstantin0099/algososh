import { DELAY_IN_MS } from "../../../src/constants/delays";

describe("service is available", function () {
  let i = 0;
  // setInterval(() => {
  //   $('#seconds-elapsed').text(++seconds + ' seconds')
  // }, 1000)

  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });
  it("test2", function () {

    cy.get('a[href]').as('algoritm');
    const goBackToMain = () => cy.get("button").should(($lis) => {
      expect($lis.eq(0)).to.contain("К оглавлению");
      $lis.eq(0).click();
    });
 
    cy.get('a[href*="/recursion"]').click();
    cy.get("h3").should("have.text", "Строка");
    goBackToMain()
    cy.get('a[href*="/fibonacci"]').click();
    cy.get("h3").should("have.text", "Последовательность Фибоначчи");
    goBackToMain()
    cy.get('a[href*="/sorting"]').click();
    goBackToMain()
    cy.get('a[href*="/stack"]').click();
    goBackToMain()
    cy.get('a[href*="/queue"]').click();
    goBackToMain()
    cy.get('a[href*="/list"]').click();
    goBackToMain()
  });
  it("test string", function () {
    cy.clock();

    cy.get('a[href*="/recursion"]').click();
    cy.get("h3").should("have.text", "Строка");
    cy.get("input").should("have.text", "");
    cy.get("button").should("be.disabled");
    cy.get("input").type("Hello,World");
    cy.contains("Развернуть").click();

    cy.get("li p[class*=text_type_circle]").as("circ1");
    cy.get("@circ1")
      .eq(0)
      .parent()
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .and("have.text", "H");
    cy.tick(DELAY_IN_MS);
    const stringStart = "Hello,World";
    for (let i = 0; i <= stringStart.length / 2; i++) {
      cy.get("@circ1")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(210, 82, 225)")
        .and("have.text", stringStart[i]);
      cy.tick(i === 0 ? 2000 : 1000);
      cy.get("@circ1")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(127, 224, 81)")
        .and("have.text", stringStart[stringStart.length - i - 1]);
    }
  });
});
