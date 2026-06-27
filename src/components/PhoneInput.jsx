// Permite solo dígitos, con un "+" opcional al inicio (formato E.164 simplificado).
function sanitizePhone(raw) {
  const hasLeadingPlus = raw.trim().startsWith('+');
  const digits = raw.replace(/\D/g, '');
  return (hasLeadingPlus ? '+' : '') + digits;
}

export default function PhoneInput({ value, onChange, placeholder, required, className }) {
  return (
    <input
      type="tel"
      inputMode="tel"
      pattern="^\+?\d{7,15}$"
      title="Solo números, opcionalmente con + al inicio (7 a 15 dígitos)"
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={(e) => onChange(sanitizePhone(e.target.value))}
      className={className}
    />
  );
}
