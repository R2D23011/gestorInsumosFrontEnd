import { useState } from 'react';
import { useCreateNeed, useCreateHospital } from '../hooks/useNeeds.js';
import { SUPPLY_SUGGESTIONS, VENEZUELA_STATES, URGENCY_LABELS } from '../config/constants.js';
import PhoneInput from './PhoneInput.jsx';

export default function NeedForm({ hospitals, onClose }) {
  const [useExisting, setUseExisting] = useState(hospitals.length > 0);
  const [hospitalId, setHospitalId] = useState(hospitals[0]?.id ?? '');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalState, setHospitalState] = useState('');
  const [hospitalCity, setHospitalCity] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalPhone, setHospitalPhone] = useState('');

  // Insumos agregados a la lista del pedido
  const [items, setItems] = useState([]);

  // Campos del insumo que se está agregando ahora
  const [supplyName, setSupplyName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [urgency, setUrgency] = useState('media');

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync: createHospital } = useCreateHospital();
  const { mutateAsync: createNeed } = useCreateNeed();

  const addItem = () => {
    if (!supplyName.trim() || Number(quantity) < 1) return;
    setItems((prev) => [
      ...prev,
      { localId: Date.now(), supply_name: supplyName.trim(), quantity_needed: Number(quantity), urgency },
    ]);
    setSupplyName('');
    setQuantity(1);
    setUrgency('media');
  };

  const removeItem = (localId) => {
    setItems((prev) => prev.filter((i) => i.localId !== localId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Si quedó un insumo escrito sin agregar a la lista, lo incluimos también
    const pendingItem =
      supplyName.trim() && Number(quantity) >= 1
        ? [{ localId: 'pending', supply_name: supplyName.trim(), quantity_needed: Number(quantity), urgency }]
        : [];
    const allItems = [...items, ...pendingItem];

    if (allItems.length === 0) {
      setFormError('Agrega al menos un insumo al pedido.');
      return;
    }
    if (useExisting && !hospitalId) {
      setFormError('Selecciona un hospital.');
      return;
    }

    setSubmitting(true);
    try {
      let targetHospitalId = useExisting ? Number(hospitalId) : null;

      if (!useExisting) {
        const newHospital = await createHospital({
          name: hospitalName,
          state: hospitalState,
          city: hospitalCity || undefined,
          address: hospitalAddress || undefined,
          phone: hospitalPhone,
        });
        targetHospitalId = newHospital.id;
      }

      // Publicamos cada insumo del pedido como una necesidad, una por una,
      // todas asociadas al mismo hospital y contacto.
      for (const item of allItems) {
        await createNeed({
          hospital_id: targetHospitalId,
          supply_name: item.supply_name,
          quantity_needed: item.quantity_needed,
          urgency: item.urgency,
          contact_name: contactName || undefined,
          contact_phone: contactPhone,
        });
      }

      onClose();
    } catch (err) {
      setFormError('No se pudo enviar el pedido. Verifica los datos e intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reportar necesidad</h3>

        {hospitals.length > 0 && (
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setUseExisting(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${useExisting ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              Hospital registrado
            </button>
            <button type="button" onClick={() => setUseExisting(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${!useExisting ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              Es nuevo
            </button>
          </div>
        )}

        {useExisting ? (
          <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg">
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>{h.name} ({h.city})</option>
            ))}
          </select>
        ) : (
          <div className="space-y-3 mb-3">
            <input required placeholder="Nombre del hospital/clínica" value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
            <select required value={hospitalState} onChange={(e) => setHospitalState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white">
              <option value="" disabled>Selecciona el estado...</option>
              {VENEZUELA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input placeholder="Ciudad (opcional)" value={hospitalCity}
              onChange={(e) => setHospitalCity(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
            <input placeholder="Dirección (opcional)" value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
            <PhoneInput required placeholder="Teléfono del centro" value={hospitalPhone}
              onChange={setHospitalPhone} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        )}

        <hr className="my-4 border-gray-200" />
        <p className="text-sm font-bold text-gray-700 mb-2">Insumos solicitados</p>

        {items.length > 0 && (
          <ul className="space-y-2 mb-3">
            {items.map((item) => (
              <li key={item.localId} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-800">
                  {item.supply_name} <span className="text-gray-500">x{item.quantity_needed}</span>{' '}
                  <span className="text-xs text-gray-400">({URGENCY_LABELS[item.urgency]})</span>
                </span>
                <button type="button" onClick={() => removeItem(item.localId)} className="text-red-500 text-sm font-bold px-2">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <input list="supply-suggestions" placeholder="Insumo necesitado (ej. Jeringas)" value={supplyName}
          onChange={(e) => setSupplyName(e.target.value)} className="w-full mb-3 p-3 border border-gray-300 rounded-lg" />
        <datalist id="supply-suggestions">
          {SUPPLY_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
        </datalist>

        <div className="flex gap-3 mb-3">
          <input type="number" min="1" placeholder="Cantidad" value={quantity}
            onChange={(e) => setQuantity(e.target.value)} className="w-2/6 p-3 border border-gray-300 rounded-lg" />
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="w-3/6 p-3 border border-gray-300 rounded-lg">
            <option value="alta">Urgencia alta</option>
            <option value="media">Urgencia media</option>
            <option value="baja">Urgencia baja</option>
          </select>
          <button type="button" onClick={addItem}
            className="w-1/6 rounded-lg bg-slate-800 text-white font-semibold text-sm">
            +
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        <input placeholder="Tu nombre (opcional)" value={contactName}
          onChange={(e) => setContactName(e.target.value)} className="w-full mb-3 p-3 border border-gray-300 rounded-lg" />
        <PhoneInput required placeholder="Teléfono de contacto para coordinar entrega" value={contactPhone}
          onChange={setContactPhone} className="w-full mb-4 p-3 border border-gray-300 rounded-lg" />

        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 p-4 rounded-lg border border-gray-300 text-gray-700 font-semibold">
            Cancelar
          </button>
          <button type="submit" disabled={submitting} className="flex-1 p-4 rounded-lg bg-blue-700 text-white font-semibold disabled:bg-blue-400">
            {submitting ? 'Enviando...' : `Publicar pedido${items.length ? ` (${items.length})` : ''}`}
          </button>
        </div>
      </form>
    </div>
  );
}
