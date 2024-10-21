import iconPaths from "./iconPath"

const categories = {
    income: {
        name: 'Ingresos',
        items: [
            { name: 'Salario', type: 'Salario', icon: iconPaths.euro },
            { name: 'Salario', type: 'salary', icon: iconPaths.euro },
            { name: 'Bonus Salarial', type: 'salary_bonus', icon: iconPaths.euro },
            { name: 'Ingreso Extra', type: 'extra_income', icon: iconPaths.euro },
            { name: 'Salario de Pareja', type: 'salary_partner', icon: iconPaths.euro },
            { name: 'Bono de Pareja', type: 'salary_partner_bonus', icon: iconPaths.euro },
        ],
    },
    
    housingServices: {
        name: 'Vivienda y Servicios',
        items: [
            { name: 'Alquiler', type: 'Alquiler', icon: iconPaths.house },
            { name: 'Alquiler', type: 'rent', icon: iconPaths.house },
            { name: 'Hipoteca', type: 'mortgage', icon: iconPaths.housePlus },
            { name: 'Agua', type: 'water', icon: iconPaths.water },
            { name: 'Electricidad', type: 'electricity', icon: iconPaths.electricity },
            { name: 'Gas', type: 'gas', icon: iconPaths.gas },
            { name: 'Teléfono', type: 'phone', icon: iconPaths.phone },
            { name: 'Internet', type: 'internet', icon: iconPaths.internet },
            { name: 'Reparaciones', type: 'repairs', icon: iconPaths.repairs },
            { name: 'Electrodoméstcos', type: 'appliances', icon: iconPaths.refrigerator },
        ],
    },
    transportation: {
        name: 'Transporte',
        items: [
            { name: 'Transporte', type: 'transport', icon: iconPaths.transport },
            { name: 'Coche', type: 'car', icon: iconPaths.car },
        ],
    },
    healthEducation: {
        name: 'Salud y Educación',
        items: [
            { name: 'Salud', type: 'healthcare', icon: iconPaths.stethoscope },
            { name: 'Seguro', type: 'insurance', icon: iconPaths.insurance },
            { name: 'Educación', type: 'education', icon: iconPaths.education },
            { name: 'Niños', type: 'children', icon: iconPaths.children },
        ],
    },
    personalExpenses: {
        name: 'Gastos Personales',
        items: [
            { name: 'Comida', type: 'food', icon: iconPaths.food },
            { name: 'Ocio', type: 'leisure', icon: iconPaths.leisure },
            { name: 'Regalos', type: 'gifts', icon: iconPaths.gifts },
            { name: 'Ropa', type: 'clothing', icon: iconPaths.clothing },
            { name: 'Viajes', type: 'travel', icon: iconPaths.travel },
        ],
    },
    taxesOthers: {
        name: 'Impuestos y Otros',
        items: [
            { name: 'Impuestos', type: 'taxes', icon: iconPaths.taxes },
            { name: 'Efectivo', type: 'cash', icon: iconPaths.cash },
        ],
    },
}

export default categories
