import { testUrl } from "../../../src/constants/urls";
import { colorChanging, colorDefault} from "../../../src/constants/colors";

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit(testUrl);
  });

  it("test stack", function () {
    cy.get('a[href*="/stack"]').click();
    cy.get("h3").should("have.text", "Стек");
    cy.get("input").should("have.text", "");
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");

    let i;
    for (i = 0; i <= 5; i++) {
      cy.get("input").type("A");
      cy.get("button")
        .contains("Добавить")
        .parent()
        .should("be.enabled")
        .click();
      cy.get("button").contains("Удалить").parent().should("be.enabled");
      cy.get("button").contains("Очистить").parent().should("be.enabled");
      cy.get("li p[class*=text_type_circle]").as("circleElements");
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", colorChanging);
      cy.get("li div.text_type_input.mb-4")
        .contains("top")
        .should("have.length", 1);
      cy.get("li p[class*=text_type_input]")
        .should("have.length", i + 1)
        .end("have.value", i);
      cy.get("input").should("have.text", "");
      cy.get("button").contains("Добавить").parent().should("be.disabled");
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", colorDefault);
    }

    cy.get("button").contains("Удалить").click();

    cy.get("@circleElements")
      .last()
      .parent()
      .should("have.css", "border-color", colorChanging);

    cy.get("button").contains("Удалить").click();
    cy.get("@circleElements")
      .last()
      .parent()
      .should("have.css", "border-color", colorChanging);
    cy.get("@circleElements").should("have.length", i - 2);

    cy.get("button").contains("Очистить").click();
    cy.get("@circleElements").should("have.length", 0);
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
  });
});
