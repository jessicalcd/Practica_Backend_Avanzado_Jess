export function index (req, res, next) {
    res.locals.users = [
        {name: 'Lampara LED ajustable', price: 40 },
        {name: 'Zapatillas Nike Air Max', price: 100 },
        {name: 'Bicicleta Trek Marlin 7', price: 650 },
        {name: 'iPhone 13 Pro Max', price: 1100}
    ]

    const now = new Date()
    res.locals.esPar = (now.getSeconds() % 2 ) === 0
    res.locals.segundoActual = now.getSeconds()

    res.locals.codigo = '<script>alert("inyectado!!!")</script>'

    res.render('home')
}

