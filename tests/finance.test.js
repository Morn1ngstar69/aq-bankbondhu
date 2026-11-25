import { describe, expect, it } from 'vitest';
import { calculateMaturity, filterSchemes } from '../src/utils/finance';
import { schemes, banks } from '../src/data/catalog';
const base = { type: 'DPS', amount: 1000, rate: 6, months: 12 };
describe('maturity estimates', () => {
  it('matches a monthly deposit ledger, not only the formula', () => {
    let balance = 0;
    for (let month = 0; month < 12; month++) balance = balance * 1.005 + 1000;
    expect(calculateMaturity(base).total).toBeCloseTo(balance, 8);
    expect(balance).toBeCloseTo(12335.56, 2);
  });
  it('handles zero interest and start-of-month deposits', () => {
    expect(calculateMaturity({ ...base, rate: 0 }).total).toBe(12000);
    expect(calculateMaturity({ ...base, timing: 'start' }).total).toBeCloseTo(calculateMaturity(base).total * 1.005, 8);
  });
  it('calculates simple and compound FDR with partial years', () => {
    const deposit = { type: 'FDR', amount: 100000, rate: 8, months: 12 };
    expect(calculateMaturity(deposit).total).toBe(108000);
    expect(calculateMaturity({ ...deposit, months: 6 }).total).toBe(104000);
    expect(calculateMaturity({ ...deposit, months: 24, frequency: 'annual' }).total).toBeCloseTo(116640, 8);
    expect(calculateMaturity({ ...deposit, frequency: 'monthly' }).total).toBeCloseTo(100000 * (1 + .08 / 12) ** 12, 8);
    expect(calculateMaturity({ ...deposit, frequency: 'quarterly' }).total).toBeCloseTo(108243.216, 6);
  });
  it.each([{ amount: 0.5 }, { amount: -1 }, { amount: 0 }, { rate: -1 }, { rate: 31 }, { months: 0 }, { months: 1.5 }, { months: 361 }, { amount: Infinity }, { rate: NaN }])('rejects invalid input %j', (override) => {
    expect(() => calculateMaturity({ ...base, ...override })).toThrow();
  });
});
describe('data and filtering', () => {
  it('has unique ids and valid schemes', () => {
    expect(new Set(schemes.map((scheme) => scheme.id)).size).toBe(schemes.length);
    expect(new Set(banks.map((bank) => bank.id)).size).toBe(banks.length);
    schemes.forEach((scheme) => { expect(scheme.rate).toBeGreaterThanOrEqual(0); expect(scheme.tenures.length).toBeGreaterThan(0); expect(scheme.minimumDeposit).toBeGreaterThan(0); });
  });
  it('combines filters and supports flexible savings tenure', () => {
    expect(filterSchemes(schemes, { bank: 'bank-2', type: 'FDR', tenure: '12', minRate: '9', query: 'fixed' })).toHaveLength(1);
    expect(filterSchemes(schemes, { tenure: '0' })).toHaveLength(4);
    expect(filterSchemes(schemes, { minRate: '30' })).toHaveLength(0);
  });
});
