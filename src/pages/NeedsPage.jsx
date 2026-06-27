import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHospitals } from '../hooks/useNeeds.js';
import HospitalCard from '../components/HospitalCard.jsx';
import NeedForm from '../components/NeedForm.jsx';
import { VENEZUELA_STATES } from '../config/constants.js';

export default function NeedsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // Abrir el formulario automáticamente si se llega con ?reportar=1
  useEffect(() => {
    if (searchParams.get('reportar') === '1') {
      setShowForm(true);
      searchParams.delete('reportar');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const { data, isLoading, isError, refetch, isPlaceholderData } = useHospitals({ state, city, page });

  const hospitals = data?.items || [];
  const totalPages = data?.total_pages || 0;
  const total = data?.total || 0;

  const onFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Necesidades activas</h2>
            <p className="text-sm text-slate-500">Filtra por estado para coordinar entregas cercanas.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="shrink-0 rounded-xl bg-teal-600 text-white px-5 py-3 font-bold shadow-sm hover:bg-teal-700 active:scale-95 transition-all">
            + Reportar necesidad
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <select
            value={state}
            onChange={(e) => onFilterChange(setState)(e.target.value)}
            className="sm:w-1/2 p-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Todos los estados</option>
            {VENEZUELA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="text"
            placeholder="Filtrar por ciudad..."
            value={city}
            onChange={(e) => onFilterChange(setCity)(e.target.value)}
            className="sm:w-1/2 p-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center py-16">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600"></div>
            <p className="mt-4 text-lg font-medium text-slate-600">Cargando necesidades...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl bg-red-50 p-6 text-center shadow-sm border border-red-100">
            <h3 className="text-lg font-bold text-red-800">Error de conexión</h3>
            <p className="mt-2 text-red-600">No se pudo cargar la información. Verifica tu conexión.</p>
            <button onClick={() => refetch()} className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white">Reintentar</button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {total === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <h3 className="text-xl font-bold text-slate-800">No hay necesidades reportadas</h3>
                <p className="mt-2 text-slate-500 max-w-sm">
                  {state || city
                    ? 'No se encontraron resultados para ese filtro.'
                    : 'Sé el primero en reportar lo que falta en tu hospital o clínica.'}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-500 mb-3">
                  {total} {total === 1 ? 'centro' : 'centros'} con necesidades abiertas
                </p>
                <div className={`space-y-4 transition-opacity ${isPlaceholderData ? 'opacity-60' : ''}`}>
                  {hospitals.map((h) => <HospitalCard key={h.id} hospital={h} />)}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="rounded-lg bg-white border border-slate-200 px-4 py-2 font-semibold text-slate-700 shadow-sm disabled:opacity-40 active:scale-95"
                    >
                      ← Anterior
                    </button>
                    <span className="text-sm font-medium text-slate-600">
                      Página {page} de {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                      disabled={page >= totalPages}
                      className="rounded-lg bg-white border border-slate-200 px-4 py-2 font-semibold text-slate-700 shadow-sm disabled:opacity-40 active:scale-95"
                    >
                      Siguiente →
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {showForm && (
        <NeedForm hospitals={hospitals} onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}
