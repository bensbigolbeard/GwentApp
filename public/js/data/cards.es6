
// TODO: add ids to cards
const allCards = {
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
	monsters: {
		leaders: [],
		troops: []
	},
	scoiatel: {
		leaders: [],
		troops: []
	},
	generic: {
		leaders: [],
		troops: []
	}
};

export { allCards };
