const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

app.use(morgan('combined'));


//Middleware
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

let envelopes = [
    { name: 'Alimentación', amount: 20000 },
    { name: 'Transporte', amount: 10000 },
    { name: 'Entretenimiento', amount: 5900 },
];

let totalBugget = 25000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


//Create envelopes:
app.post('/envelopes', (req, res, next) => {
    const { name, amount } = req.body;
    if (!name || amount === null) {
        return res.status(400).json({ error: 'Faltan Datos' });
    }
    const newEnvelope = { name, amount };
    envelopes.push(newEnvelope);
    res.status(201).json(newEnvelope);
});

//Get all envelopes:
app.get('/envelopes', (req, res, next) => {
    res.send(envelopes);
});

//Update specific envelopes
app.put('/envelopes/:name', (req, res, next) => {
    const envelopeName = req.params.name; //El nombre del envolopes a actualizar
    const { name, amount } = req.body; //Datos a actualizar!
    const envelopeIndex = envelopes.findIndex(envelope => envelope.name === envelopeName);

    if (envelopeIndex === -1) {
        return res.status(404).json({ error: 'Sobre no enontrado' });
    }
    // Actualiza el sobre con los nuevos valores
    if (name !== undefined) {
        envelopes[envelopeIndex].name = name;
    }
    if (amount !== undefined) {
        envelopes[envelopeIndex].amount = amount;
    }

    // Envía el sobre actualizado como respuesta
    res.json(envelopes[envelopeIndex]);

});

//DELETE specific envelopes
app.delete('/envelopes/:name', (req, res, next) =>{
    const envelopeName = req.params.name; // El nombre del sobre a eliminar
    const envelopeIndex = envelopes.findIndex(envelope => envelope.name === envelopeName);
    
    // Si no se encuentra el sobre, devuelve un 404
    if (envelopeIndex === -1) {
        return res.status(404).json({ error: 'Sobre no encontrado' });
    }
    
    // Elimina el sobre del array
    envelopes.splice(envelopeIndex, 1);
    
    // Responde con un código de estado 204 (sin contenido)
    res.status(204).send();
});



// Ruta para transferir presupuesto de un sobre a otro
app.post('/envelopes/transfer/:from/:to', (req, res) => {
    // Extrae los parámetros de la URL (sobres de origen y destino)
    const fromName = req.params.from;
    const toName = req.params.to;
    // Extrae la cantidad a transferir del cuerpo de la solicitud
    const amount = req.body.amount;

    // Verifica que la cantidad sea un número giválido y mayor que cero
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Cantidad inválida' });
    }

    // Encuentra los sobres de origen y destino
    const fromEnvelope = envelopes.find(envelope => envelope.name === fromName);
    const toEnvelope = envelopes.find(envelope => envelope.name === toName);

    // Verifica si ambos sobres existen
    if (!fromEnvelope || !toEnvelope) {
        return res.status(404).json({ error: 'Uno o ambos sobres no encontrados' });
    }

    // Verifica si el sobre de origen tiene suficiente presupuesto
    if (fromEnvelope.amount < amount) {
        return res.status(400).json({ error: 'Presupuesto insuficiente en el sobre de origen' });
    }

    // Realiza la transferencia
    fromEnvelope.amount -= amount; // Resta la cantidad del sobre de origen
    toEnvelope.amount += amount; // Añade la cantidad al sobre de destino

    // Responde con los sobres actualizados
    res.json({
        message: 'Transferencia realizada con éxito',
        fromEnvelope: fromEnvelope,
        toEnvelope: toEnvelope
    });
});

//Error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Algo anda mal');
});

app.listen(PORT, () => {
    console.log(`App is runing on http://localhost:${PORT}`);
});