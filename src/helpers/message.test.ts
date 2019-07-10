import { getMessage } from './message';

const array = ['hoga', 'fuga'];

describe('getMessage Test.', () => {
  it('Error 0000', () => {
    const assert = getMessage('err', '0000', array);
    const expected = 'Unknown System Error.\nmessage: hoga, stacktrace: fuga';
    expect(assert).toBe(expected);
  });

  it('Error 0001', () => {
    const assert = getMessage('err', '0001', array);
    const expected = 'System Error. message: hoga';
    expect(assert).toBe(expected);
  });
});
