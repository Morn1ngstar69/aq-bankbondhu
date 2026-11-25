import { Component, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Banks from './pages/Banks';
import Compare from './pages/Compare';
import Learn from './pages/Learn';
import About from './pages/About';
import { ActionLink, PageHeading } from './components/UI';
import { schemes } from './data/catalog';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div role="alert" className="mx-auto max-w-xl p-10"><h1 className="text-2xl font-semibold">We couldn’t load this page.</h1><p className="my-4">Please reload. If you edited the demo JSON, check that its structure matches the README.</p><button className="rounded bg-forest px-4 py-3 text-white" onClick={() => window.location.reload()}>Reload BankBondhu</button></div>;
    return this.props.children;
  }
}
export default function App() {
  const [selected, setSelected] = useState([]);
  // Keep selections across client-side routes, capped at three distinct schemes.
  const toggle = (id) => setSelected((current) => {
    if (!schemes.some((scheme) => scheme.id === id)) return current;
    return current.includes(id) ? current.filter((value) => value !== id) : current.length < 3 ? [...current, id] : current;
  });
  return <ErrorBoundary><Layout compareCount={selected.length}><Routes>
    <Route path="/" element={<Home selected={selected} toggle={toggle} />} />
    <Route path="/banks" element={<Banks selected={selected} toggle={toggle} />} />
    <Route path="/compare" element={<Compare selected={selected} toggle={toggle} clear={() => setSelected([])} />} />
    <Route path="/learn" element={<Learn />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<><PageHeading eyebrow="404" title="Let’s get you back on track.">This page doesn’t exist. Your savings journey can continue from home.</PageHeading><ActionLink to="/">Back to home</ActionLink></>} />
  </Routes></Layout></ErrorBoundary>;
}
