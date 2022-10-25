
// async, await

async function aszinkronFv() {
    // ...
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('betoltes').addEventListener('click', async () => {
        let szoveg = document.getElementById('szoveg').value;
        console.log(szoveg);
        
        setTimeout(() => {
            document.body.style.backgroundColor = 'green';
        }, 2000);

        // Szinkron:
        // let tartalom = letoltes('http://127.0.0.1:5500/main.js');

        // Aszinkron:
        try {
            let response = await fetch('http://127.0.0.1:5500/index.html');
            console.log(response.ok);
            console.log(response.status);
            console.log(response.statusText);

            let text = await response.text();
            console.log('Letöltés kész!');
            document.getElementById('tartalom').value = text;
        } catch (reason) {
            console.log('Hiba!!!');
            console.log(reason);
        }
    });


    document.getElementById('kamera').addEventListener('click', async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            console.log('Kaptunk jogot!');
            let v = document.getElementById('kamerakep');
            v.srcObject = stream;
            v.addEventListener('loadedmetadata', () => v.play());
        } catch (reason) {
            console.log('Nem sikerült a kamera lekérése!');
            console.log(reason);
        }
    });

    async function adatBetoltes() {
        // JSON: JavaScript Object Notation
        
        let response = await fetch('/products.json');
        let eredmeny = await response.json();

        let appleTermekek = eredmeny.products.filter(e => e.brand === "Apple");

        let termekLista = document.getElementById('termeklista');
        termekLista.textContent = '';
        for (let p of appleTermekek) {
            let li = document.createElement('li');
            li.textContent = p.title;
            termekLista.appendChild(li);
        }
    }


    document.getElementById('adatok').addEventListener('click', () => {
        adatBetoltes();
    });

    adatBetoltes();
});
