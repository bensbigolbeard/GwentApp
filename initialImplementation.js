/**
 * Here for posterity
 *
 * This is what I quickly coded up over part of a weekend just to scratch a coding itch before deciding to use
 * this project as an opportunity to get accustomed to React/Redux
 */
var allCards,
	urlRoot,
	setListeners;

function Card(options) {
	var card = {
		name: options.name,
		isHero: options.isHero,
		// 'melee', 'ranged', 'siege', 'mixed', 'weather', 'scorch'
		category: options.category,
		// 'inPlay', 'discarded'
		state: 'inHand',
		power: options.power,
		hasSpecialAbility: !!options.specialAbility,
		specialAbility: !!options.specialAbility && options.specialAbility.type,
		imageFront: options.imageFront,
		cardId: 'card_' + (Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100)),
		environmentalEffects: {
			weather: null,
			commandersHorn: null,
			support: null,
			muster: null,
			tightBond: null
		}
	},
	cardTemplate = '<li id="' + card.cardId + '" class="card js_card"><img class="cardImg" src="' +
		urlRoot + card.imageFront + '.jpg"></li>';

	// utils
	function indexOfCard(cards, card) {
		var cardSpecs;
		for (var i = 0; i < cards.length; i++) {
			cardSpecs = cards[i].getCardSpecs();
			if (cardSpecs.cardId === card.getCardSpecs().cardId) {
				return i;
			}
		}
		return -1;
	}
	function applyEnvEffectToCards(options) {
		options.cards.forEach(function (playedCard) {
			playedCard.setEnvironmentalEffect({
				type: options.type,
				value: options.value
			});
		});
	}

	function getCardSpecs() {
		var specs = {
			name: card.name,
			cardId: card.cardId,
			isHero: card.isHero,
			category: card.category,
			state: card.state,
			power: card.power,
			hasSpecialAbility: card.specialAbility,
			specialAbility: card.hasSpecialAbility && card.specialAbility.type,
			environmentalEffects: {
				weather: card.environmentalEffects.weather,
				commandersHorn: card.environmentalEffects.commandersHorn,
				support: card.environmentalEffects.support,
				muster: card.environmentalEffects.muster,
				tightBond: card.environmentalEffects.tightBond
			}
		};

		if (specs.environmentalEffects.weather) {
			specs.power = 1;
		}
		if (specs.environmentalEffects.support) {
			specs.power = specs.power + specs.environmentalEffects.support;
		}
		if (specs.environmentalEffects.tightBond) {
			specs.power = specs.power * specs.environmentalEffects.tightBond;
		}
		if (specs.environmentalEffects.huntersHorn) {
			specs.power = specs.power * 2;
		}

		return specs;
	}

	function setState(state) {
		card.state = state;
	}

	function getCardTemplate() {
		return cardTemplate;
	}

	function setEnvEffect(effect) {
		card.environmentalEffects[effect.type] = effect.value;
	}

	function getCurrentEnvEffects() {
		return {
				weather: card.environmentalEffects.weather,
				commandersHorn: card.environmentalEffects.commandersHorn,
				support: card.environmentalEffects.support,
				muster: card.environmentalEffects.muster,
				tightBond: card.environmentalEffects.tightBond
			};
	}

	return {
		setState: setState,
		getCardSpecs: getCardSpecs,
		setEnvEffect: setEnvEffect,
		getCurrentEnvEffects: getCurrentEnvEffects,
		getCardTemplate: getCardTemplate,
		indexOfCard: indexOfCard
	};
}

// Specials
function SpecialAbility(options) {
	var specialAbility = {
		type: options.type
	};
}

function Hand(options) {
	var hand = [],
		redraws = 2;

	return {
		cards: hand,
		redraws: redraws
	};
}

function Deck(options) {
	var deck = options,
		parsedDeck;

	function createDeck() {
		parsedDeck = parsedDeck || [];

		deck.forEach(function (card) {
			var parsedCard = new Card(card);
			parsedDeck.push(parsedCard);
		});
		return parsedDeck;
	}

	return parsedDeck || createDeck();
}

function Player(options) {
	var deck = new Deck(options.deck),
		referenceDeck =  new Deck(options.deck),
		leader = new Card(options.leader),
		playerPosition = options.playerPosition,
		field = new PlayerField({
			playerPosition: playerPosition,
			leader: leader
		}),
		hand;

	function drawHand() {
		var cardCount = 10;
		hand = new Hand();

		function sortCardsByPower(cardA, cardB) {
			var cardASpecs = cardA.getCardSpecs(),
				cardBSpecs = cardB.getCardSpecs();

			if (cardASpecs.power < cardBSpecs.power) {
				return -1;
			} else if (cardASpecs.power > cardBSpecs.power) {
				return 1;
			} else {
				return 0;
			}
		}

		function sortCardsByHero(cardA, cardB) {
			var cardASpecs = cardA.getCardSpecs(),
				cardBSpecs = cardB.getCardSpecs();

			if (cardASpecs.isHero && !cardBSpecs.isHero) {
				return 1;
			} else if (!cardASpecs.isHero && cardBSpecs.isHero) {
				return -1;
			} else {
				return 0;
			}
		}

		for (var i = 0; i < cardCount; i++) {
			drawCard();
		}

		hand.cards.sort(sortCardsByPower).sort(sortCardsByHero);
	}

	function drawCard() {
		var randNum = Math.floor(Math.random() * deck.length),
		drawnCard = deck[randNum];

		removeCard(randNum, deck);
		hand.cards.push(drawnCard);
	}

	function getHand() {
		return hand;
	}

	function getField() {
		return field;
	}

	function removeCard(indexOfCard, source) {
		source.splice(indexOfCard, 1);
	}

	function refreshField() {
		field = new PlayerField({
			playerPosition: playerPosition,
			leader: leader
		});

		field.parseCards(hand.cards);
	}

	function redrawCard(selectedCard) {
		removeCard(selectedCard, hand);
		drawCard();
	}

	function playCard(cardId) {
		var card = hand.cards.filter(function (card) {
			return card.getCardSpecs().cardId === cardId;
		})[0],
		cardIndex = card && card.indexOfCard(hand.cards, card);
		if (!card) {
			return false;
		}
		card.setState('inPlay');
		refreshField();
		setListeners();
	}

	return {
		getHand: getHand,
		drawHand: drawHand,
		drawCard: drawCard,
		redrawCard: redrawCard,
		playCard: playCard,
		getField: getField,
		playerPosition: playerPosition,
		leader: leader,
		deck: deck
	};
}

function PlayerField(options) {
	// TODO: change this so that rows are objects with cards array and effects array
	var field = {
		melee: getNewRow(),
		ranged:  getNewRow(),
		siege:  getNewRow(),
		leader: options.leader,
		hand: [],
		discard: []
	},
	playerPosition = options.playerPosition;

	function getNewRow() {
		return {
			cards: [],
			effects: {
				weather: false,
				commandersHorn: false
			}
		};
	}

	function parseCards(cards) {
		clearField();

		cards.forEach(function (card) {
			var cardSpecs = card.getCardSpecs();
			switch (cardSpecs.state) {
				case ('inPlay'):
					field[cardSpecs.category].cards.push(card);
					break;
				case ('inHand'):
					field.hand.push(card);
					break;
				default:
					field.discard.push(card);
			}
		});

		fillBoard();
	}

	function clearField() {
		var playerField = $('#js_playerField' + playerPosition)[0],
			cardEls = $(playerField).find('.js_card');

		for (var i = 0; i < cardEls.length; i++) {
			cardEls[i].remove();
		}
	}

	function fillHand(hand) {
		var handEl = $('#js_playerField' + playerPosition).
			find('.js_hand')[0],
			scoreEl;
			scoreEl = $(handEl).find('.js_score')[0];

		field.hand = hand.cards;

		field.hand.forEach(function (card) {
			$(scoreEl).after(card.getCardTemplate());
		});

	}

	function fillBoard() {
		var categories = ['melee', 'ranged', 'siege'],
		categoryEl,
		handEl,
		score,
		scoreEl;

		categories.forEach(function (category) {
			score = 0;
			if (field[category].cards.length) {
				categoryEl = $('#js_playerField' + playerPosition).
					find('.js_' + category)[0];
				scoreEl = $(categoryEl).find('.js_score')[0];

				field[category].cards.forEach(function (card) {
					score += card.getCardSpecs().power;
					$(scoreEl).after(card.getCardTemplate());
				});
				$(scoreEl).html('<div>' + score + '</div>');
			}
		});
		if (field.hand.length) {
			handEl = $('#js_playerField' + playerPosition).
				find('.js_hand')[0];
			scoreEl = $(handEl).find('.js_score')[0];

			field.hand.forEach(function (card) {
				$(scoreEl).after(card.getCardTemplate());
			});

		}

	}

	function placeLeaderCard() {
		var leaderEl = document.getElementsByClassName('js_sidebarInfo_player' + playerPosition)[0].
			getElementsByClassName('js_leaderCard')[0];

		leaderEl.insertAdjacentHTML('beforeend', field.leader.getCardTemplate());


	}
	function addCard(card) {
		var cardCategory = card.getCardSpecs().category;
		field[cardCategory].cards.push(card);
	}

	function removeCard(card) {
		var cardCategory = card.getCardSpecs().category,
			cardIndex = indexOfCard(field[cardCategory].cards, card);

		field[cardCategory].cards.splice(cardIndex, 1);
		field.discard.push(card);
	}
	function getAllCards() {
		return field.melee.cards.concat(field.ranged.cards, field.siege.cards);
	}
	function removeCardsOfPowerLevel(powerLevel) {
		var cards = getAllCards(),
			selectedCards;

		selectedCard = cards.filter(function filterCardsEqualToValue(card) {
			return (card.getCardSpecs().power === powerLevel);
		}).forEach(function removeFilteredCards(card) {
			removeCard(card);
		});
	}
	function executeTurn() {
		// todo: get effects from rows
		if (effects.length) {
			effects.forEach(function (effect) {
				switch (effect) {
					case ('commandersHorn'):
						// add one to each non hero on row
						applyEnvEffectToCards({
							cards: field[card.getCardSpecs().type],
							type: specialAbility.type,
							value: true
						});
						break;
				}
			});
		}
	}

	return {
		fillHand: fillHand,
		getField: field,
		parseCards: parseCards,
		addCard: addCard,
		removeCardsOfPowerLevel: removeCardsOfPowerLevel,
		placeLeaderCard: placeLeaderCard
	};
}

function GameBoard() {
	var fields = {
			field1: null,
			field2: null
		},
		effects;

	function createGame(players) {
		fields.field1 = new PlayerField();
		fields.field2 = new PlayerField();

		players.player1.field = field1;
		players.player2.field = field2;
	}

	function executeTurn(player, card) {
		if (card.getCardSpecs().type === scorch) {
			handleScorch();
		}
		if (effects.length) {
			effects.forEach(function (effect) {
				switch (effect.type) {
					case ('frost'):
						// apply weather effect to melee units
						applyEnvEffectToCards({
							cards: field.melee,
							type: 'weather',
							value: true
						});
						break;
					case ('fog'):
						// apply weather effect to ranged units
						applyEnvEffectToCards({
							cards: field.ranged,
							type: 'weather',
							value: true
						});
						break;
					case ('rain'):
						// apply weather effect to siege units
						applyEnvEffectToCards({
							cards: field.siege,
							type: 'weather',
							value: true
						});
						break;
					case ('clear'):
						// clear any whether effects to any rows
						applyEnvEffectToCards({
							cards: field.getAllCards(),
							type: 'weather',
							value: false
						});
						break;
				}
			});
		}
		field1.executeTurn();
		field2.executeTurn();
	}
	function handleScorch() {
		var allField1Cards = field1.getAllCards(),
			allField2Cards = field2.getAllCards(),
			highestCardsField1 = findHighestCards(allField1Cards),
			highestCardsField2 = findHighestCards(allField2Cards),
			highestPowerValue = highestCardsField1 > highestCardsField2 ?
				highestCardsField1 :
				highestCardsField2;

		field1.removeCardsOfPowerLevel(highestPowerValue);
	}
	function findHighestCards(cards) {
		var highestPower = 0;

		for (var i = 0; i < cards.length; i++) {
			if (cards[i] && cards[i].power > highestPower) {
				highestCards = cards[i].power;
			}
		}

		return highestPower;
	}
	return {
		createGame: createGame,
		executeTurn: executeTurn,
		fields: fields
	};
}

function Game(options) {
	var player1 = options.player1,
		player2 = options.player2,
		gameBoard;

	function startGame() {
		gameBoard = new GameBoard.createGame({
			player1: player1,
			player2: player2
		});
	}

	return {
		startGame: startGame
	};
}

// TODO: add ids to cards
allCards = {
	northernRealms: {
		leaders: [
			{
				name: 'Foltest, King of Temeria',
				imageFront: 'Foltest-King-of-Temeria',
				specialAbility: {
					type: 'fog',
					description: 'Instantly play an Impenetrable Fog from your deck'
				}
			},
			{
				name: 'Foltest, Lord Commander Of The North',
				imageFront: 'Foltest-Commander-of-the-North',
				specialAbility: {
					type: 'clear',
					description: 'Clear all weather effects'
				}
			},
			{
				name: 'Foltest The Steel-forged',
				imageFront: 'Foltest-Steel-Forged',
				specialAbility: {
					type: 'scorch',
					areaOfEffect: 'siege',
					condition: function (player) {
						var siegeRow = player.field.siege,
							totalPower = siegeRow.cards.reduce(function (totalPower, unit) {
							return totalPower + unit.power;
						});

						if (totalPower >= 10) {
							siegeRow.cards.forEach(function (unit) {
								if (!unit.isHero) {
									player.field.removeCard(unit);
								}
							});
						}
					},
					description: 'Destroy enemy’s siege units if their combined strength is over 10'
				}
			},
			{
				name: 'Foltest The Siegemaster',
				imageFront: 'Foltest-Siegemaster',
				specialAbility: {
					type: '',
					description: 'Double the strength of your siege units if you dont already have a Commander’s Horn in the row'
				}
			}
		],
		troops: [
			{
				name: 'Philippa Eilhart',
				power: 10,
				imageFront: 'Phillipa-Eilhart',
				category: 'ranged',
				isHero: true
			},
			{
				name: 'Vernon Roche',
				power: 10,
				imageFront: 'Vernon-Roche',
				category: 'melee',
				isHero: true
			},
			{
				name: 'Esterad Thyssen',
				power: 10,
				imageFront: 'Esterad-Thyssen',
				category: 'melee',
				isHero: true
			},
			{
				name: 'John Natalis',
				power: 10,
				imageFront: 'John-Natalis',
				category: 'melee',
				isHero: true
			},
			{
				name: 'Thaler',
				power: 1,
				imageFront: 'Thaler',
				category: 'siege',
				specialAbility: {
					type: 'spy'
				}
			},
			{
				name: 'Redanian Foot Soldier',
				power: 1,
				imageFront: 'Redanian-Foot-Soldier-card',
				category: 'melee'
			},
			{
				name: 'Poor Fucking Infantry',
				power: 1,
				imageFront: 'Poor-Fucking-Infantry-card',
				category: 'melee',
				specialAbility: {
					type: 'tightBond'
				}
			},
			{
				name: 'Kaedweni Siege Expert',
				power: 1,
				imageFront: 'Kaedweni-Siege-Expert-Card',
				category: 'siege',
				specialAbility: {
					type: 'support'
				}
			},
			{
				name: 'Yarpen Zigrin',
				power: 2,
				imageFront: 'witcher-3-cards-yarpen-zigrin',
				category: 'melee'
			},
			{
				name: 'Sigismund Dijkstra',
				power: 4,
				imageFront: 'Sigismund-Dijkstra',
				category: 'melee',
				specialAbility: {
					type: 'spy'
				}
			},
			{
				name: 'Sheldon Skaggs',
				power: 4,
				imageFront: 'Sheldon-Skaggs',
				category: 'ranged'
			},
			{
				name: 'Blue Stripes Commando',
				power: 4,
				imageFront: 'witcher-3-cards-blue-stripes-commando',
				category: 'melee',
				specialAbility: {
					type: 'tightBond'
				}
			},
			{
				name: 'Sabrina Gevissig',
				power: 4,
				imageFront: 'Sabrina-Gevissig-card',
				category: 'ranged'
			},
			{
				name: 'Ves',
				power: 5,
				imageFront: 'witcher-3-cards-ves',
				category: 'melee'
			},
			{
				name: 'Siegfried of Denesle',
				power: 5,
				imageFront: 'Siegfried-of-Denesle-Card',
				category: 'melee'
			},
			{
				name: 'Prince Stennis',
				power: 5,
				imageFront: 'witcher-3-cards-prince-stennis',
				category: 'melee',
				specialAbility: {
					type: 'spy'
				}
			},
			{
				name: 'Crinfrid Reavers Dragon Hunter',
				power: 5,
				imageFront: 'Crinfrid',
				category: 'ranged',
				specialAbility: {
					type: 'tightBond'
				}
			},
			{
				name: 'Keira Metz',
				power: 5,
				imageFront: 'Keira-Metz-card',
				category: 'ranged'
			},
			{
				name: 'Dun Banner Medic',
				power: 5,
				imageFront: 'witcher-3-cards-dun-banner-medic',
				category: 'siege',
				specialAbility: {
					type: 'medic'
				}
			},
			{
				name: 'Sile de Tansarville',
				power: 5,
				imageFront: 'Sile-de-Tansarville',
				category: 'ranged'
			},
			{
				name: 'Siege Tower',
				power: 6,
				imageFront: 'Siege-Tower',
				category: 'siege'
			},
			{
				name: 'Dethmold',
				power: 6,
				imageFront: 'Dethmold',
				category: 'ranged'
			},
			{
				name: 'Trebuchet',
				power: 6,
				imageFront: 'witcher-3-cards-trebuchet',
				category: 'siege'
			},
			{
				name: 'Ballista',
				power: 6,
				imageFront: 'Ballista-Card',
				category: 'siege'
			},
			{
				name: 'Catapult',
				power: 8,
				imageFront: 'Catapult',
				category: 'siege',
				specialAbility: {
					type: 'tightBond'
				}
			}
		]
	},
	nilfgaardian: {
		leaders: [],
		troops: [
			{
				name: 'Tibor Eggebracht',
				power: 10,
				category: 'ranged',
				isHero: true,
				imageFront: 'tibor_eggebracht_card'
			},
			{
				name: 'Letho of Gulet',
				power: 10,
				category: 'melee',
				isHero: true,
				imageFront: 'letho_of_gulet_card'
			},
			{
				name: 'Morvran Voorhis',
				power: 10,
				category: 'siege',
				isHero: true,
				imageFront: 'morvran_voorhis_card'
			},
			{
				name: 'Menno Coehoorn',
				power: 10,
				category: 'melee',
				isHero: true,
				specialAbility: {
					type: 'medic'
				},
				imageFront: 'menno_coehoorn_card'
			},
			{
				name: 'Siege Technician',
				power: 0,
				category: 'siege',
				specialAbility: {
					type: 'medic'
				},
				imageFront: 'siege_technician_card'
			},
			{
				name: 'Etolian Auxiliary Archers',
				power: 1,
				category: 'ranged',
				specialAbility: {
					type: 'medic'
				},
				imageFront: 'etolian_auxiliary_archers_card'
			},
			{
				name: 'Albrich',
				power: 2,
				category: 'ranged',
				imageFront: 'albrich_card'
			},
			{
				name: 'Sweers',
				power: 2,
				category: 'ranged',
				imageFront: 'sweers_card'
			},
			{
				name: 'Nausicaa Cavalry Rider',
				power: 2,
				category: 'melee',
				specialAbility: {
					type: 'tightBond'
				},
				imageFront: 'nausicaa_cavalry_rider_card'
			},
			{
				name: 'Vreemde',
				power: 2,
				category: 'melee',
				imageFront: 'vreemde_card'
			},
			{
				name: 'Rotten Mangonel',
				power: 3,
				category: 'siege',
				imageFront: 'rotten_mangonel_card'
			},
			{
				name: 'Puttkammer',
				power: 3,
				category: 'ranged',
				imageFront: 'puttkammer_card'
			},
			{
				name: 'Impera Brigade Guard',
				power: 3,
				category: 'melee',
				specialAbility: {
					type: 'tightBond'
				},
				imageFront: 'impera_brigade_guard_card'
			},
			{
				name: 'Vanhemar',
				power: 4,
				category: 'ranged',
				imageFront: 'vanhemar_card'
			},
			{
				name: 'Vattier de Rideaux',
				power: 4,
				category: 'melee',
				specialAbility: {
					type: 'spy'
				},
				imageFront: 'vattier_de_rideaux_card'
			},
			{
				name: 'Rainfarn',
				power: 4,
				category: 'melee',
				imageFront: 'rainfarn_card'
			},
			{
				name: 'Cynthia',
				power: 4,
				category: 'ranged',
				imageFront: 'cynthia_card'
			},
			{
				name: 'Zerrikanian Fire Scorpion',
				power: 5,
				category: 'siege',
				imageFront: 'zerrikaninan_fire_scorpion_card'
			},
			{
				name: 'Young Emmisary',
				power: 5,
				category: 'melee',
				specialAbility: {
					type: 'tightBond'
				},
				imageFront: 'young_emissary_card'
			},
			{
				name: 'Renuald Aep Matsen',
				power: 5,
				category: 'ranged',
				imageFront: 'renuald_aep_matsen_card'
			},
			{
				name: 'Siege Engineer',
				power: 6,
				category: 'siege',
				imageFront: 'siege_engineer_card'
			},
			{
				name: 'Cahir Mawr Dyffryn aep Ceallach',
				power: 6,
				category: 'melee',
				imageFront: 'cahir_mawr_dyffryn_aep_ceallach_card'
			},
			{
				name: 'Fringilla Vigo',
				power: 6,
				category: 'ranged',
				imageFront: 'fringilla_vigo_card'
			},
			{
				name: 'Assire var Anahid',
				power: 6,
				category: 'ranged',
				imageFront: 'assire_var_anahid_card'
			},
			{
				name: 'Shilard Fitz-Oesterlen',
				power: 7,
				category: 'melee',
				specialAbility: {
					type: 'spy'
				},
				imageFront: 'shilard_fitz_oesterlen_card'
			},
			{
				name: 'Stefan Skellen',
				power: 9,
				category: 'melee',
				specialAbility: {
					type: 'spy'
				},
				imageFront: 'stefan_skellen_card'
			},
			{
				name: 'Heavy Zerrikanian Fire Scorpion',
				power: 10,
				category: 'siege',
				imageFront: 'heavy_zerrikaninan_fire_scorpion_card'
			},
			{
				name: 'Black Infantry Archer',
				power: 10,
				category: 'ranged',
				imageFront: 'black_infantry_archer_card'
			}
		]
	},
	monsters: [],
	scoiatel: [],
	generic: []
};
urlRoot = 'http://thewitcher3.wiki.fextralife.com/file/view/';

setTimeout(function () {
	var player = new Player({
		deck: allCards.northernRealms.troops,
		leader: allCards.northernRealms.leaders[1],
		playerPosition: 1
	}),
	player2 = new Player({
		deck: allCards.nilfgaardian.troops,
		leader: allCards.northernRealms.leaders[0],
		playerPosition: 2
	});

	player.drawHand();

	player.getField().fillHand(player.getHand());
	player.getField().placeLeaderCard(player.leader);

	player2.drawHand();

	player2.getField().fillHand(player2.getHand());
	player2.getField().placeLeaderCard(player2.leader);
	setListeners = function setListeners() {
		$('.js_card').off();
		$('.js_card').click(function (event) {
			var $playerField = $(event.currentTarget).closest('.playerField')[0],
				playerPosition = $playerField && parseInt($playerField.id.split('js_playerField')[1], 10);
			if (playerPosition === 1) {
				player.playCard(event.currentTarget.id);
			} else {
				player2.playCard(event.currentTarget.id);
			}
		});
	};
	setListeners();
}, 1000);
