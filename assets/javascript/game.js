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

// Displaying characters on the page
for (var i = 0; i < characters.length; i++) {
	var b = $('<button>');
	b.addClass('characterButton');
	b.attr('name', characters[i].name);
	b.attr('hp', characters[i].hp);
	b.attr('ap', characters[i].ap);
	b.attr('ca', characters[i].ca);
	b.append("<p>" + characters[i].name + "</p><br><img src='" + characters[i].img + "' class='characterImage'><br><p>HP: " + characters[i].hp + "</p>");
	$('#allCharacters').append(b);
}


// choose player
$(document).on('click', '.characterButton', function() {
	if (!playerIsChosen) {
		// save the character name of a button clicked to a variable
		var player = $(this);
		player.addClass('player');
		$('#yourCharacter').append(player);
		playerIsChosen = true;
		$('#availableEnemies').append($('#allCharacters').children().addClass('possibleEnemies'));
	}
});


// choose defender
$(document).on('click', '.possibleEnemies', function() {
	if (!enemyIsChosen) {
		var defender = $(this);
		$('#defender').append(defender);
		enemyIsChosen = true;		
	}
});








});