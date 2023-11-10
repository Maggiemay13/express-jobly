const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", () => {
  test("generates correct SQL for valid input", () => {
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };

    const jsToSql = {
      firstName: "first_name",
    };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result.setCols).toBe('"first_name"=$1, "age"=$2');
    expect(result.values).toEqual(["Aliya", 32]);
  });

  test("throws BadRequestError for empty data", () => {
    const dataToUpdate = {};
    const jsToSql = {};

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });

  test("throws BadRequestError for empty data", function () {
    // Input with empty data
    const emptyData = {};
    const jsToSql = { fieldName: "column_name" };

    // Testing if the function throws a BadRequestError
    expect(() => {
      sqlForPartialUpdate(emptyData, jsToSql);
    }).toThrow(BadRequestError);
  });
});
