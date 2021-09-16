console.log('script file linked');
let gameSize = 16;
let firstChoice = '';
let secondChoice = '';

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
resetBoard()

for (i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', function selectCard(event) {
		if (this.style.backgroundColor === 'white') {
            console.log(`Card ${this.id} clicked`);
		}
		// event.preventDefault()
		// console.log(`Card ${this.id} clicked`);
	});
}

function resetBoard() {
	for (i = 0; i < cards.length; i++) {
		cards[i].style.backgroundColor = 'white';
	}
	firstChoice = '';
	secondChoice = '';
}
