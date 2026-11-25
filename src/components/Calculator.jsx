import { useId, useState } from 'react';
import { ArrowUpRight, Calculator as CalculatorIcon } from 'lucide-react';
import { calculateMaturity, money } from '../utils/finance';
import { inputClass } from './UI';
export default function Calculator({ initialType = 'DPS' }) {
  const id = useId();
  const [type, setType] = useState(initialType);
  const [amounts, setAmounts] = useState({ DPS: '5000', FDR: '100000' });
  const [rate, setRate] = useState('8');
  const [months, setMonths] = useState('60');
  const [timing, setTiming] = useState('end');
  const [frequency, setFrequency] = useState('simple');
  let result, error;
  try {
    if ([amounts[type], rate, months].some((value) => value.trim() === '')) throw new Error('Complete all three fields to see your estimate.');
    result = calculateMaturity({ type, amount: Number(amounts[type]), rate: Number(rate), months: Number(months), timing, frequency });
  } catch (caught) { error = caught.message; }
  const fields = [
    { key: 'amount', label: type === 'DPS' ? 'Monthly deposit (৳)' : 'One-time deposit (৳)', value: amounts[type], change: (value) => setAmounts({ ...amounts, [type]: value }), min: 1, max: 100000000, step: 'any' },
    { key: 'rate', label: 'Annual interest rate (%)', value: rate, change: setRate, min: 0, max: 30, step: 'any' },
    { key: 'months', label: 'Tenure (months)', value: months, change: setMonths, min: 1, max: 360, step: 1 },
  ];
  return <section id="calculator" aria-labelledby={`${id}-title`} className="scroll-mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
    <div className="grid lg:grid-cols-[1.1fr_0.9fr]"><div className="p-6 md:p-9"><div className="mb-5 flex items-center gap-2 text-emerald-800"><CalculatorIcon size={19} /><span className="text-xs font-bold uppercase tracking-widest">Make the numbers yours</span></div><h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-forest">A small habit. A bigger tomorrow.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Explore what your savings could become.</p>
      <div className="my-6 inline-flex gap-1 rounded-full bg-paper p-1" role="group" aria-label="Calculator type">{['DPS', 'FDR'].map((item) => <button type="button" key={item} onClick={() => setType(item)} aria-pressed={type === item} className={`rounded-full px-6 py-2 text-sm font-semibold ${type === item ? 'bg-forest text-white' : 'text-slate-600 hover:bg-emerald-50'}`}>{item} calculator</button>)}</div>
      <div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`} className={`text-sm font-medium ${field.key === 'amount' ? 'sm:col-span-2' : ''}`}>{field.label}<input id={`${id}-${field.key}`} className={inputClass} inputMode="decimal" type="number" min={field.min} max={field.max} step={field.step} value={field.value} onChange={(event) => field.change(event.target.value)} aria-describedby={error ? `${id}-error` : `${id}-assumptions`} /></label>)}
      {type === 'DPS' ? <label className="text-sm font-medium sm:col-span-2">Monthly deposit timing<select className={inputClass} value={timing} onChange={(event) => setTiming(event.target.value)}><option value="end">End of each month</option><option value="start">Start of each month</option></select></label> : <label className="text-sm font-medium sm:col-span-2">Interest method<select className={inputClass} value={frequency} onChange={(event) => setFrequency(event.target.value)}><option value="simple">Simple interest</option><option value="annual">Compounded annually</option><option value="quarterly">Compounded quarterly</option><option value="monthly">Compounded monthly</option></select></label>}
      </div>{error && <p id={`${id}-error`} role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    </div><div className="flex flex-col justify-center bg-forest p-6 text-white md:p-9"><div className="mb-6 flex items-center justify-between"><span className="rounded-full border border-white/30 px-3 py-1 text-xs text-emerald-50">YOUR SAVINGS SNAPSHOT</span><ArrowUpRight size={22} className="text-mint" /></div><div aria-live="polite" aria-atomic="true"><p className="text-sm text-emerald-100">Estimated maturity value</p><p className="mt-3 break-words text-4xl font-semibold tracking-tight text-mint md:text-5xl">{result ? money(result.total) : '—'}</p><p className="mt-2 text-xs text-emerald-100">Before taxes and fees · rounded to the nearest taka</p>
      <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-white/20 py-6"><div><dt className="text-xs text-emerald-100">You contribute</dt><dd className="mt-2 break-words text-xl font-semibold">{result ? money(result.principal) : '—'}</dd></div><div><dt className="text-xs text-emerald-100">Estimated interest</dt><dd className="mt-2 break-words text-xl font-semibold text-mint">{result ? money(result.interest) : '—'}</dd></div></dl></div>
      <p id={`${id}-assumptions`} className="mt-6 text-xs leading-6 text-emerald-50">{type === 'DPS' ? `Assumes equal deposits at the ${timing} of each month, a constant nominal annual rate and monthly compounding. No missed payments.` : `Assumes a single deposit and a constant nominal annual rate. ${frequency === 'simple' ? 'Simple interest accrues proportionally to months.' : 'Compound periods use months ÷ 12; fractional periods are a mathematical approximation.'}`} Actual bank methods and payouts can differ. No taxes, fees or early withdrawals are modeled.</p>
    </div></div>
  </section>;
}
