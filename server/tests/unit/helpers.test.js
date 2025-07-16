const { capitalize } = require('../../src/utils/helpers');

describe('capitalize utility (server)', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('returns empty string for non-string input', () => {
    expect(capitalize(123)).toBe('');
    expect(capitalize(null)).toBe('');
    expect(capitalize(undefined)).toBe('');
  });
}); 