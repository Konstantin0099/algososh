
describe("service is available", function () {
 
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
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
      cy.get("li p[class*=text_type_circle]").as("circ1");
      cy.get("@circ1")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(210, 82, 225)");
      cy.get("li div.text_type_input.mb-4")
        .contains("top")
        .should("have.length", 1);
      cy.get("li p[class*=text_type_input]")
        .should("have.length", i + 1)
        .end("have.value", i);
      cy.get("input").should("have.text", "");
      cy.get("button").contains("Добавить").parent().should("be.disabled");
      cy.get("@circ1")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }

    cy.get("button").contains("Удалить").click();

    cy.get("@circ1")
      .last()
      .parent()
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.get("button").contains("Удалить").click();
    cy.get("@circ1")
      .last()
      .parent()
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("@circ1").should("have.length", i - 2);

    cy.get("button").contains("Очистить").click();
    cy.get("@circ1").should("have.length", 0);
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
  });
});
