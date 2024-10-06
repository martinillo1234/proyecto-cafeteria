function submitOrder() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const description = document.getElementById('description').innerText;
    const total = document.getElementById('totalAmount').innerText;

    if (name && email) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://your-server.com/send-order', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        const data = {
            name: name,
            email: email,
            description: description,
            total: total
        };

        xhr.send(JSON.stringify(data));

        // Reset the order
        total = 0;
        selectedItems = [];
        document.getElementById('totalAmount').innerText = '';
        document.getElementById('description').innerText = '';
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('total').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    } else {
        alert('Por favor, completa tu nombre y correo electrónico.');
    }
}
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

app.post('/send-order', (req, res) => {
    const { name, email, description, total } = req.body;

    // Store the data in a database or file
    // ...

    // Send an email using Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'your-smtp-server.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: 'your-email@example.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Orden de café',
        text: `Nombre: ${name}\nCorreo: ${email}\nDescripción: ${description}\nTotal: ${total}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.send('Orden enviada con éxito!');
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});