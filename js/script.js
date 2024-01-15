console.log('JS OK')

// - 1 Recupero gli elementi dal DOM

const countdownElement = document.getElementById('countdown');
const numbersListElement = document.getElementById('numbers-list');
const form = document.getElementById('answers-form');
const messageElement = document.getElementById('message');
const inputs = document.querySelectorAll('input');
const instructionsElement = document.getElementById('instrusctions');


// # FUNZIONI INTERNE
// - 3  Funzione per generare i numeri random
const getDifferentRandomNumbers = (min, max, totalNumbers) => {
    const extractedNumbers = [];
    while(extractedNumbers.length < totalNumbers) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!extractedNumbers.includes(randomNumber)) extractedNumbers.push(randomNumber)
    }

    return extractedNumbers;
}

// # informazioni iniziali
// - 2 Stabilisco i dati di partenza
const min = 1;
const max = 100;
const totalNumbers = 5;
let time = 10;

// # Steps di partenza

// - 3 Genero TOT numeri random
const numbers = getDifferentRandomNumbers(min, max, totalNumbers);

// - 4 Inserisco i "li" numeri in pagina
let items = '';

for (let number of numbers){
    items += `<li class="fs-3">${number}</li>`
}

numbersListElement.innerHTML = items;

// - 5 Conto alla rovescia
countdownElement.innerText = time;
const countdown = setInterval(() => {
    countdownElement.innerText = --time;
    if(time === 0){
        clearInterval(countdown);
        form.classList.remove('d-none');
        numbersListElement.classList.add('d-none');
        instructionsElement.innerText = 'Inserisci tutti i numeri che hai memorizzato!';
    }
}, 1000)


// - 6 Controllo della soluzione dell'utente
const inputFields = document.querySelectorAll('input');
const confirm = e => {
    // ! blocco il ricaricamento della pagina
    e.preventDefault();

    const userGuesses = [];

    for (let i = 0; i < inputFields.length; i++) {
        const field = inputFields[i];

        const value = parseInt(field.value)
        if(!isNaN(value) && value >= min && value <= max && !userGuesses.includes(value)) {
            userGuesses.push(value);
        }
    }

    // ! - 6b validazione
    if (userGuesses.length !== totalNumbers) {
        messageElement.classList.add('text-danger');
        messageElement.innerText = 'Ci sono dei valori non validi o duplicati';
        return;
    }


    // - 7 Controllo quanti numeri ha indovinato l'utente
    const correctAnswers = [];
    for (let i = 0; i < userGuesses.length; i++){
        const guess = userGuesses[i];
        if(numbers.includes(guess)) correctAnswers.push(guess);
    }

    // - 8 Stampo il risultato in pagina
    messageElement.classList.remove('text-danger');
    if(correctAnswers.length === totalNumbers) messageElement.classList.add('text-success')
    messageElement.innerText = `Hai indovinato ${correctAnswers.length} numeri! (${correctAnswers})`;
}


form.addEventListener('submit', confirm)
