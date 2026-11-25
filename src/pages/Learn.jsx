import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import lessons from '../data/lessons.json';
import { PageHeading, buttonClass } from '../components/UI';
import Calculator from '../components/Calculator';
export default function Learn() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const found = lessons.findIndex((lesson) => lesson.id === params.get('lesson'));
  const active = found < 0 ? 0 : found;
  const lesson = lessons[active];
  const [calculatorType, setCalculatorType] = useState('DPS');
  const select = (index) => setParams({ lesson: lessons[index].id }, { preventScrollReset: true });
  useEffect(() => { if (location.hash === '#calculator') document.getElementById('calculator')?.scrollIntoView(); }, [location.hash]);
  return <><PageHeading eyebrow="The learning center" title="A little knowledge goes a long way.">Six short lessons to help you understand your money. Start at the beginning, or explore a question you’ve always wanted to ask.</PageHeading>
    <div className="mb-12 grid gap-6 lg:grid-cols-[300px_1fr]"><nav aria-label="Learning path" className="self-start rounded-2xl border border-slate-200 bg-white p-3"><p className="px-3 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Your first six steps</p>{lessons.map((item, index) => <button key={item.id} onClick={() => select(index)} aria-current={active === index ? 'step' : undefined} className={`mb-1 flex w-full items-start gap-3 rounded-xl px-3 py-4 text-left text-sm leading-6 ${active === index ? 'bg-forest text-white' : 'text-slate-600 hover:bg-paper'}`}><span className={active === index ? 'text-mint' : 'text-emerald-800'}>0{index + 1}</span>{item.title}</button>)}</nav>
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-9" aria-labelledby="lesson-title"><p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Lesson {active + 1} of {lessons.length} · Beginner</p><h2 id="lesson-title" className="mt-5 text-3xl font-semibold tracking-tight text-forest">{lesson.title}</h2><p className="mt-6 leading-8 text-slate-600">{lesson.body}</p><div className="mt-7 rounded-xl bg-paper p-6"><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Let’s put numbers to it</p><p className="mt-3 leading-7">{lesson.example}</p><p className="mt-3 text-xs text-slate-500">Illustrative example. No taxes or fees included.</p></div><p className="mt-6 flex gap-3 text-sm leading-6 text-emerald-900"><Lightbulb className="shrink-0" size={20} />{lesson.takeaway}</p>
    {lesson.calculator && <a href="#calculator" className="mt-6 inline-block rounded text-sm font-semibold text-emerald-800 underline underline-offset-4" onClick={() => setCalculatorType(lesson.calculator)}>Try this in the {lesson.calculator} calculator ↓</a>}
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-6"><button disabled={active === 0} onClick={() => select(active - 1)} className="flex items-center gap-2 rounded px-2 py-3 text-sm font-medium"><ArrowLeft size={16} />Previous</button><button onClick={() => select(active === lessons.length - 1 ? 0 : active + 1)} className={buttonClass}>{active === lessons.length - 1 ? 'Start again' : 'Next lesson'}<ArrowRight size={16} /></button></div></article></div>
    <Calculator key={calculatorType} initialType={calculatorType} /><p className="mt-5 text-xs leading-6 text-slate-600">Further reading: <a href="https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest" target="_blank" rel="noreferrer" className="rounded underline">Investor.gov: compound interest</a>. Lessons use original BDT examples, not bank quotations.</p>
  </>;
}
