import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand, Disclaimer } from './UI';
const links = [['/', 'Home'], ['/banks', 'Banks'], ['/compare', 'Compare'], ['/learn', 'Learn'], ['/about', 'About']];
export default function Layout({ children, compareCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const title = links.find(([path]) => path === location.pathname)?.[1] || 'Not found';
    document.title = `${title} | BankBondhu`;
  }, [location.pathname]);
  const navItems = links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-emerald-50 text-forest' : 'text-slate-600 hover:text-forest'}`}>{label}{label === 'Compare' && compareCount > 0 && <span className="ml-1 text-xs">({compareCount})</span>}</NavLink>);
  return <>
    <a href="#main" className="sr-only z-50 rounded bg-white p-3 focus:not-sr-only focus:absolute">Skip to content</a>
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 lg:px-8"><Brand /><nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">{navItems}</nav><NavLink to="/learn#calculator" className="hidden items-center gap-2 text-sm font-semibold text-forest lg:flex">Try the calculators <ArrowUpRight size={16} /></NavLink><button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav id="mobile-nav" aria-label="Mobile navigation" className="flex flex-wrap gap-2 border-t p-4 md:hidden">{navItems}</nav>}</header>
    <main id="main" tabIndex={-1} className="mx-auto min-h-[65vh] max-w-7xl px-5 py-10 outline-none lg:px-8 lg:py-14">{children}</main>
    <footer className="mt-8 border-t border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-2 lg:px-8"><div><Brand /><p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Your friendly starting point for understanding savings in Bangladesh.</p></div><div><Disclaimer compact /><p className="mt-4 text-xs text-slate-500">BankBondhu · Educational MVP · BDT / ৳</p></div></div></footer>
  </>;
}
