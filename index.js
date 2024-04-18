const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let envelopes = [
    { name: 'Alimentación', amount: 20000 },
    { name: 'Transporte', amount: 10000 },
    { name: 'Entretenimiento', amount: 5900 },
];

let totalBugget = 25000;


app.get('/', (req, res) => {
    // res.send('Hola mundo!');
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


app.put('/envelopes/:name', (req, res, next) => {
    const envelopeName = req.params.name; //El nombre del envolopes a actualizar
    const { name, amount } = req.body; //Datos a actualizar!
    const envelopeIndex = envelopes.findIndex(envelope => {
        envelope.name === envelopeName;
    })
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



app.listen(PORT, () => {
    console.log(`App is runing on http://localhost:${PORT}`);
});