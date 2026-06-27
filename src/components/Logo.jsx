// Logo: cruz médica dentro de un nodo de red (conexión + salud).
export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="currentColor" />
      {/* Cruz médica */}
      <path
        d="M22.5 11h-5v6.5H11v5h6.5V29h5v-6.5H29v-5h-6.5V11z"
        fill="white"
      />
      {/* Nodos de red en las esquinas */}
      <circle cx="11" cy="11" r="2.2" fill="white" fillOpacity="0.55" />
      <circle cx="29" cy="29" r="2.2" fill="white" fillOpacity="0.55" />
    </svg>
  );
}
