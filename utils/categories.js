const categories = {
  income: {
    name: 'Ingresos',
    items: [
      'Salario',
      'salary',
      'salary_bonus',
      'extra_income',
      'salary_partner',
      'salary_partner_bonus',
    ],
  },
  housingServices: {
    name: 'Vivienda y Servicios',
    items: [
      'Alquiler',
      'rent',
      'mortgage',
      'water',
      'electricity',
      'gas',
      'phone',
      'internet',
      'repairs',
    ],
  },
  transportation: {
    name: 'Transporte',
    items: ['transport', 'car'],
  },
  healthEducation: {
    name: 'Salud y Educación',
    items: ['healthcare', 'insurance', 'education', 'children'],
  },
  personalExpenses: {
    name: 'Gastos Personales',
    items: ['food', 'leisure', 'gifts', 'clothing', 'travel'],
  },
  taxesOthers: {
    name: 'Impuestos y Otros',
    items: ['taxes', 'cash'],
  },
}

module.exports = categories
