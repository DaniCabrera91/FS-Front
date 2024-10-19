

const categories = {
    income: {
        name: 'Ingresos',
        items: [
            { name: 'Salario', type: 'Salario', icon: '../assets/euro.svg' },
            { name: 'Salario', type: 'salary', icon: '../assets/euro.svg' },
            { name: 'Bonus Salarial', type: 'salary_bonus', icon: '../assets/euro.svg' },
            { name: 'Ingreso Extra', type: 'extra_income', icon: '../assets/euro.svg' },
            { name: 'Salario de Pareja', type: 'salary_partner', icon: '../assets/euro.svg' },
            { name: 'Bono de Pareja', type: 'salary_partner_bonus', icon: '../assets/euro.svg' },
        ],
    },
    
    housingServices: {
        name: 'Vivienda y Servicios',
        items: [
            { name: 'Alquiler', type: 'Alquiler', icon: '../assets/house.svg' },
            { name: 'Alquiler', type: 'rent', icon: '../assets/house.svg' },
            { name: 'Hipoteca', type: 'mortgage', icon: '../assets/house-plus.svg' },
            { name: 'Agua', type: 'water', icon: '../assets/waves.svg' },
            { name: 'Electricidad', type: 'electricity', icon: '../assets/plug.svg' },
            { name: 'Gas', type: 'gas', icon: '../assets/flame.svg' },
            { name: 'Teléfono', type: 'phone', icon: '../assets/smartphone.svg' },
            { name: 'Internet', type: 'internet', icon: '../assets/wifi.svg' },
            { name: 'Reparaciones', type: 'repairs', icon: '../assets/hammer.svg' },
        ],
    },
    transportation: {
        name: 'Transporte',
        items: [
            { name: 'Transporte', type: 'transport', icon: '../assets/train-front.svg' },
            { name: 'Coche', type: 'car', icon: '../assets/car.svg' },
        ],
    },
    healthEducation: {
        name: 'Salud y Educación',
        items: [
            { name: 'Salud', type: 'healthcare', icon: '../assets/stethoscope.svg' },
            { name: 'Seguro', type: 'insurance', icon: '../assets/heart-handshake.svg' },
            { name: 'Educación', type: 'education', icon: '../assets/graduation-cap.svg' },
            { name: 'Niños', type: 'children', icon: '../assets/baby.svg' },
        ],
    },
    personalExpenses: {
        name: 'Gastos Personales',
        items: [
            { name: 'Comida', type: 'food', icon: '../assets/utensils.svg' },
            { name: 'Ocio', type: 'leisure', icon: '../assets/shopping-bag.svg' },
            { name: 'Regalos', type: 'gifts', icon: '../assets/gift.svg' },
            { name: 'Ropa', type: 'clothing', icon: '../assets/shirt.svg' },
            { name: 'Viajes', type: 'travel', icon: '../assets/plane.svg' },
        ],
    },
    taxesOthers: {
        name: 'Impuestos y Otros',
        items: [
            { name: 'Impuestos', type: 'taxes', icon: '../assets/hand-coins.svg' },
            { name: 'Efectivo', type: 'cash', icon: '../assets/coins.svg' },
        ],
    },
}

module.exports = categories
