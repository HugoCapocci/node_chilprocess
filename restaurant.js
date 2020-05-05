const fork = require('child_process').fork;

const cook = fork('./cook.js');
const waiter = fork('./waiter.js');

cook.on('message', (message) => {
    console.log('le cuisinier a fini un plat ', message);
    waiter.send(message.plat)
});

waiter.on('message', message => {
    console.log('plat servi en salle : ', message);
});

// commander un plat
['Burger', 'Spaghettis', 'Frites', 'Kebab']
    .forEach(plat => cook.send(plat));

cook.on('exit', (code, signal) => {
    console.log('cook has finished his work');
    // réactive un cuisinier
});
