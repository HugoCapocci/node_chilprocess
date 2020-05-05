const plats = [];
let isCooking = false;

// reçoit une commande de plat
process.on('message', (plat) => {
    console.log('Ajout d\'un plat à cuisiner : ', plat);
    plats.push(plat);
});

// vérifie en 'permanence' s'il y a un pla à cuisiner
setInterval(() => {
    if (!isCooking && plats.length > 0)
        doCook();
}, 2000);

function doCook() {
    isCooking = true;
    // FIFO !
    const plat = plats.shift();

    // après un laps de temps, le plat est prêt
    const timeToReady = Math.random() * 3000;
    setTimeout(() => {
        process.send({
            plat: plat,
            preparationTime: timeToReady
        });
        isCooking = false;
    }, timeToReady)
}
