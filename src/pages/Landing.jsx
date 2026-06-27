import { Link } from 'react-router-dom';
import { useStats } from '../hooks/useNeeds.js';
import { BRAND } from '../config/brand.js';

function StatCard({ value, label, accent }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 text-center">
      <p className={`text-3xl sm:text-4xl font-black ${accent}`}>{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function Landing() {
  const { data: stats } = useStats();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-bold ring-1 ring-red-200 ring-inset">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Emergencia humanitaria activa
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            La ayuda llega más rápido<br className="hidden sm:block" /> cuando sabemos <span className="text-teal-600">qué falta y dónde</span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600">
            {BRAND.description}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/necesidades?reportar=1"
              className="rounded-xl bg-teal-600 text-white px-7 py-4 font-bold shadow-md hover:bg-teal-700 active:scale-95 transition-all"
            >
              Reportar una necesidad
            </Link>
            <Link
              to="/necesidades"
              className="rounded-xl bg-white text-slate-800 px-7 py-4 font-bold shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Quiero ayudar → ver necesidades
            </Link>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={stats?.active_hospitals ?? '—'} label="Centros con necesidades activas" accent="text-teal-600" />
          <StatCard value={stats?.open_needs ?? '—'} label="Insumos solicitados ahora" accent="text-red-600" />
          <StatCard value={stats?.fulfilled_needs ?? '—'} label="Necesidades ya cubiertas" accent="text-emerald-600" />
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center">Cómo funciona</h2>
        <p className="mt-2 text-center text-slate-500">Tres pasos simples, sin registros complicados.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              n: '1',
              t: 'El hospital reporta',
              d: 'Personal médico o voluntarios publican qué insumos faltan, en qué cantidad y un teléfono de contacto.',
              color: 'bg-teal-600',
            },
            {
              n: '2',
              t: 'Tú encuentras dónde ayudar',
              d: 'Centros de acopio y donantes filtran por estado para ver las necesidades más cercanas y urgentes.',
              color: 'bg-amber-500',
            },
            {
              n: '3',
              t: 'Se coordina la entrega',
              d: 'Llamas directo al contacto, coordinas la entrega y se marca la necesidad como cubierta.',
              color: 'bg-emerald-600',
            },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.color} text-white font-black text-lg`}>
                {step.n}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.t}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-slate-900 px-6 py-12 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">¿Estás en un hospital que necesita insumos?</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Publicar una necesidad toma menos de un minuto y no requiere crear una cuenta.
          </p>
          <Link
            to="/necesidades?reportar=1"
            className="mt-7 inline-block rounded-xl bg-teal-500 text-white px-7 py-4 font-bold shadow-md hover:bg-teal-400 active:scale-95 transition-all"
          >
            Reportar necesidad ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
