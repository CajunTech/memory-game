let gameSize = 16;
let firstChoice = {
	id: '',
	color: 'white',
};
let secondChoice = {
	id: '',
	color: 'white',
};
let winCon = 0;

let cardColors16 = [
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
let busy = false
let cardsForGame = shuffle(cardColors16);
// console.log(cardsForGame);

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
		if ((this.style.backgroundColor === 'white') && !busy) {
			// console.log(`Card ${this.id} clicked`);
			flipCard(this);
			setCardCondition(this);
			checkCards();
		}
	});
}

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function reset() {
	resetBoard();
});

//reset board back to defaults - also used to set initial board state
function resetBoard() {
	for (i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = 'white';
	}
	winCon = 0;
	resetCards();
}
//change color on flip
function flipCard(c) {
	c.style.backgroundColor = cardsForGame[c.id];
}

function setCardCondition(c) {
	if (firstChoice.id === '') {
		firstChoice.id = c.id;
		firstChoice.color = c.style.backgroundColor;
	} else if (secondChoice.id === '') {
		secondChoice.id = c.id;
		secondChoice.color = c.style.backgroundColor;
	}
	// console.log(`FC = ${firstChoice.id}`);
	// console.log(`FC = ${firstChoice.color}`);
	// console.log(`SC = ${secondChoice.id}`);
	// console.log(`SC = ${secondChoice.color}`);
}

function checkCards() {
	if (firstChoice.id != '' && secondChoice.id != '') {
        busy = true
		if (firstChoice.color === secondChoice.color) {
			checkWin();
		} else {
			setTimeout(() => {
				cards[firstChoice.id].style.backgroundColor = 'white';
				cards[secondChoice.id].style.backgroundColor = 'white';
				resetCards();
			}, 500);
		}
	}
}

function checkWin() {
	for (i = 0; i < cards.length; i++) {
		if (cards[i].style.backgroundColor != 'white') {
			winCon = winCon + 1;
		}
	}
	console.log(`WinCon = ${winCon}`);
	if (winCon === gameSize) {
		setTimeout(() => {
			alert('We have a winner');
		}, 10);
	} else {
		winCon = 0;
		resetCards();
	}
	// console.log(`WinCon = ${winCon}`);
}
function resetCards() {
	firstChoice.id = '';
	firstChoice.color = 'white';
	secondChoice.id = '';
	secondChoice.color = 'white';
    busy = false
}
