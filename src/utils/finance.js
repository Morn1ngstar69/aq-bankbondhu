// Pure functions keep calculation assumptions visible and independently testable.
export const money = (value) => new Intl.NumberFormat('en-BD', {
  style: 'currency', currency: 'BDT', maximumFractionDigits: 0,
}).format(value);

export function calculateMaturity({ type, amount, rate, months, timing = 'end', frequency = 'simple' }) {
  if (!['DPS', 'FDR'].includes(type)) throw new Error('Choose DPS or FDR.');
  if (![amount, rate, months].every(Number.isFinite) || amount < 1 || amount > 100000000 || rate < 0 || rate > 30 || !Number.isInteger(months) || months < 1 || months > 360) {
    throw new Error('Enter an amount from ৳1 to ৳100,000,000, a rate from 0–30%, and 1–360 whole months.');
  }
  let total;
  const principal = type === 'DPS' ? amount * months : amount;
  if (type === 'DPS') {
    if (!['start', 'end'].includes(timing)) throw new Error('Choose a valid deposit timing.');
    const monthlyRate = rate / 100 / 12;
    // expm1/log1p avoid cancellation error for rates close to zero.
    total = monthlyRate === 0 ? principal : amount * Math.expm1(months * Math.log1p(monthlyRate)) / monthlyRate;
    if (timing === 'start') total *= 1 + monthlyRate;
  } else {
    const periods = { annual: 1, quarterly: 4, monthly: 12 }[frequency];
    if (frequency !== 'simple' && !periods) throw new Error('Choose a valid interest method.');
    total = frequency === 'simple' ? amount * (1 + rate / 100 * months / 12)
      : amount * (1 + rate / 100 / periods) ** (periods * months / 12);
  }
  return { principal, total, interest: total - principal };
}

export function filterSchemes(schemes, { bank = '', type = '', tenure = '', minRate = '', query = '' }) {
  return schemes.filter((scheme) => (!bank || scheme.bankId === bank)
    && (!type || scheme.type === type)
    && (!tenure || scheme.tenures.includes(Number(tenure)))
    && (minRate === '' || scheme.rate >= Number(minRate))
    && `${scheme.name} ${scheme.bankName}`.toLowerCase().includes(query.toLowerCase()));
}
