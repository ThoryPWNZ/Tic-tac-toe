$(document).ready(function() {
	init();
})


function init() {

	//let's make some blocks for game
	for (let i = 0; i < 9; i++) {
		$('#main').append('<div class="gradient-border block  none"></div>');
	};

	//click event
	$('#main').click( (event) => Game.step(event) );

	Game.new();
};


const Game = (function () {
 'use strict';
	let step = 0,
		last = null;

	//creating new game
	const newGame = () => $('.block').text('');

	//this function makin step, and write last step into var
	const stepGame = (event) => {

		let makeAStep = function() {
			checkWinner();
			checkForNoMoves();
			step++;
		};

		if(event.toElement.classList.contains('block') === true)
		{
				if (step % 2 === 0 && event.target.innerHTML != 'X' && event.target.innerHTML != 'O') {
					$(event.target).text('O' );
					last = 'o';
					makeAStep()
				} else if (step % 2 != 0 && event.target.innerHTML != 'X' && event.target.innerHTML != 'O') {
					$(event.target).text('X');
					last = 'x'
					makeAStep()
				}
	
		}
		
	}

	const checkForNoMoves = () => {

		let block = document.getElementsByClassName('block');
		let freeMoves = 9;

		for(let i = 0; i < 9; i++) {	
			if( block[i].innerHTML != ''){
				freeMoves--;
			}

			if(freeMoves === 0) 
				newGame()
				
		}
	}

	const checkWinner = () => {
		if(step % 2 === 0) last = 'O';
		else last = 'X';

		let block = document.getElementsByClassName('block');
	
		//cheking 3 horizontal lines
		if (block[0].innerHTML == last && block[1].innerHTML == last && block[2].innerHTML == last) 
			endGame(last);
		else if (block[3].innerHTML == last && block[4].innerHTML == last && block[5].innerHTML == last) 
			endGame(last);
		else if (block[6].innerHTML == last && block[7].innerHTML == last && block[8].innerHTML == last) 
			endGame(last);
		
		//cheking 2 diagonals
		else if (block[0].innerHTML == last && block[4].innerHTML == last && block[8].innerHTML == last) 
			endGame(last);
		else if (block[2].innerHTML == last && block[4].innerHTML == last && block[6].innerHTML == last) 
			endGame(last);

		//cheking 3 verticals lines
		else if (block[0].innerHTML == last && block[3].innerHTML == last && block[6].innerHTML == last) 
			endGame(last);
		else if (block[1].innerHTML == last && block[4].innerHTML == last && block[7].innerHTML == last) 
			endGame(last);
		else if (block[3].innerHTML == last && block[5].innerHTML == last && block[8].innerHTML == last) 
			endGame(last);

	}

	const endGame = (winner) => {
		if (winner === 'O') 
			alertWinner('Победили нолики!');
		else 
			alertWinner('Победили крестики!');

		newGame();
	}

	const alertWinner = (message) => {
		$('.modal-p').text(message);
		$('.modal-container').slideDown();
		$('.btn').click( () => $('.modal-container').slideUp() );
	
		newGame();
	};

	return {
		new: newGame,
		step: () => stepGame(event)
	};
})();