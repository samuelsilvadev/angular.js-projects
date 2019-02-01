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

			$scope.letterChosen = function letterChosen() {

				const hasLetter = $scope.wordToFigureOut && $scope.wordToFigureOut.indexOf($scope.input.letter) !== -1;

				if (hasLetter) {
					const letterIndex = $scope.wordToFigureOut.indexOf($scope.input.letter);

					$scope.displayWord = $scope.displayWord
						.split('')
						.map(function(letter, index) {
							if(index === letterIndex) {
								return $scope.input.letter;
							}
							return letter;
						}).join('');

					$scope.correctLetters.push($scope.input.letter);
				} else {
					if ($scope.incorrectLetters.indexOf($scope.input.letter) === -1) {
						$scope.incorrectLetters.push($scope.input.letter);
					}
				}

				$scope.input.letter	= '';
			}

			function newGame() {
				$scope.wordToFigureOut = generateAWord();
				$scope.correctLetters = [];
				$scope.incorrectLetters = [];
				$scope.guesses = 6;
				$scope.displayWord = $scope.wordToFigureOut && SECRET_CHARACTER.repeat($scope.wordToFigureOut.length);
			}

			newGame();
		}
})();
