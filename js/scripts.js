let gameSize = 16;
let firstChoice = {
	id: '',
	color: 'white',
};
let secondChoice = {
	id: '',
	color: 'white',
};
let themes = [
    ['space',`url('./assets/img/pgal.jpeg')`,`url('./assets/img/astro.jpg')`],
]
let randomTheme
let winCon = 0;
const board = document.getElementById('board');
let cards;
let dColumns = 'repeat(4, 150px)';
let dRows = 'repeat(4, 150px)';
let cardWidth = '140px';
let cardHeight = '140px';
let trackedSeconds = '';
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
let cardBackgroundImg
let bodyBackgroundImg
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
let pageTimer = setInterval(function () {
	trackTime();
}, 1000);

//https://bost.ocks.org/mike/shuffle/ - Fisher-Yates Shuffle
function shuffle(array) {
	let m = array.length;
	let t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random()* m--);

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
        setCardBackgroundImg(cards[i]);
	}
    document.querySelector('body').style.backgroundImage = bodyBackgroundImg
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

// resetBoard();

function setCardListeners() {
	for (i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function selectCard(event) {
			if (this.style.backgroundColor === 'white' && !busy) {
				flipCard(this);
				trackClickCount();
				setCardCondition(this);
				checkCards();
			}
            console.log(trackedSeconds)
		});
	}
}

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function reset() {
	buildBoard();
});

//reset board back to defaults - also used to set initial board state
function resetBoard() {
	for (i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = 'white';
	}
    resetTimer()
	winCon = 0;
	resetCards();
}
//change color on flip
function flipCard(c) {
    c.style.backgroundImage = null
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
                cards[firstChoice.id].style.backgroundImage = cardBackgroundImg;
				cards[secondChoice.id].style.backgroundImage = cardBackgroundImg;
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
        clearInterval(pageTimer)
		setTimeout(() => {
			alert(
				`You found all ${
					gameSize / 2
				} matches in ${clickCount} clicks and ${min} minutes ${sec} seconds!`
			);
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

const themeButoon = document.querySelector('#themeButton');
themeButton.addEventListener('click', function ranTheme() {
	randomTheme = Math.floor(Math.random()*themes.length)
    console.log(randomTheme)
    bodyBackgroundImg = themes[randomTheme][1]
    cardBackgroundImg = themes[randomTheme][2]
    // buildBoard()
    document.querySelector('body').style.backgroundImage = bodyBackgroundImg
    for (i=0;i<cards.length;i++) {
        if (cards[i].style.backgroundColor === 'white') {
        setCardBackgroundImg(cards[i])
        }
    }
});

function setSize(c) {
	c.style.width = cardWidth;
	c.style.height = cardHeight;
}
function setCardBackgroundImg(c) {
    c.style.backgroundImage = cardBackgroundImg
}
function trackClickCount() {
	clickCount++;
	clickCounter.innerText = `Click Counter: ${clickCount}`;
}

//https://www.codegrepper.com/code-examples/html/html+timer
//https://www.w3schools.com/jsref/met_win_setinterval.asp

function trackTime() {
	trackedSeconds++;
	displayTime();
}
let min = '';
let sec = '';
const timer = document.querySelector('#timer');
function displayTime() {
	min = parseInt(trackedSeconds / 60);
	sec = trackedSeconds - min * 60;
	timer.innerText = `Timer ${min}:${sec}`;
}


function resetTimer() {
	clearInterval(pageTimer);
    trackedSeconds = '';
    pageTimer = setInterval(function () {
        trackTime();
    }, 1000);
}


console.log(themes)