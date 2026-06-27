import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND } from '../config/brand.js';

export default function Header() {
  const { pathname } = useLocation();
  const onNeeds = pathname.startsWith('/necesidades');

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-teal-600"><Logo className="h-9 w-9" /></span>
          <div className="leading-tight">
            <h1 className="text-lg font-extrabold text-slate-900">{BRAND.name}</h1>
            <p className="hidden sm:block text-xs font-medium text-slate-500">Ayuda humanitaria · Venezuela</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/necesidades"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              onNeeds ? 'text-teal-700' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ver necesidades
          </Link>
          <Link
            to="/necesidades?reportar=1"
            className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-teal-700 active:scale-95 transition-all"
          >
            Reportar
          </Link>
        </nav>
      </div>
    </header>
  );
}
