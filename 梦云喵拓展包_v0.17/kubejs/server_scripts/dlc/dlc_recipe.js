ServerEvents.recipes(event => {
	event.shapeless(Item.of('kubejs:neidan', 1), ['kubejs:sunbird_crystals']);
	event.shapeless(Item.of('kubejs:sunbird_crystals', 1), ['kubejs:neidan']);
	/*

	let moonlight_staff = Item.of('kubejs:moonlight_staff')
	moonlight_staff.nbt.ISB_Spells.maxSpells = 8;
	event.shaped(moonlight_staff, [
		' C ',
	], {
		C: 'minecraft:diamond'
	});
	*/

	event.shaped("kubejs:dantian_up", [
		' C ',
		'ABA',
		' A '
	], {
		A: 'kubejs:diamond_bottle',
		B: 'biomancy:living_flesh',
		C: 'kubejs:parasitic_elf'
	});

	event.shaped("kubejs:dantian_down", [
		' C ',
		'ABA',
		' A '
	], {
		A: 'kubejs:diamond_bottle',
		B: 'biomancy:living_flesh',
		C: 'kubejs:immortal_volcanic_rock'
	});

	event.shaped("kubejs:dantian_middle", [
		' C ',
		'ABA',
		' A '
	], {
		A: 'kubejs:diamond_bottle',
		B: 'biomancy:living_flesh',
		C: 'kubejs:flower_heart'
	});

	event.shaped("kubejs:sculk_lamp", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'kubejs:sculk_soul',
		B: 'minecraft:music_disc_5'
	});

	event.shaped("kubejs:spirits_bone", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'kubejs:magic_spine',
		B: 'kubejs:sand_bone'
	});

	event.shaped("kubejs:pigment_bubble", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'kubejs:carry_crayon',
		B: 'chestcavity:gas_bladder'
	});

	event.shaped("kubejs:the_preservation_of_civilization", [
		' A ',
		'CBC',
		'EDE'
	], {
		A: 'kubejs:broken_prismarine_crown',
		B: 'minecraft:crying_obsidian',
		C: 'minecraft:netherite_ingot',
		D: 'irons_spellbooks:tarnished_helmet',
		E: 'minecraft:ghast_tear'
	});

	event.shaped("kubejs:gold_cup", [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: 'minecraft:gold_block',
		B: 'minecraft:netherite_ingot'
	});

	event.shaped("kubejs:disaster_source", [
		'DEF'
	], {
		D:'art_of_forging:demonic_axe',
		E:'art_of_forging:demonic_blade',
		F:'art_of_forging:demonic_flail'
	});

	event.shaped("kubejs:yuanshen", [
		'DED'
	], {
		D:'kubejs:weird_paperman',
		E:'kubejs:doppelganger'
	});

    event.recipes.create.sequenced_assembly([
		Item.of('kubejs:maple_syrup')
	], 'kubejs:relic_metal_plate', [
		event.recipes.createDeploying('kubejs:relic_metal_plate', ['kubejs:relic_metal_plate', 'kubejs:relic_metal_plate']),
		event.recipes.create.filling('kubejs:relic_metal_plate', ['kubejs:relic_metal_plate', Fluid.of('kubejs:syrup').withAmount(500)])
	]).transitionalItem('kubejs:half_syrup').loops(1)

    event.recipes.create.sequenced_assembly([
		Item.of('kubejs:jelly_muscle')
	], 'kubejs:mini_slime', [
		event.recipes.create.filling('kubejs:mini_slime', ['kubejs:mini_slime', Fluid.of('kubejs:syrup').withAmount(500)])
	]).transitionalItem('kubejs:half_jelly').loops(3)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:candy_lung')
	], 'kubejs:lung_template', [
		event.recipes.createCutting('kubejs:half_lung', 'kubejs:half_lung'),
		event.recipes.createDeploying('kubejs:half_lung', ['kubejs:half_lung', 'biomancy:living_flesh']),
		event.recipes.createDeploying('kubejs:half_lung', ['kubejs:half_lung', '#forge:dyes/pink']),
		event.recipes.create.filling('kubejs:half_lung', ['kubejs:half_lung', Fluid.of('kubejs:syrup').withAmount(500)])
	]).transitionalItem('kubejs:half_lung').loops(5)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:ginger_man_totem')
	], 'extradelight:gingerbread_steve', [
		event.recipes.createCutting('kubejs:half_ginger_man', 'kubejs:half_ginger_man'),
		event.recipes.createDeploying('kubejs:half_ginger_man', ['kubejs:half_ginger_man', 'minecraft:cookie']),
		event.recipes.createDeploying('kubejs:half_ginger_man', ['kubejs:half_ginger_man', 'extradelight:ginger_tea']),
	]).transitionalItem('kubejs:half_ginger_man').loops(5)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:candy_rib')
	], 'kubejs:rib_template', [
		event.recipes.create.filling('kubejs:half_rib', ['kubejs:half_rib', Fluid.of('kubejs:syrup').withAmount(500)])
	]).transitionalItem('kubejs:half_rib').loops(5)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:candy_kidney')
	], 'kubejs:kidney_template', [
		event.recipes.createDeploying('kubejs:half_kidney', ['kubejs:half_kidney', 'irons_spellbooks:greater_oakskin_elixir']),
		event.recipes.createCutting('kubejs:half_kidney', 'kubejs:half_kidney'),
		event.recipes.createDeploying('kubejs:half_kidney', ['kubejs:half_kidney', 'minecraft:sugar']),
		event.recipes.createDeploying('kubejs:half_kidney', ['kubejs:half_kidney', 'minecraft:redstone']),
		event.recipes.create.filling('kubejs:half_kidney', ['kubejs:half_kidney', Fluid.of('kubejs:syrup').withAmount(500)])
	]).transitionalItem('kubejs:half_kidney').loops(5)

	event.recipes.create.mechanical_crafting('kubejs:sculk_core', [
		' A  ',
		'EFGH',
		'IJKL',
		'MOPQ',
		' U  '
	], {
		A: 'minecraft:music_disc_5',
		E: 'minecraft:music_disc_13',
		F: 'minecraft:music_disc_cat',
		G: 'minecraft:music_disc_blocks',
		H: 'minecraft:music_disc_chirp',
		I: 'minecraft:music_disc_far',
		J: 'kubejs:warden_core',
		K: 'minecraft:music_disc_mall',
		L: 'minecraft:music_disc_mellohi',
		M: 'minecraft:music_disc_stal',
		O: 'minecraft:music_disc_strad',
		P: 'minecraft:music_disc_ward',
		Q: 'minecraft:music_disc_11',
		U: 'minecraft:music_disc_wait'
	})

	event.recipes.create.mechanical_crafting('kubejs:sculk_eye', [
		'A   A',
		'EEEDD',
		'CBDDD',
		'EEEDD',
		'A   A'
	], {
		A: 'kubejs:warden_rib',
		B: 'kubejs:warden_core',
		C: 'kubejs:sculk_soul',
		D: 'kubejs:warden_muscle',
		E: 'kubejs:sculk_pieces'
	})

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:recycle_system')
	], 'art_of_forging:forged_steel_ingot', [
		event.recipes.createDeploying('kubejs:half_recycle_system', ['kubejs:half_recycle_system', 'create:mechanical_saw']),
		event.recipes.createDeploying('kubejs:half_recycle_system', ['kubejs:half_recycle_system', 'create:crushing_wheel']),
		event.recipes.createDeploying('kubejs:half_recycle_system', ['kubejs:half_recycle_system', 'create:precision_mechanism']),
		event.recipes.createPressing('kubejs:half_recycle_system', 'kubejs:half_recycle_system')
	]).transitionalItem('kubejs:half_recycle_system').loops(3)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:temperature_controller').withChance(50.0),
		Item.of('chestcavity:iron_scrap').withChance(50.0)
	], 'art_of_forging:forged_steel_ingot', [
		event.recipes.createDeploying('kubejs:half_temperature_controller', ['kubejs:half_temperature_controller', 'create:precision_mechanism']),
		event.recipes.createDeploying('kubejs:half_temperature_controller', ['kubejs:half_temperature_controller', 'create:fluid_tank']),
		event.recipes.create.filling('kubejs:half_temperature_controller', ['kubejs:half_temperature_controller', Fluid.of('minecraft:lava').withAmount(1000)]),
		event.recipes.createDeploying('kubejs:half_temperature_controller', ['kubejs:half_temperature_controller', 'create:fluid_tank']),
		event.recipes.create.filling('kubejs:half_temperature_controller', ['kubejs:half_temperature_controller', Fluid.of('minecraft:water').withAmount(1000)]),
		event.recipes.createPressing('kubejs:half_temperature_controller', 'kubejs:half_temperature_controller')
	]).transitionalItem('kubejs:half_temperature_controller').loops(3)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:carry_crayon')
	], 'minecraft:yellow_candle', [
		event.recipes.createCutting('minecraft:yellow_candle', 'minecraft:yellow_candle'),
		event.recipes.createDeploying('minecraft:yellow_candle', ['minecraft:yellow_candle', 'irons_spellbooks:arcane_essence']),
		event.recipes.createDeploying('minecraft:yellow_candle', ['minecraft:yellow_candle', 'minecraft:paper']),
	]).transitionalItem('minecraft:yellow_candle').loops(3)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:machine_core').withChance(20.0),
		Item.of('chestcavity:iron_scrap').withChance(80.0)
	], 'art_of_forging:forged_steel_ingot', [
		event.recipes.createDeploying('kubejs:half_machine_core', ['kubejs:half_machine_core', 'minecraft:clock']),
		event.recipes.createDeploying('kubejs:half_machine_core', ['kubejs:half_machine_core', 'minecraft:nether_star']),
		event.recipes.createDeploying('kubejs:half_machine_core', ['kubejs:half_machine_core', 'create:precision_mechanism']),
		event.recipes.createDeploying('kubejs:half_machine_core', ['kubejs:half_machine_core', 'art_of_forging:enigmatic_construct']),
		event.recipes.createPressing('kubejs:half_machine_core', 'kubejs:half_machine_core')
	]).transitionalItem('kubejs:half_machine_core').loops(2)

	//
	//event.replaceInput({},'minecraft:paper','#kubejs:paper');
	//Utils.server.players.tell(`${Items.PAPER}`)
});