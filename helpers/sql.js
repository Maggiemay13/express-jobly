const { BadRequestError } = require("../expressError");
/**
 * Generates DQL code for partial updates based on the input and a mapping objest.
 * 
 * 
 * @param {Object} dataToUpdate - The data to be updated. Key-Value pairs represent column names and their values.
 * @param {Object} jsToSql - Amapping object that maps JavaScript object keys to SQL column names.  
 * @throws {BadRequestError} - Throws an error if no data is provided for the update. 
 * @returns {Object} - An Object containing the generated SET clause and an array of parameterized values. {sqlSetCols, dataToUpdate}
 * 
 * @example
 * const dataToUpdate = {
 *   firstName: 'Aliya',
 *   age: 32,
 * };
 * const jsToSql = {
 *   firstName: 'first_name',
 *   age: 'age',
 * };
 * const { setCols, values } = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * // setCols: '"first_name"=$1, "age"=$2'
 * // values: ['Aliya', 32]
 */



function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
