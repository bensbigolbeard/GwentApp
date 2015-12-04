
// TODO: add ids to cards
const allCards = {
	northernRealms: [
		{
			name: 'Foltest, King of Temeria',
			isLeader: true,
			imageFront: 'foltest_king_of_temeria_card',
			specialAbility: {
				type: 'fog',
				description: 'Instantly play an Impenetrable Fog from your deck'
			}
		},
		{
			name: 'Foltest, Lord Commander Of The North',
			isLeader: true,
			imageFront: 'foltest_commander_of_the_north_card',
			specialAbility: {
				type: 'clear',
				description: 'Clear all weather effects'
			}
		},
		{
			name: 'Foltest The Steel-forged',
			isLeader: true,
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
			isLeader: true,
			imageFront: 'foltest_siegemaster_card',
			specialAbility: {
				type: '',
				description: 'Double the strength of your siege units if you dont already have a Commander’s Horn in the row'
			}
		},
		{
			name: 'Philippa Eilhart',
			power: 10,
			imageFront: 'philippa_eilhart_card',
			category: 'ranged',
			isHero: true
		},
		{
			name: 'Vernon Roche',
			power: 10,
			imageFront: 'vernon_roche_card',
			category: 'melee',
			isHero: true
		},
		{
			name: 'Esterad Thyssen',
			power: 10,
			imageFront: 'esterad_thyssen_card',
			category: 'melee',
			isHero: true
		},
		{
			name: 'John Natalis',
			power: 10,
			imageFront: 'john_natalis_card',
			category: 'melee',
			isHero: true
		},
		{
			name: 'Thaler',
			power: 1,
			imageFront: 'thaler_card',
			category: 'siege',
			specialAbility: {
				type: 'spy'
			}
		},
		{
			name: 'Redanian Foot Soldier',
			power: 1,
			imageFront: 'redanian_foot_soldier_card',
			category: 'melee'
		},
		{
			name: 'Poor Fucking Infantry',
			power: 1,
			imageFront: 'poor_fucking_infantry_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Poor Fucking Infantry',
			power: 1,
			imageFront: 'poor_fucking_infantry_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Poor Fucking Infantry',
			power: 1,
			imageFront: 'poor_fucking_infantry_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Kaedweni Siege Expert',
			power: 1,
			imageFront: 'kaedweni_siege_expert_card',
			category: 'siege',
			specialAbility: {
				type: 'support'
			}
		},
		{
			name: 'Kaedweni Siege Expert',
			power: 1,
			imageFront: 'kaedweni_siege_expert2_card',
			category: 'siege',
			specialAbility: {
				type: 'support'
			}
		},
		{
			name: 'Kaedweni Siege Expert',
			power: 1,
			imageFront: 'kaedweni_siege_expert3_card',
			category: 'siege',
			specialAbility: {
				type: 'support'
			}
		},
		{
			name: 'Yarpen Zigrin',
			power: 2,
			imageFront: 'yarpen_zigrin_card',
			category: 'melee'
		},
		{
			name: 'Sigismund Dijkstra',
			power: 4,
			imageFront: 'sigismund_dijkstra_card',
			category: 'melee',
			specialAbility: {
				type: 'spy'
			}
		},
		{
			name: 'Sheldon Skaggs',
			power: 4,
			imageFront: 'sheldon_skaggs_card',
			category: 'ranged'
		},
		{
			name: 'Blue Stripes Commando',
			power: 4,
			imageFront: 'blue_stripes_commando_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Blue Stripes Commando',
			power: 4,
			imageFront: 'blue_stripes_commando_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Blue Stripes Commando',
			power: 4,
			imageFront: 'blue_stripes_commando_card',
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Sabrina Glevissig',
			power: 4,
			imageFront: 'sabrina_glevissig_card',
			category: 'ranged'
		},
		{
			name: 'Ves',
			power: 5,
			imageFront: 'ves_card',
			category: 'melee'
		},
		{
			name: 'Siegfried of Denesle',
			power: 5,
			imageFront: 'siegfried_of_denesle_card',
			category: 'melee'
		},
		{
			name: 'Prince Stennis',
			power: 5,
			imageFront: 'prince_stennis_card',
			category: 'melee',
			specialAbility: {
				type: 'spy'
			}
		},
		{
			name: 'Crinfrid Reavers Dragon Hunter',
			power: 5,
			imageFront: 'crinfrid_reavers_dragon_hunter_card',
			category: 'ranged',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Crinfrid Reavers Dragon Hunter',
			power: 5,
			imageFront: 'crinfrid_reavers_dragon_hunter_card',
			category: 'ranged',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Crinfrid Reavers Dragon Hunter',
			power: 5,
			imageFront: 'crinfrid_reavers_dragon_hunter_card',
			category: 'ranged',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Keira Metz',
			power: 5,
			imageFront: 'keira_metz_card',
			category: 'ranged'
		},
		{
			name: 'Dun Banner Medic',
			power: 5,
			imageFront: 'dun_banner_medic_card',
			category: 'siege',
			specialAbility: {
				type: 'medic'
			}
		},
		{
			name: 'Sile de Tansarville',
			power: 5,
			imageFront: 'sile_de_tansarville_card',
			category: 'ranged'
		},
		{
			name: 'Siege Tower',
			power: 6,
			imageFront: 'siege_tower_card',
			category: 'siege'
		},
		{
			name: 'Dethmold',
			power: 6,
			imageFront: 'dethmold_card',
			category: 'ranged'
		},
		{
			name: 'Trebuchet',
			power: 6,
			imageFront: 'trebuchet_card',
			category: 'siege'
		},
		{
			name: 'Trebuchet',
			power: 6,
			imageFront: 'trebuchet2_card',
			category: 'siege'
		},
		{
			name: 'Ballista',
			power: 6,
			imageFront: 'ballista_card',
			category: 'siege'
		},
		{
			name: 'Catapult',
			power: 8,
			imageFront: 'catapult_card',
			category: 'siege',
			specialAbility: {
				type: 'tightBond'
			}
		},
		{
			name: 'Catapult',
			power: 8,
			imageFront: 'catapult_card',
			category: 'siege',
			specialAbility: {
				type: 'tightBond'
			}
		}
	],
	nilfgaardian: [
		{
			name: 'Foltest, King of Temeria',
			isLeader: true,
			imageFront: 'foltest_king_of_temeria_card',
			specialAbility: {
				type: 'fog',
				description: 'Instantly play an Impenetrable Fog from your deck'
			}
		},
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
			imageFront: 'Etolian_Auxiliary_Archers_card'
		},
		{
			name: 'Etolian Auxiliary Archers',
			power: 1,
			category: 'ranged',
			specialAbility: {
				type: 'medic'
			},
			imageFront: 'Etolian_Auxiliary_Archers2_card'
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
			name: 'Nausicaa Cavalry Rider',
			power: 2,
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			},
			imageFront: 'nausicaa_cavalry_rider_card'
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
			name: 'Impera Brigade Guard',
			power: 3,
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			},
			imageFront: 'impera_brigade_guard_card'
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
			imageFront: 'zerrikanian_fire_scorpion_card'
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
			name: 'Young Emmisary',
			power: 5,
			category: 'melee',
			specialAbility: {
				type: 'tightBond'
			},
			imageFront: 'young_emissary2_card'
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
			imageFront: 'cahir_mawr_dyffryn_aep_ceallach'
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
		//{
		//	name: 'Shilard Fitz-Oesterlen',
		//	power: 7,
		//	category: 'melee',
		//	specialAbility: {
		//		type: 'spy'
		//	},
		//	imageFront: 'shilard_fitz_oesterlen_card'
		//},
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
			imageFront: 'heavy_zerrikanian_fire_scorpion_card'
		},
		{
			name: 'Black Infantry Archer',
			power: 10,
			category: 'ranged',
			imageFront: 'black_infantry_archer_card'
		},
		{
			name: 'Black Infantry Archer',
			power: 10,
			category: 'ranged',
			imageFront: 'black_infantry_archer2_card'
		}
	],
	monsters: [],
	scoiatael: [],
	neutral: [
		{
			name: 'Biting Frost',
			power: 0,
			category: 'weather',
			areaOfEffect: 'melee',
			imageFront: 'biting_frost_card',
			specialAbility: {
				type: 'frost'
			}
		},
		{
			name: 'Impenetrable Fog',
			power: 0,
			category: 'weather',
			areaOfEffect: 'ranged',
			imageFront: 'impenetrable_fog_card',
			specialAbility: {
				type: 'fog'
			}
		},
		{
			name: 'Torrential Rain',
			power: 0,
			category: 'weather',
			areaOfEffect: 'siege',
			imageFront: 'torrential_rain_card',
			specialAbility: {
				type: 'rain'
			}
		},
		{
			name: 'Clear Weather',
			power: 0,
			category: 'weather',
			areaOfEffect: 'all',
			imageFront: 'clear_weather_card',
			specialAbility: {
				type: 'clear'
			}
		},
		{
			name: 'Commander’s Horn',
			power: 0,
			category: null,
			imageFront: 'commanders_horn_card',
			specialAbility: {
				type: 'horn'
			}
		},
		{
			name: 'Decoy',
			power: 0,
			category: null,
			imageFront: 'decoy_card',
			specialAbility: {
				type: 'decoy'
			}
		},
		{
			name: 'Scorch',
			power: 0,
			category: null,
			areaOfEffect: 'all',
			imageFront: 'scorch_card',
			specialAbility: {
				type: 'scorch'
			}
		},
		{
			name: 'Yennefer of Vengerberg',
			isHero: true,
			power: 7,
			category: 'ranged',
			imageFront: 'yennefer_of_vengerberg_card',
			specialAbility: {
				type: 'medic'
			}
		},
		{
			name: 'Mysterious Elf',
			isHero: true,
			power: 0,
			category: 'melee',
			imageFront: 'avallach_card',
			specialAbility: {
				type: 'spy'
			}
		},
		{
			name: 'Dandelion',
			power: 2,
			category: 'melee',
			imageFront: 'dandelion_card',
			specialAbility: {
				type: 'horn'
			}
		},
		{
			name: 'Zoltan Chivay',
			power: 5,
			category: 'melee',
			imageFront: 'zoltan_chivay_card'
		},
		{
			name: 'Vesemir',
			power: 6,
			category: 'melee',
			imageFront: 'vesemir'
		},
		{
			name: 'Triss Merigold',
			isHero: true,
			power: 7,
			category: 'melee',
			imageFront: 'triss_merigold_card'
		},
		{
			name: 'Villentretenmerth',
			power: 7,
			category: 'melee',
			imageFront: 'villentretenmerth_card',
			specialAbility: {
				type: 'scorch_melee'
			}
		},
		{
			name: 'Cirilla Fiona Elen Riannon',
			isHero: true,
			power: 15,
			category: 'melee',
			imageFront: 'cirilla_fiona_elen_riannon_card'
		},
		{
			name: 'Geralt of Rivia',
			isHero: true,
			power: 15,
			category: 'melee',
			imageFront: 'geralt_of_rivia_card'
		}
	]
};

export { allCards };
