import { useState } from 'react';
import { useUpdateNeed } from '../hooks/useNeeds.js';
import { SUPPLY_SUGGESTIONS } from '../config/constants.js';
import PhoneInput from './PhoneInput.jsx';

export default function EditNeedModal({ need, onClose }) {
  const [supplyName, setSupplyName] = useState(need.supply_name);
  const [quantity, setQuantity] = useState(need.quantity_needed);
  const [urgency, setUrgency] = useState(need.urgency);
  const [contactName, setContactName] = useState(need.contact_name || '');
  const [contactPhone, setContactPhone] = useState(need.contact_phone);
  const [formError, setFormError] = useState('');

  const { mutate, isPending } = useUpdateNeed();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const qty = Number(quantity);
    if (!supplyName.trim()) {
      setFormError('El insumo no puede estar vacío.');
      return;
    }
    if (!qty || qty < 1) {
      setFormError('La cantidad debe ser mayor a 0. Si ya no se necesita, usa "Marcar cubierta".');
      return;
    }
    if (!contactPhone) {
      setFormError('El teléfono de contacto es obligatorio.');
      return;
    }

    mutate(
      {
        id: need.id,
        payload: {
          supply_name: supplyName.trim(),
          quantity_needed: qty,
          urgency,
          contact_name: contactName || undefined,
          contact_phone: contactPhone,
        },
      },
      { onSuccess: onClose }
    );
  };

  const markFulfilled = () => {
    mutate({ id: need.id, payload: { status: 'cubierta' } }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Editar necesidad</h3>

        <label className="text-xs font-semibold text-gray-500 mb-1 block">Insumo</label>
        <input required list="edit-supply-suggestions" value={supplyName}
          onChange={(e) => setSupplyName(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg" />
        <datalist id="edit-supply-suggestions">
          {SUPPLY_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
        </datalist>

        <div className="flex gap-3 mb-3">
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Cantidad</label>
            <input type="number" min="1" value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Urgencia</label>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>

        <label className="text-xs font-semibold text-gray-500 mb-1 block">Nombre de contacto (opcional)</label>
        <input value={contactName} onChange={(e) => setContactName(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg" />

        <label className="text-xs font-semibold text-gray-500 mb-1 block">Teléfono de contacto</label>
        <PhoneInput required value={contactPhone} onChange={setContactPhone}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg" />

        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

        <button type="button" onClick={markFulfilled} disabled={isPending}
          className="w-full mb-3 p-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 disabled:opacity-50">
          ✓ Marcar como cubierta
        </button>

        <div className="flex gap-3">
          <button type="button" onClick={onClose}
            className="flex-1 p-4 rounded-lg border border-gray-300 text-gray-700 font-semibold">
            Cancelar
          </button>
          <button type="submit" disabled={isPending}
            className="flex-1 p-4 rounded-lg bg-blue-700 text-white font-semibold disabled:bg-blue-400">
            {isPending ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
