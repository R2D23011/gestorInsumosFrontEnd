import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND } from '../config/brand.js';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="text-teal-600"><Logo className="h-8 w-8" /></span>
            <div>
              <p className="font-extrabold text-slate-900">{BRAND.name}</p>
              <p className="text-xs text-slate-500">{BRAND.tagline}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-700">Inicio</Link>
            <Link to="/necesidades" className="hover:text-teal-700">Necesidades</Link>
            <a href={`mailto:${BRAND.contactEmail}`} className="hover:text-teal-700">Contacto</a>
          </nav>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          {BRAND.name} es una iniciativa ciudadana sin fines de lucro para coordinar ayuda médica.
          La información de necesidades es reportada por hospitales, clínicas y voluntarios.
        </p>
      </div>
    </footer>
  );
}
