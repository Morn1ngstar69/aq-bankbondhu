import data from './banks.json';
export const directory = data.directory;
export const banks = data.banks;
export const schemes = banks.flatMap((bank) => bank.schemes.map((scheme) => ({
  ...scheme, bankId: bank.id, bankName: bank.name, initials: bank.initials,
  eligibility: bank.eligibility, branch: bank.branch, contact: bank.contact,
})));
export const tenures = [...new Set(schemes.flatMap((scheme) => scheme.tenures))].sort((a, b) => a - b);
export const tenureLabel = (months) => months === 0 ? 'Flexible' : months < 12 ? `${months} months` : `${months / 12} year${months === 12 ? '' : 's'}`;
