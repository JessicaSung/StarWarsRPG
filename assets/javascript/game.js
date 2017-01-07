$(document).ready(function(){

// VARIABLES
// ===============================================
var characters = [
	{name: 'Obi-Wan Kenobi', img: 'assets/images/obiwan.jpg', hp: 120, ap: 11, ca: 12},
	{name: 'Luke Skywalker', img: 'assets/images/luke.png', hp: 100, ap: 13, ca: 15},
	{name: 'Darth Sidious', img: 'assets/images/sideous.jpg', hp: 150, ap: 8, ca: 11},
	{name: 'Darth Maul', img: 'assets/images/maul.jpg', hp: 180, ap: 5, ca: 10}
];
var playerIsChosen = false;
var enemyIsChosen = false;

// Display characters on the page 
function start() {
	$('.display').hide();
	for (var i = 0; i < characters.length; i++) {
		var b = $('<button>');
		b.addClass('characterButton');
		b.attr('name', characters[i].name);
		b.attr('hp', characters[i].hp);
		b.attr('ap', characters[i].ap);
		b.attr('ca', characters[i].ca);
		b.append("<p>" + characters[i].name + "</p><img src='" + characters[i].img + "' class='characterImage'><br><p class='hpDisplay'>HP: " + characters[i].hp + "</p>");
		$('#allCharacters').append(b);
	}
	var p = $('<p>');
	p.append('Choose your character.');
	$('#gameText').append(p);
}

// Choose player
$(document).on('click', '.characterButton', function() {
	if (!playerIsChosen) {
		$('#gameText').empty();
		$('.display').show();
		var player = $(this);
		player.addClass('player');
		$('#yourCharacter').append(player);
		playerIsChosen = true;
		$('#availableEnemies').append($('#allCharacters').children().addClass('possibleEnemies'));
		var p = $('<p>');
		p.append('Choose your opponent.');
		$('#gameText').append(p);
	}
});

// Choose defender
$(document).on('click', '.possibleEnemies', function() {
	if (!enemyIsChosen) {
		$('#gameText').empty();
		var defender = $(this);
		$('#defender').append(defender);
		enemyIsChosen = true;
		var p = $('<p>');
		p.append('CHARGE!!! Attack!');
		$('#gameText').append(p);	
	}
});

// Attack button functionality
$(document).on('click', '#attack', function() {
	var playerName = $('#yourCharacter').children().attr('name');
	var playerHP = $('#yourCharacter').children().attr('hp');	
	var playerAP = $('#yourCharacter').children().attr('ap');
	var defenderName = $('#defender').children().attr('name');
	var defenderHP = $('#defender').children().attr('hp');
	var defenderCA = $('#defender').children().attr('ca');
	// player and defender are both chosen
	if (playerIsChosen && enemyIsChosen && playerHP > 0) {
		$('#gameText').empty();	
		// player damages defender
		defenderHP -= playerAP;
		$('#defender').children().attr('hp', defenderHP);
		$('#defender .hpDisplay').text("HP: " + defenderHP);
		// defender counter attacks player
		playerHP -= defenderCA;
		$('#yourCharacter').children().attr('hp', playerHP);
		$('#yourCharacter .hpDisplay').text("HP: " + playerHP);
		var p = $('<p>');
		p.append("You attacked " + defenderName + " for " + playerAP + " damage.<br>" + defenderName + " attacked you back for " + defenderCA + " damage.");
		$('#gameText').append(p);
		// increment player's AP by player's Base AP
		// ===============================================
		if ($('#yourCharacter').children().length > 0 && $('#defender').children().length > 0 && playerHP > 0) {
			for (var i = 0; i < characters.length; i++) {
				if (characters[i].name == playerName) {
					var basePlayerAP = characters[i].ap;
				}				 
			}
			playerAP = parseInt(playerAP) + parseInt(basePlayerAP);
			$('#yourCharacter').children().attr('ap', playerAP);
			console.log(playerAP);
		}
		// defender hp = 0 or less, remove and choose new defender
		if (defenderHP <= 0) {
			$('#gameText').empty();
			$('#defender').empty();
			enemyIsChosen = false;
			var p = $('<p>');
			p.append('You have defeated ' + defenderName + '. Who will you challenge next?');
			$('#gameText').append(p);
		}
		// player wins by defeating all defenders
		if ($('#availableEnemies').children().length == 0 && $('#defender').children().length == 0 && playerIsChosen ) {
			$('#gameText').empty();
			$('#attack').hide();
			var p = $('<p>');
			p.append('Good job, you won!');
			// restart button
			var br = $('<br>');
			p.append(br);
			var b = $('<button>Restart</button>');
			b.addClass('btn btn-danger raised restart');
			p.append(b);
			$('#gameText').append(p);
		}
		// player loses by when hp = 0 or less
		if (playerHP <= 0) {
			$('#gameText').empty();
			$('#attack').hide();
			var p = $('<p>');
			p.append('You have been defeated...GAME OVER!');
			// restart button
			var br = $('<br>');
			p.append(br);
			var b = $('<button>Restart</button>');
			b.addClass('btn btn-danger raised restart');
			p.append(b);
			$('#gameText').append(p);
		}
	// player is chosen, defender is not chosen, there are enemies available
	} else if (playerIsChosen && !enemyIsChosen && $('#availableEnemies').children().length > 0) {
		$('#gameText').empty();
		var p = $('<p>');
		p.append('Please choose an enemy to fight!');
		$('#gameText').append(p);
	} else if (!playerIsChosen) {
		$('#gameText').empty();
		var p = $('<p>');
		p.append('Please choose your character!');
		$('#gameText').append(p);
	}
});

// Restart button functionality
$(document).on('click', '.restart', function() {
	playerIsChosen = false;
	enemyIsChosen = false;
	$('#allCharacters').empty();
	$('#yourCharacter').empty();
	$('#defender').empty();
	$('#availableEnemies').empty();
	$('#gameText').empty();
	start();
});


start();
});