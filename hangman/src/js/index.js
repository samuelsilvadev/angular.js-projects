(function() {
	const WORDS = ['cat', 'lemon', 'woman', 'something'];
	const SECRET_CHARACTER = '*';

	function generateAWord() {
		const word = WORDS[Math.round(Math.random() * WORDS.length)];

		return word;
	}

	angular
		.module('HangmanApp', [])
		.controller('HangmanController', HangmanController);
	
		function HangmanController($scope) {
			$scope.name = 'Hangman';
			$scope.correctLetters = [];
			$scope.incorrectLetters = [];
			$scope.guesses = 6;
			$scope.displayWord = '';
			$scope.wordToFigureOut = '';
			$scope.input = {
				letter: '',
			};
			$scope.isDisabled = false;

			$scope.letterChosen = function letterChosen() {
				const letter = $scope.input.letter.toLowerCase();
				const wordToFigureOutLowerCase = $scope.wordToFigureOut.toLowerCase();
				const hasLetter = wordToFigureOutLowerCase && wordToFigureOutLowerCase.indexOf(letter) !== -1;

				if (hasLetter) {
					const letterIndex = wordToFigureOutLowerCase.indexOf(letter);

					$scope.displayWord = $scope.displayWord
						.split('')
						.map(function(character, index) {
							if(index === letterIndex) {
								return letter;
							}
							return character;
						}).join('');

					$scope.correctLetters.push(letter);
				} else {
					if ($scope.incorrectLetters.indexOf(letter) === -1) {
						$scope.incorrectLetters.push(letter);
					}

					if($scope.guesses > 0) {
						$scope.guesses--;
					} else {
						$scope.isDisabled = true;
					}
				}

				$scope.input.letter	= '';
			}

			function newGame() {
				$scope.isDisabled = false;
				$scope.wordToFigureOut = generateAWord();
				$scope.correctLetters = [];
				$scope.incorrectLetters = [];
				$scope.guesses = 6;
				$scope.displayWord = $scope.wordToFigureOut && SECRET_CHARACTER.repeat($scope.wordToFigureOut.length);
			}

			newGame();
		}
})();
