console.log('script file linked');
let gameSize = 16;


for (i = 0; i < gameSize; i++) {
	document
		.querySelector('.board')
		.appendChild(document.createElement('div'))
		.setAttribute('id', i);
	document.getElementById(i).setAttribute('class', 'card');
}



