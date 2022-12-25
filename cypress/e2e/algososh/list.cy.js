import { DELAY_IN_MS } from "../../../src/constants/delays";

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("test list", function () {
    cy.clock();
    cy.visit("http://localhost:3000");
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

    cy.get("li p[class*=text_type_circle]")
      .parent()
      .as("circleElement")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .and("have.length", 5);
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .find("")
      .should("have.length", 0);
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
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("li p[class*=text_type_circle]").parent().should("have.length", 6);
    cy.tick(DELAY_IN_MS);
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.length", 6)
      .last()
      .and("have.css", "border-color", "rgb(127, 224, 81)");
    cy.tick(DELAY_IN_MS);

    cy.get("@inputText").type("NN");
    cy.get("@btnAddTail").should("be.enabled");
    cy.get("@btnAddHead").should("be.enabled").click();
    cy.get("@heads")
      .contains("NN")
      .parent()
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.length", 7)
      .first()
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(DELAY_IN_MS);
    cy.get("@heads").should("not.have.text", "NN");
    cy.tick(DELAY_IN_MS);
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.length", 7)
      .and("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("@btnDelInHead").should("be.enabled").click();
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.length", 8)
      .first()
      .should("have.text", "");
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .and("have.text", "NN");
    cy.tick(DELAY_IN_MS);
    cy.get("li p[class*=text_type_circle]").parent().should("have.length", 6);

    cy.get("@btnDelInTail").should("be.enabled").click();
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.length", 7)
      .last()
      .should("have.text", "NN")
      .and("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .eq(5)
      .should("have.text", "");
    cy.tick(DELAY_IN_MS);
    cy.get("li p[class*=text_type_circle]").parent().should("have.length", 5);

    let i = 3;
    cy.get("@inputText").type("NN");
    cy.get("@inputIndex").type(i);
    cy.get("@btnAddInIndex").should("be.enabled").click();
    let k = 1;
    const defaultColor = "rgb(0, 50, 255)";
    const changingColor = "rgb(210, 82, 225)";
    const modifiedColor = "rgb(127, 224, 81)";
    let color = defaultColor;

    for (let j = 0; j <= i; j++) {
      console.log(j === i, j, k);
      cy.get("li p[class*=text_type_circle]")
        .parent()
        .should("have.length", 6)
        .eq(j)
        .should("have.text", "NN")
        .and("have.css", "border-color", changingColor);
      cy.get("li p[class*=text_type_circle]")
        .parent()
        .eq(k)
        .and("have.css", "border-color", color);
      color = modifiedColor;
      cy.tick(DELAY_IN_MS);
      if (j === i) {
        cy.get("li p[class*=text_type_circle]")
          .parent()
          .eq(j)
          .and("have.css", "border-color", modifiedColor);
        cy.get("li p[class*=text_type_circle]")
          .parent()
          .eq(k)
          .and("have.css", "border-color", defaultColor);
        cy.tick(DELAY_IN_MS);
      }

      k = j;
    }

    
    i = 3;
    cy.get("@inputIndex").type(i);
    cy.get("@btnDelInIndex").should("be.enabled").click();
    cy.tick(DELAY_IN_MS);
    cy.get("li p[class*=text_type_circle]").parent().should("have.length", 6);
    for (let j = 0; j <= i; j++) {
      console.log(j === i, j, k);
      cy.get("li p[class*=text_type_circle]")
        .parent()
        .eq(j)
        .should("have.css", "border-color", modifiedColor);
      if (j === i) {
        cy.get("li p[class*=text_type_circle]")
          .parent()
          .eq(j + 1)
          .should("have.css", "border-color", changingColor);
      }
      cy.tick(DELAY_IN_MS);
    }
    cy.get("li p[class*=text_type_circle]")
      .parent()
      .should("have.css", "border-color", defaultColor)
      .and("have.length", 5);
  });
});
