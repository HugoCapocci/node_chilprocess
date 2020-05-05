const fork = require('child_process').fork;

const waiter = fork('./waiter.js');
waiter.on('message', message => {
    console.log('plat servi en salle : ', message);
});

let cook;
function initCook() {
    cook = fork('./cook.js');
    cook.on('message', (message) => {
        console.log('le cuisinier a fini un plat ', message);
        waiter.send(message.plat)
    });
    
    cook.on('exit', (code, signal) => {
        console.log('cook has finished his work');
        // réactive un cuisinier
        initCook();
    });
}

initCook();

cook.send('Burger');

setTimeout(() => {
    cook.send('Steak');
}, 4000);

