import { schemes, tenureLabel } from '../data/catalog';
import { money } from '../utils/finance';
import { PageHeading, Disclaimer, ActionLink } from '../components/UI';
export default function Compare({ selected, toggle, clear }) {
  const items = selected.map((id) => schemes.find((scheme) => scheme.id === id)).filter(Boolean);
  const rows = [
    ['Scheme type', (s) => s.type], ['Sample annual rate', (s) => `${s.rate.toFixed(2)}% p.a.`],
    ['Minimum deposit', (s) => `${money(s.minimumDeposit)}${s.type === 'DPS' ? ' / month' : ''}`],
    ['Tenure options', (s) => s.tenures.map(tenureLabel).join(' · ')], ['Interest method', (s) => s.interestMethod],
    ['Eligibility', (s) => s.eligibility], ['Access & early closure', (s) => s.withdrawal],
    ['Branch information', (s) => s.branch], ['Contact information', (s) => s.contact],
  ];
  return <><PageHeading eyebrow="Side by side" title="See the whole picture.">Compare up to three schemes. A rate is only one part of the decision — consider access, tenure and how interest is calculated.</PageHeading><Disclaimer />
    {items.length < 2 && <div className="my-8 rounded-2xl border border-slate-200 bg-white p-8"><h2 className="text-xl font-semibold text-forest">{items.length ? 'Add one more to compare.' : 'Your comparison starts here.'}</h2><p className="mb-5 mt-3 text-sm text-slate-600">Choose two or three schemes from the bank directory.</p><ActionLink to="/banks">Browse schemes</ActionLink></div>}
    {items.length > 0 && <><div className="my-6 flex items-center justify-between"><p className="text-sm text-slate-600">{items.length}/3 schemes selected</p><button onClick={clear} className="rounded text-sm font-semibold text-emerald-800 underline">Clear selection</button></div><div role="region" aria-label="Scheme comparison, scroll horizontally on small screens" tabIndex={0} className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full min-w-[640px] table-fixed text-left text-sm"><caption className="sr-only">Illustrative scheme comparison</caption><thead className="bg-emerald-50"><tr><th scope="col" className="w-44 p-5 text-forest">At a glance</th>{items.map((scheme) => <th scope="col" key={scheme.id} className="p-5 align-top"><p className="text-xs font-medium text-emerald-800">{scheme.bankName}</p><p className="mt-2 text-lg font-semibold text-forest">{scheme.name}</p><button aria-label={`Remove ${scheme.bankName} ${scheme.name}`} onClick={() => toggle(scheme.id)} className="mt-3 rounded text-xs font-medium text-slate-600 underline">Remove</button></th>)}</tr></thead><tbody>{rows.map(([label, getValue]) => <tr key={label} className="border-t border-slate-200"><th scope="row" className="p-5 align-top font-medium text-slate-600">{label}</th>{items.map((scheme) => <td key={scheme.id} className={`break-words p-5 align-top leading-6 ${label === 'Sample annual rate' ? 'text-xl font-semibold text-forest' : ''}`}>{getValue(scheme)}</td>)}</tr>)}</tbody></table></div><p className="mt-4 text-xs leading-6 text-slate-600">Different product types are not directly equivalent. Sample rates assume the same rate across listed tenures. No scheme is ranked or recommended.</p><div className="mt-6"><ActionLink secondary to="/banks">Change your selection</ActionLink></div></>}
  </>;
}
