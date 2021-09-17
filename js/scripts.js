console.log('script file linked');
let gameSize = 16;
let firstChoice = '';
let secondChoice = '';
let winCon = 1;

let cardColors = [
	'red',
	'red',
	'green',
	'green',
	'purple',
	'purple',
	'yellow',
	'yellow',
	'blue',
	'blue',
	'orange',
	'orange',
	'brown',
	'brown',
	'pink',
	'pink',
];

let cardsForGame = shuffle(cardColors);
console.log(cardsForGame);

//https://bost.ocks.org/mike/shuffle/ - Fisher-Yates Shuffle
function shuffle(array) {
	let m = array.length;
	let t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

for (i = 0; i < gameSize; i++) {
	document
		.querySelector('.board')
		.appendChild(document.createElement('div'))
		.setAttribute('id', i);
	document.getElementById(i).setAttribute('class', 'card');
}

let cards = document.querySelectorAll('.card');
resetBoard();

for (i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', function selectCard(event) {
		if (this.style.backgroundColor === 'white') {
			// console.log(`Card ${this.id} clicked`);
            flipCard(this)
            setCardCondition(this)
            
        }
		// event.preventDefault()
		// console.log(`Card ${this.id} clicked`);
	});
}
//reset board back to defaults - also used to set initial board state
function resetBoard() {
	for (i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = 'white';
	}
	firstChoice = '';
	secondChoice = '';
}
//change color on flip
function flipCard(c) {
    c.style.backgroundColor = cardsForGame[c.id]
}

function setCardCondition(c) {
    if (firstChoice === '') {
        firstChoice = c.style.backgroundColor
    } else if
        (secondChoice === '') {
            secondChoice = c.style.backgroundColor
        }
    console.log(`FC = ${firstChoice}`)
    console.log(`SC = ${secondChoice}`)     
}        

function checkCards() {
    if (firstChoice != '' && secondChoice != '') {
        if (firstChoice === secondChoice) {
            checkWin()
        } else {

        }
    }
}

function checkWin () {
    for (i=0; i< cards.length; i++) {
        if (cards[i].style.backgroundColor != 'white') {
            winCon++
        }
    }
    if (winCon = gameSize) {
        alert("We have a winner")
    }
} 