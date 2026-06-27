import NeedItem from './NeedItem.jsx';

export default function HospitalCard({ hospital }) {
  const openNeeds = (hospital.needs || []).filter((n) => n.status === 'abierta');

  if (openNeeds.length === 0) return null;

  const location = [hospital.city, hospital.state].filter(Boolean).join(', ');

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-800 truncate">{hospital.name}</h2>
          <p className="text-sm text-slate-500 truncate">
            {location}{hospital.address ? ` · ${hospital.address}` : ''}
          </p>
        </div>
        <a href={`tel:${hospital.phone}`}
          className="flex items-center gap-1.5 shrink-0 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-bold shadow-sm active:scale-95">
          📞 Llamar
        </a>
      </div>

      <div className="space-y-2">
        {openNeeds.map((need) => <NeedItem key={need.id} need={need} />)}
      </div>
    </div>
  );
}
