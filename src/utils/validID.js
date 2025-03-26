/**
 * Validates if the given ID is a valid UUIDv4.
 *
 * A UUIDv4 is a universally unique identifier generated randomly,
 * following the format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where '4' indicates the UUID version, and 'y' can be one of [8, 9, A, B].
 *
 * @param {string} id - The string ID to be validated.
 * @returns {boolean} - Returns true if the ID is a valid UUIDv4, otherwise false.
 *
 * @example
 * const isValid = isValidID("c615664e-e562-4fc0-9e70-a57c13bb1bb8");
 * console.log(isValid); // true
 */

function isValidID(id) {
  const uuidv4Regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidv4Regex.test(id);
}

module.exports = isValidID;
