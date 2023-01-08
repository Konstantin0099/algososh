import { DELAY_IN_MS } from "../../../src/constants/delays";
import { testUrl } from "../../../src/constants/urls";
import { colorChanging, colorDefault, colorModified } from "../../../src/constants/colors";

describe("service is available", function () {
  const goBackToMain = () =>
    cy.get("button").should(($lis) => {
      expect($lis.eq(0)).to.contain("К оглавлению");
      $lis.eq(0).click();
    });
  it("should be available on localhost:3000", function () {
    cy.visit(testUrl);
  });

  it("checking the availability of algorithms", function () {
    cy.get("a[href]").as("algoritm");
    cy.get('a[href*="/recursion"]').click();
    cy.get("h3").should("have.text", "Строка");
    goBackToMain();
    cy.get('a[href*="/fibonacci"]').click();
    cy.get("h3").should("have.text", "Последовательность Фибоначчи");
    goBackToMain();
    cy.get('a[href*="/sorting"]').click();
    goBackToMain();
    cy.get('a[href*="/stack"]').click();
    goBackToMain();
    cy.get('a[href*="/queue"]').click();
    goBackToMain();
    cy.get('a[href*="/list"]').click();
    goBackToMain();
  });

  it("test string", function () {
    cy.clock();
    cy.get('a[href*="/recursion"]').click();
    cy.get("h3").should("have.text", "Строка");
    cy.get("input").should("have.text", "");
    cy.get("button").should("be.disabled");
    cy.get("input").type("Hello,World");
    cy.contains("Развернуть").click();
    cy.get("li p[class*=text_type_circle]").as("circleElements");
    cy.get("@circleElements")
      .eq(0)
      .parent()
      .should("have.css", "border-color", colorDefault)
      .and("have.text", "H");
    cy.tick(DELAY_IN_MS);
    const stringStart = "Hello,World";
    for (let i = 0; i <= stringStart.length / 2; i++) {
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", colorChanging)
        .and("have.text", stringStart[i]);
      cy.tick(i === 0 ? DELAY_IN_MS*2 : DELAY_IN_MS);
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", colorModified)
        .and("have.text", stringStart[stringStart.length - i - 1]);
    }
  });
  it("test fibonacci", function () {
    cy.clock();
    goBackToMain();
    cy.get('a[href*="/fibonacci"]').click();
    cy.get("h3").should("have.text", "Последовательность Фибоначчи");
    cy.get("input").should("have.text", "");
    cy.get("button").should("be.disabled");
    cy.get("input").type("19");
    cy.get("button").contains("Рассчитать").click();
    let fibonacci = 1;
    let chin = 0;
  
    for (let i = 0; i <= 19; i++) {
      cy.get("li p[class*=text_type_circle]").as("circleElements");
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", colorDefault);
      if (i > 1) {
        fibonacci = fibonacci + chin;
        chin = fibonacci - chin;
        cy.get("@circleElements").eq(i).should("have.text", fibonacci);
      } else {
        chin = fibonacci;
      }

      cy.tick(DELAY_IN_MS*2);
    }
  });
});
