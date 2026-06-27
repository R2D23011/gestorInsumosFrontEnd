import { useState } from 'react';
import { URGENCY_LABELS } from '../config/constants.js';
import EditNeedModal from './EditNeedModal.jsx';

const URGENCY_STYLES = {
  alta: 'bg-red-100 text-red-700 ring-red-200',
  media: 'bg-amber-100 text-amber-700 ring-amber-200',
  baja: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export default function NeedItem({ need }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 truncate">
            {need.supply_name} <span className="text-slate-500 font-normal">x{need.quantity_needed}</span>
          </p>
          <p className="text-xs text-slate-500 truncate">
            Contacto: {need.contact_name ? `${need.contact_name} · ` : ''}
            <a href={`tel:${need.contact_phone}`} className="text-blue-600 font-semibold">{need.contact_phone}</a>
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ring-1 ring-inset ${URGENCY_STYLES[need.urgency]}`}>
            {URGENCY_LABELS[need.urgency]}
          </span>
          <button onClick={() => setShowEdit(true)}
            className="text-xs font-semibold text-slate-500 hover:underline">
            Editar
          </button>
        </div>
      </div>

      {showEdit && <EditNeedModal need={need} onClose={() => setShowEdit(false)} />}
    </>
  );
}
