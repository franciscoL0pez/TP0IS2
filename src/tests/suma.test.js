// suma.test.js
const suma = require('../suma/suma');

describe('Función suma', () => {
  it('debería devolver 5 cuando se suman 2 y 3', () => {
    expect(suma(2, 3)).toBe(5);
  });

  it('debería devolver -1 cuando se suman -2 y 1', () => {
    expect(suma(-2, 1)).toBe(-1);
  });

  it('debería devolver 0 cuando se suman 0 y 0', () => {
    expect(suma(0, 0)).toBe(0);
  });
});
