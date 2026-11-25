import { ArrowUpRight, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
export const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900';
export const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900';
export function ActionLink({ to, children, secondary = false }) {
  return <Link to={to} className={secondary ? 'inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-emerald-50' : buttonClass}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
export function Brand() {
  return <Link to="/" aria-label="BankBondhu home" className="flex items-center gap-2 text-xl font-bold tracking-tight text-forest"><span className="rounded-xl bg-forest p-2 text-mint"><Landmark size={22} aria-hidden="true" /></span>BankBondhu<span className="text-emerald-700">.</span></Link>;
}
export function PageHeading({ eyebrow, title, children }) {
  return <div className="mb-9 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">{eyebrow}</p><h1 className="text-4xl font-semibold tracking-tight text-forest md:text-5xl">{title}</h1>{children && <p className="mt-4 text-base leading-7 text-slate-600">{children}</p>}</div>;
}
export function Disclaimer({ compact = false }) {
  return <p className={compact ? 'text-xs leading-6 text-slate-600' : 'rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950'}><strong>Illustrative data only.</strong> {compact ? 'Educational estimates, not financial advice. Verify rates and terms with your bank.' : 'The savings schemes, rates and account details in this prototype are fictional, not current offers. Bank directory details and links are provided for reference and may change. Estimates exclude tax, excise duty, fees and early-closure adjustments. Verify current rates and terms directly with a real bank before deciding.'}</p>;
}
