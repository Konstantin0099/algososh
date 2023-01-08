import { DELAY_IN_MS } from "../../../src/constants/delays";
import { testUrl } from "../../../src/constants/urls";
import {
  colorChanging,
  colorDefault,
  colorModified,
} from "../../../src/constants/colors";

describe("service is available", function () {
  const circles = "li p[class*=text_type_circle]";

  it("should be available on localhost:3000", function () {
    cy.visit(testUrl);
  });

  it("test list", function () {
    const defaultListlength = 5;
    cy.clock();
    cy.visit(testUrl);
    cy.get('a[href*="/list"]').click();
    cy.get("h3").should("have.text", "Связный список");
    cy.get("input[placeholder='Введите текст']").as("inputText");
    cy.get("input[placeholder='Введите индекс']").as("inputIndex");
    cy.get("button")
      .contains("Добавить в head")
      .parent()
      .as("btnAddHead")
      .should("be.disabled");
    cy.get("button")
      .contains("Добавить в tail")
      .parent()
      .as("btnAddTail")
      .should("be.disabled");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .as("btnAddInIndex")
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .as("btnDelInIndex")
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить из head")
      .parent()
      .as("btnDelInHead")
      .should("be.enabled");
    cy.get("button")
      .contains("Удалить из tail")
      .parent()
      .as("btnDelInTail")
      .should("be.enabled");

    cy.get(circles)
      .parent()
      .as("circleElement")
      .should("have.css", "border-color", colorDefault)
      .and("have.length", defaultListlength);
    cy.get(circles).parent().find("").should("have.length", 0);
    cy.get("li div.text_type_input.mb-4")
      .as("heads")
      .contains("head")
      .should("have.length", 1);
    cy.get("@heads").first().should("have.text", "head");

    cy.get("li div.text_type_input.mt-4")
      .as("tails")
      .contains("tail")
      .should("have.length", 1);
    cy.get("@tails").last().should("have.text", "tail");

    cy.get("@inputText").type("NN");
    cy.get("@btnAddHead").should("be.enabled");
    cy.get("@btnAddTail").should("be.enabled").click();
    cy.get("@heads")
      .contains("NN")
      .parent()
      .should("have.css", "border-color", colorChanging);
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 1);
    cy.tick(DELAY_IN_MS);
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 1)
      .last()
      .and("have.css", "border-color", colorDefault);
    cy.tick(DELAY_IN_MS);

    cy.get("@inputText").type("NN");
    cy.get("@btnAddTail").should("be.enabled");
    cy.get("@btnAddHead").should("be.enabled").click();
    cy.get("@heads")
      .contains("NN")
      .parent()
      .should("have.css", "border-color", colorChanging);
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 2)
      .first()
      .should("have.css", "border-color", colorChanging);
    cy.tick(DELAY_IN_MS);
    cy.get("@heads").should("not.have.text", "NN");
    cy.tick(DELAY_IN_MS);
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 2)
      .and("have.css", "border-color", colorDefault);

    cy.get("@btnDelInHead").should("be.enabled").click();
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 3)
      .first()
      .should("have.text", "");
    cy.get(circles)
      .parent()
      .eq(1)
      .should("have.css", "border-color", colorChanging)
      .and("have.text", "NN");
    cy.tick(DELAY_IN_MS);
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 1);

    cy.get("@btnDelInTail").should("be.enabled").click();
    cy.get(circles)
      .parent()
      .should("have.length", defaultListlength + 2)
      .last()
      .should("have.text", "NN")
      .and("have.css", "border-color", colorChanging);
    cy.get(circles).parent().eq(5).should("have.text", "");
    cy.tick(DELAY_IN_MS);
    cy.get(circles).parent().should("have.length", defaultListlength);

    let indexAddTest = 4;
    cy.get("@inputText").type("NN");
    cy.get("@inputIndex").type(indexAddTest);
    cy.get("@btnAddInIndex").should("be.enabled").click();
    let k = 1;

    for (let j = 0; j <= indexAddTest; j++) {
      cy.get(circles)
        .parent()
        .should("have.length", 6)
        .eq(j)
        .should("have.text", "NN")
        .and("have.css", "border-color", colorChanging);
      cy.get(circles)
        .parent()
        .eq(j + 1)
        .and("have.css", "border-color", colorModified);

      cy.tick(DELAY_IN_MS);

      if (j === indexAddTest) {
        cy.tick(DELAY_IN_MS);

        cy.get(circles)
          .parent()
          .should("have.length", 6)
          .eq(j)
          .should("have.text", "NN")
          .and("have.css", "border-color", colorDefault);
      }
      k = j;
    }

    let indexDelTest = 5;
    cy.get("@inputIndex").type(indexDelTest);
    cy.get("@btnDelInIndex").should("be.enabled").click();
    cy.get(circles).parent().should("have.length", 6);
    for (let j = 0; j <= indexDelTest; j++) {
      cy.get(circles)
        .parent()
        .eq(j)
        .should("have.css", "border-color", colorModified);
      if (j === indexDelTest) {
        cy.tick(DELAY_IN_MS);
        cy.get(circles)
          .parent()
          .eq(j + 1)
          .should("have.css", "border-color", colorChanging);
      }
      cy.tick(DELAY_IN_MS);
    }
    cy.tick(DELAY_IN_MS);
    cy.get(circles).parent().should("have.length", 5);
  });
});
