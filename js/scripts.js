//game size - can be changed by using difficulty buttons
let gameSize = 16;
//used to store cards players choose when clicking
let firstChoice = {
	id: '',
	color: 'white',
};
let secondChoice = {
	id: '',
	color: 'white',
};
//themes - first item in array is just a visual identifier, 2nd is page background
//and 3rd is used for back of cards
let themes = [
	[
		'horror1',
		`url('./assets/img/jigsaw.jpg')`,
		`url('./assets/img/jigsawww.jpeg')`,
	],
	['eve1', `url('./assets/img/eve1.jpeg')`, `url('./assets/img/eveicon.png')`],
	['sw1', `url('./assets/img/sw1bg.jpeg')`, `url('./assets/img/yoda1.jpeg')`],
	[
		'sw2',
		`url('./assets/img/swzoombg.jpeg')`,
		`url('./assets/img/bb8icon.png')`,
	],
	[
		'matrix1',
		`url('./assets/img/matrix1bg.jpeg')`,
		`url('./assets/img/redblue.jpeg')`,
	],
];
//variables for random theme function
let randomTheme, randomThemeOld;
//variable for check win condition function
let winCon = 0;
const board = document.getElementById('board');
// default size for initial 16 card game load
//difficultyColumns and difficultyRows are short for difficultyRows
let difficultyColumns = 'repeat(4, 150px)';
let difficultyRows = 'repeat(4, 150px)';
let cardWidth = '140px';
let cardHeight = '140px';
//used for trackTime function - uses a set interval of 1000
let trackedSeconds = '';
//colors used for underside of cards
const colorMaster = [
	'pink',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'brown',
	'cyan',
	'lime',
	'grey',
	'deeppink',
	'slateblue',
	'burlywood',
	'lightseagreen',
];
let cardBackgroundImg, bodyBackgroundImg;
let cards, cardColorsForGame;
const clickCounter = document.querySelector('#clickCounter');
let clickCount;
let busy = false;
let cardsForGame = [];

//starting timer when page loads
let pageTimer = setInterval(function () {
	trackTime();
}, 1000);

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

//function to build board:
//dynamically builds board based on number of cards chosen
//sets up colors/backgrounds for cards/page, assigns click listeners, and starts timer
//initiates on page load and is called by boardReset and difficulty buttons
buildBoard();
function buildBoard() {
	clearCurrentCards();
	setCardColorsForGame();
	//create cards (divs in html.index) with appropriate class and corresponding id
	for (i = 0; i < gameSize; i++) {
		document
			.querySelector('.board')
			.appendChild(document.createElement('div'))
			.setAttribute('id', i);
		document.getElementById(i).setAttribute('class', 'card');
	}
	cards = document.querySelectorAll('.card');
	sizeSet = document.getElementsByClassName('.card');
	board.style.gridTemplateColumns = difficultyColumns;
	board.style.gridTemplateRows = difficultyRows;
	//sets card size based on difficulty and background images based on current theme
	for (i = 0; i < cards.length; i++) {
		setSize(cards[i]);
		setCardBackgroundImg(cards[i]);
	}
	//changes page background image based on theme
	document.querySelector('body').style.backgroundImage = bodyBackgroundImg;
	setCardListeners();
	resetBoard();
	clickCount = 0;
	clickCounter.innerHTML = 'Turn Counter: 0';
}

//clears all cards - called by buildBoard function
//https://css-tricks.com/snippets/javascript/remove-element/
function clearCurrentCards() {
	let removeCards = document.querySelector('.board');
	while (removeCards.firstChild) {
		removeCards.removeChild(removeCards.firstChild);
	}
}
//pulls colors from colorMaster based on number of cards chosen for board and shuffles colors
function setCardColorsForGame() {
	cardColorsForGame = [];
	for (i = 0; i < gameSize / 2; i++) {
		for (j = 0; j < 2; j++) {
			cardColorsForGame.push(colorMaster[i]);
		}
	}
	cardsForGame = shuffle(cardColorsForGame);
}
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
//used to set size of cards for various difficulties
function setSize(c) {
	c.style.width = cardWidth;
	c.style.height = cardHeight;
}
//function used by buildBoard and randomtheme button to change image of cards
function setCardBackgroundImg(c) {
	c.style.backgroundImage = cardBackgroundImg;
}
//reset card back to defaults - called by buildboard
function resetBoard() {
	for (i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = 'white';
	}
	resetTimer();
	winCon = 0;
	resetCards();
}
//sets click listeners on all cards - called by buildBoard function
function setCardListeners() {
	for (i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function selectCard(event) {
			// performs 2 checks before allowing user to click on cards
			//this prevents clicking when cards already flipped, functions still running,
			//and while displaying unmatched colors for .5 seconds
			if (this.style.backgroundColor === 'white' && !busy) {
				flipCard(this);
				trackClickCount();
				setCardCondition(this);
				checkCards();
			}
		});
	}
}
//change color on flip
function flipCard(c) {
	c.style.backgroundImage = null;
	c.style.backgroundColor = cardsForGame[c.id];
}
//tracks click count - called by listener on click
function trackClickCount() {
	clickCount++;
	clickCounter.innerText = `Turn Counter: ${parseInt(clickCount / 2)}`;
}
//tracks player card choices - called on click
function setCardCondition(c) {
	if (firstChoice.id === '') {
		firstChoice.id = c.id;
		firstChoice.color = c.style.backgroundColor;
	} else if (secondChoice.id === '') {
		secondChoice.id = c.id;
		secondChoice.color = c.style.backgroundColor;
	}
}
// checks if player choices match, sets busy flag to stop click event functionality
// and allows user to see colors if wrong choice (delay)
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

//checks if user has gotten all cards correct. if all background colors are no longer white
//ends game and triggers alert
function checkWin() {
	for (i = 0; i < cards.length; i++) {
		if (cards[i].style.backgroundColor != 'white') {
			winCon = winCon + 1;
		}
	}
	if (winCon === gameSize) {
		clearInterval(pageTimer);
		setTimeout(() => {
			alert(
				`You found all ${gameSize / 2} matches in ${parseInt(
					clickCount / 2
				)} turns and ${min} minutes ${sec} seconds!`
			);
		}, 10);
	} else {
		winCon = 0;
		resetCards();
	}
}
//resets card choice/background color of chosen cards and removes busy block on click events
//called by checkCards function if user choices do not match
function resetCards() {
	firstChoice.id = '';
	firstChoice.color = 'white';
	secondChoice.id = '';
	secondChoice.color = 'white';
	busy = false;
}

//button to reset board
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function reset() {
	buildBoard();
});
//following 4 fucntions are buttons representing different difficulty levels of game.
//change number of cards displayed, size grid/cards appropriately and then call buildBoard function
const buttonD1 = document.querySelector('#buttonD1');
buttonD1.addEventListener('click', function d1(event) {
	gameSize = 16;
	difficultyColumns = 'repeat(4, 150px)';
	difficultyRows = 'repeat(4, 150px)';
	cardWidth = '140px';
	cardHeight = '140px';
	buildBoard();
});
const buttonD2 = document.querySelector('#buttonD2');
buttonD2.addEventListener('click', function d2(event) {
	gameSize = 20;
	difficultyColumns = 'repeat(5, 120px)';
	difficultyRows = 'repeat(4, 150px)';
	cardWidth = '110px';
	cardHeight = '110px';
	buildBoard();
});
const buttonD3 = document.querySelector('#buttonD3');
buttonD3.addEventListener('click', function d3() {
	gameSize = 24;
	difficultyColumns = 'repeat(6, 100px)';
	difficultyRows = 'repeat(4, 150px)';
	cardWidth = '90px';
	cardHeight = '90px';
	buildBoard();
});
const buttonD4 = document.querySelector('#buttonD4');
buttonD4.addEventListener('click', function d4() {
	gameSize = 30;
	difficultyColumns = 'repeat(6, 100px)';
	difficultyRows = 'repeat(5, 120px)';
	cardWidth = '90px';
	cardHeight = '90px';
	buildBoard();
});
//Button used to select random theme. decided not to add buildBoard call here
//this allows user to change theme mid game and still continue without losing progress
//theme changes background of page and back of cards using matching image files pulled from
//themes array
const themeButoon = document.querySelector('#themeButton');
themeButton.addEventListener('click', function ranTheme() {
	busy = true;
	randomThemeOld = randomTheme;
	while (randomThemeOld === randomTheme) {
		randomTheme = Math.floor(Math.random() * themes.length);
	}
	bodyBackgroundImg = themes[randomTheme][1];
	cardBackgroundImg = themes[randomTheme][2];
	document.querySelector('body').style.backgroundImage = bodyBackgroundImg;
	for (i = 0; i < cards.length; i++) {
		if (cards[i].style.backgroundColor === 'white') {
			setCardBackgroundImg(cards[i]);
		}
	}
	busy = false;
});
