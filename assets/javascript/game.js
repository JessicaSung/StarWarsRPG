$(document).ready(function(){

// VARIABLES
// ===============================================
var characters = [
	{name: 'Obi-Wan Kenobi', img: 'assets/images/obiwan.jpg', hp: 120, ap: 12, ca: 10},
	{name: 'Luke Skywalker', img: 'assets/images/luke.png', hp: 100, ap: 8, ca: 6},
	{name: 'Darth Sidious', img: 'assets/images/sideous.jpg', hp: 150, ap: 15, ca: 13},
	{name: 'Darth Maul', img: 'assets/images/maul.jpg', hp: 180, ap: 6, ca: 4}
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
		// defender hp = 0 or less, remove and choose new defender
		if (defenderHP <= 0) {
			$('#defender').empty();
			enemyIsChosen = false;
		}
		// player wins by defeating all defenders
		if ($('#availableEnemies').children().length == 0 && $('#defender').children().length == 0 && playerIsChosen ) {
			var p = $('<p>');
			p.append('Good job, you won!');
			$('#gameText').append(p);
			// restart button
		}
		// player loses by when hp = 0 or less
		if (playerHP <= 0) {
			$('#gameText').empty();
			var p = $('<p>');
			p.append('You have been defeated...GAME OVER!');
			$('#gameText').append(p);
			// restart button
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




start();
});