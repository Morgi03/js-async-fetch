
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('betoltes').addEventListener('click', () => {
        let szoveg = document.getElementById('szoveg').value;
        console.log(szoveg);
        
        setTimeout(() => {
            document.body.style.backgroundColor = 'green';
        }, 2000);

        // Szinkron:
        // let tartalom = letoltes('http://127.0.0.1:5500/main.js');

        // Aszinkron:
        fetch('http://127.0.0.1:5500/main.js').then((response) => {
            console.log(response.ok);
            console.log(response.status);
            console.log(response.statusText);
            return response.text();
        }).then((text) => {
            console.log('Letöltés kész!');
            document.getElementById('tartalom').value = text;
        }).catch((reason) => {
            console.log('Hiba!!!');
            console.log(reason);
        });

        console.log('Letöltés');
    });


    document.getElementById('kamera').addEventListener('click', () => {

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            console.log('Kaptunk jogot!');
            let v = document.getElementById('kamerakep');
            v.srcObject = stream;
            v.addEventListener('loadedmetadata', () => v.play());
        }).catch((reason) => {
            console.log('Nem sikerült a kamera lekérése!');
            console.log(reason);
        });
        console.log('Kamera gomb katt!');
        
    });
});
