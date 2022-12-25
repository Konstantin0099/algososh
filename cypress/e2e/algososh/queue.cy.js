describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("test queue", function () {
    cy.get('a[href*="/queue"]').click();
    cy.get("h3").should("have.text", "Очередь");
    cy.get("input").should("have.text", "");
    cy.get("button").contains("Добавить").parent().should("be.disabled");

    let i;
    for (i = 0; i <= 3; i++) {
      cy.get("input").type("F");
      cy.get("button")
        .contains("Добавить")
        .parent()
        .should("be.enabled")
        .click();
      cy.get("li p[class*=text_type_circle]").as("circleElements");
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(210, 82, 225)");
      cy.get("li div.text_type_input.mb-4")
        .contains("head")
        .should("have.length", 1);
      cy.get("li div.text_type_input.mb-4").eq(0).should("have.text", "head");

      cy.get("li div.text_type_input.mt-4")
        .contains("tail")
        .should("have.length", 1);
      cy.get("li div.text_type_input.mt-4").eq(i).should("have.text", "tail");

      cy.get("li p[class*=text_type_input]")
        .should("have.length", 7)
        .end("have.value", i);
      cy.get("input").should("have.text", "");
      cy.get("button").contains("Добавить").parent().should("be.disabled");
      cy.get("@circleElements")
        .eq(i)
        .parent()
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }

    cy.get("button").contains("Удалить").click();
    let j = 0;
    cy.get("@circleElements")
      .eq(j)
      .parent()
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .and("have.text", "F");
    cy.get("li div.text_type_input.mb-4").eq(j).should("have.text", "head");
    cy.get("@circleElements").eq(j).should("have.text", "");
    cy.get("li div.text_type_input.mb-4")
      .contains("head")
      .should("have.length", 1);

    j++;
    cy.get("li div.text_type_input.mb-4").eq(j).should("have.text", "head");
    cy.get("button").contains("Удалить").click();
    cy.get("@circleElements")
      .eq(j)
      .parent()
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .and("have.text", "F");
    cy.get("@circleElements").eq(j).should("have.text", "");
    j++;

    cy.get("button").contains("Очистить").click();
    cy.get("@circleElements").should("have.text", "").and("have.length", 7);
    cy.get("button").contains("Добавить").parent().should("be.disabled");
  });
});
