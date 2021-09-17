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
const board = document.getElementById('board');
let cards;
let dColumns = 'repeat(4, 150px)';
let dRows = 'repeat(4, 150px)';
let cardWidth = '140px';
let cardHeight = '140px';

const colorMaster = [
	'pink',
	'pink',
	'red',
	'red',
	'orange',
	'orange',
	'yellow',
	'yellow',
	'green',
	'green',
	'blue',
	'blue',
	'purple',
	'purple',
	'brown',
	'brown',
	'cyan',
	'cyan',
	'lime',
	'lime',
	'grey',
	'grey',
	'deeppink',
	'deeppink',
	'slateblue',
	'slateblue',
	'burlywood',
	'burlywood',
	'lightseagreen',
	'lightseagreen',
];

let cardColorsForGame = [];
function setCardColorsForGame() {
	cardColorsForGame = [];
	for (i = 0; i < gameSize; i++) {
		cardColorsForGame.push(colorMaster[i]);
	}
	cardsForGame = shuffle(cardColorsForGame);
}
const clickCounter = document.querySelector('#clickCounter');
let clickCount;
let busy = false;
let cardsForGame = [];

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

buildBoard();
function buildBoard() {
	clearCurrentCards();
	setCardColorsForGame();
	for (i = 0; i < gameSize; i++) {
		document
			.querySelector('.board')
			.appendChild(document.createElement('div'))
			.setAttribute('id', i);
		document.getElementById(i).setAttribute('class', 'card');
	}
	cards = document.querySelectorAll('.card');
	sizeSet = document.getElementsByClassName('.card');
	board.style.gridTemplateColumns = dColumns;
	board.style.gridTemplateRows = dRows;
	for (i = 0; i < cards.length; i++) {
		setSize(cards[i]);
	}
	setCardListeners();
	resetBoard();
	clickCount = 0;
	clickCounter.innerHTML = 'Click Counter: 0';
}
//https://css-tricks.com/snippets/javascript/remove-element/
function clearCurrentCards() {
	let removeCards = document.querySelector('.board');
	while (removeCards.firstChild) {
		removeCards.removeChild(removeCards.firstChild);
	}
}

resetBoard();

function setCardListeners() {
	for (i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function selectCard(event) {
			if (this.style.backgroundColor === 'white' && !busy) {
				flipCard(this);
				trackClickCount();
				setCardCondition(this);
				checkCards();
			}
		});
	}
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
}

function checkCards() {
	if (firstChoice.id != '' && secondChoice.id != '') {
		busy = true;
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
	if (winCon === gameSize) {
		setTimeout(() => {
			alert(`You found all ${gameSize / 2} matches in ${clickCount} clicks!`);
		}, 10);
	} else {
		winCon = 0;
		resetCards();
	}
}
function resetCards() {
	firstChoice.id = '';
	firstChoice.color = 'white';
	secondChoice.id = '';
	secondChoice.color = 'white';
	busy = false;
}

const buttonD1 = document.querySelector('#buttonD1');
buttonD1.addEventListener('click', function d1(event) {
	gameSize = 16;
	dColumns = 'repeat(4, 150px)';
	dRows = 'repeat(4, 150px)';
	cardWidth = '140px';
	cardHeight = '140px';
	buildBoard();
});

const buttonD2 = document.querySelector('#buttonD2');
buttonD2.addEventListener('click', function d2(event) {
	gameSize = 20;
	dColumns = 'repeat(5, 120px)';
	dRows = 'repeat(4, 150px)';
	cardWidth = '110px';
	cardHeight = '110px';
	buildBoard();
});

const buttonD3 = document.querySelector('#buttonD3');
buttonD3.addEventListener('click', function d3() {
	gameSize = 24;
	dColumns = 'repeat(6, 100px)';
	dRows = 'repeat(4, 150px)';
	cardWidth = '90px';
	cardHeight = '90px';
	buildBoard();
});

const buttonD4 = document.querySelector('#buttonD4');
buttonD4.addEventListener('click', function d4() {
	gameSize = 30;
	dColumns = 'repeat(6, 100px)';
	dRows = 'repeat(5, 120px)';
	cardWidth = '90px';
	cardHeight = '90px';
	buildBoard();
});

function setSize(c) {
	c.style.width = cardWidth;
	c.style.height = cardHeight;
}
function trackClickCount() {
	clickCount++;
	clickCounter.innerText = `Click Counter: ${clickCount}`;
}

//https://www.codegrepper.com/code-examples/html/html+timer
let trackedSeconds = 0;
function trackTime() {
    trackedSeconds++;

}
let min 
let sec = 149
function displayTime () {
min = parseInt(trackedSeconds/60)
console.log(min)
sec = trackedSeconds - min*60
}

displayTime()