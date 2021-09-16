console.log('script file linked');
let gameSize = 16;


for (i = 0; i < gameSize; i++) {
	document
		.querySelector('.board')
		.appendChild(document.createElement('div'))
		.setAttribute('id', i);
	document.getElementById(i).setAttribute('class', 'card');
}

let cards = document.querySelectorAll('.card');
for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function selectCard(event) {
        // event.preventDefault()
        console.log(`Card ${this.id} clicked`);
    });
}

