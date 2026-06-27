export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const PAGE_SIZE = 12;

export const QUERY_KEYS = {
  HOSPITALS: 'hospitals',
  NEEDS: 'needs',
};

export const URGENCY_LABELS = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
};

export const VENEZUELA_STATES = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'La Guaira',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'Zulia',
];

export const SUPPLY_SUGGESTIONS = [
  'Solución Fisiológica (0.9%)',
  'Gasas Estériles',
  'Alcohol Isopropílico',
  'Jeringas',
  'Guantes de Látex',
  'Antibióticos',
  'Anestesia Local',
  'Catéteres Intravenosos',
  'Oxígeno',
  'Suturas',
];
