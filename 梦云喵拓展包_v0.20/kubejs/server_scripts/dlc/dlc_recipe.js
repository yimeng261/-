
ServerEvents.recipes(event => {

	event.shaped(Item.of('kubejs:lightning_planks',4), ['kubejs:lightning_wood']);

	event.shaped(Item.of('kubejs:moonlight_staff', '{Damage:0,ISB_Spells:{maxSpells:8,mustEquip:0b,spellWheel:1b}}'), [
		' BA',
		' CB',
		'C  '
	], {
		A: 'lightmanscurrency:coin_netherite',
		B: 'minecraft:diamond',
		C: 'minecraft:gold_ingot'
	});

	event.replaceInput({},'irons_spellbooks:hogskin','#kubejs:hogskin')
	event.replaceInput({},'cold_sweat:hoglin_hide','#kubejs:hogskin')

	event.shapeless('kubejs:void_engine',['minecraft:elytra', 'minecraft:ender_pearl', 'bygonenether:warped_ender_pearl', 'bosses_of_mass_destruction:charged_ender_pearl', 'art_of_forging:heart_of_ender']);
	event.shapeless('kubejs:chaos_tumor',['#kubejs:organ','kubejs:chaos_tumor'])
		.modifyResult((grid,itemStack) => {
			let tumor = grid.find(Item.of("kubejs:chaos_tumor")).copy();
			let organ;
			let player=grid.getPlayer();
			grid.findAll(Ingredient.of('#kubejs:organ')).forEach(item=>{
				if(item!='kubejs:chaos_tumor'){
					organ=item;
				}
			});
			if(organ.hasTag('kubejs:cultivate')) return null;

			if(!tumor.hasNBT()){
				tumor.nbt={};
				tumor.nbt.put('organData',{});
				tumor.nbt.put('devouredOrgans',[]);
			}

			if(tumor.nbt.devouredOrgans.length==3){
				return null;
			}

			if (!organ.hasNBT()){
				global.ORGAN_LIST.forEach(org=>{
					if(org.itemID==organ){
						org.organScores.forEach(t=>{
							if(tumor.nbt.organData.get(t.id)!=undefined){
								tumor.nbt.organData[t.id]+=t.value
							}else{
								tumor.nbt.organData.put(t.id, t.value)
							}
						})
					}
				})
			}

			tumor.nbt.devouredOrgans.push(organ.id)
			return tumor;
	})

	event.shapeless('kubejs:mimetic_gland',['kubejs:spider_gland','irons_spellbooks:invisibility_elixir', Item.of('minecraft:potion', '{Potion:"minecraft:long_invisibility"}').weakNBT()])

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

	event.shaped('kubejs:chaos_tumor', [
		' A ',
		'DBC',
		' E '
	], {
		A: 'kubejs:rune_kidney',
		B: 'kubejs:random_tumor',
		C: 'kubejs:chance_tedons',
		D: 'kubejs:abyss_gaze',
		E: 'kubejs:entropy_stomach'
	});

	event.shaped("kubejs:abyss_gaze", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'cataclysm:witherite_ingot',
		B: 'nameless_trinkets:dragons_eye'
	});

	event.shaped("kubejs:chance_tedons", [
		' A ',
		'ABA',
		' A '
	], {
		A: Item.of('irons_spellbooks:scroll', '{ISB_Spells:{data:[{id:"irons_spellbooks:teleport",index:0,locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}').weakNBT(),
		B: 'kubejs:muscle_diamond'
	});

	event.shaped('kubejs:luminescent_sac_gland', [
		'CAC',
		'ABA',
		'CAC'
	], {
		A: 'biomancy:bio_lumens',
		B: Item.of('irons_spellbooks:scroll', '{ISB_Spells:{data:[{id:"irons_spellbooks:firefly_swarm",index:0,locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}').weakNBT(),
		C: 'minecraft:glow_ink_sac'
	});

	event.shaped('kubejs:blaze_nucleus', [
		'CAC',
		'ABA',
		'CAC'
	], {
		A: 'chestcavity:blaze_shell',
		B: 'chestcavity:blaze_core',
		C: 'chestcavity:active_blaze_rod'
	});


	event.shaped("kubejs:spirits_bone", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'kubejs:magic_spine',
		B: 'kubejs:sand_bone'
	});

	event.shaped('kubejs:lava_core', [
		' A ',
		'ABA',
		' A '
	], {
		A: 'minecraft:furnace',
		B: 'kubejs:blaze_nucleus'
	});

	event.shaped("kubejs:pigment_bubble", [
		' A ',
		'ABA',
		' A '
	], {
		A: 'kubejs:carry_crayon',
		B: 'chestcavity:gas_bladder'
	});

	event.shaped('kubejs:wither_spine_claw', [
		' A ',
		'CBC',
		' D '
	], {
		A: 'minecraft:wither_skeleton_skull',
		B: 'minecraft:nether_star',
		C: 'chestcavity:withered_rib',
		D: 'chestcavity:withered_spine'
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
	
	event.shaped('kubejs:rune_kidney', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: '#irons_spellbooks:inscribed_rune',
		B: 'kubejs:kidney_diamond'
	});

	event.shaped("kubejs:nano_repair_core", [
		'ACA',
		'ABA',
		'AAA'
	], {
		A: 'art_of_forging:nano_insectoid',
		B: 'art_of_forging:potent_mixture',
		C: 'nameless_trinkets:reforger'
	});
	
	event.shaped('kubejs:star_gallblader', [
		'ACA',
		'ABA',
		'AAA'
	], {
		A: 'kubejs:dark_stardust_fragment',
		B: 'kubejs:fossil_gallbladder',
		C: 'minecraft:nether_star'
	});

	
	event.shaped('kubejs:star_spleen', [
		'ACA',
		'ABA',
		'AAA'
	], {
		A: 'kubejs:dark_stardust_fragment',
		B: 'kubejs:spleen_diamond',
		C: 'minecraft:nether_star'
	});

	event.shaped("kubejs:disaster_source", [
		'DEF'
	], {
		D:'art_of_forging:demonic_axe',
		E:'art_of_forging:demonic_blade',
		F:'art_of_forging:demonic_flail'
	});

	event.shaped('kubejs:tree_heart_template',[
		['unusualprehistory:foxii_sapling', 'unusualprehistory:ginkgo_sapling', 'unusualprehistory:dryo_sapling'], 
		['twilightforest:time_sapling', 'twilightforest:transformation_sapling', 'twilightforest:mining_sapling'], 
		['hexerei:mahogany_sapling', 'hexerei:willow_sapling', 'hexerei:witch_hazel_sapling']
	]);

	event.shapeless('kubejs:tree_leaf',['unusualprehistory:foxxi_leaves', 'unusualprehistory:ginkgo_leaves', 'unusualprehistory:dryo_leaves'])


	event.smithing(Item.of('kubejs:bamboo_slip').withNBT('damage:100'), 'kubejs:blank_bamboo_slip', 'kubejs:lightning_planks')

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
		event.recipes.createDeploying('kubejs:half_machine_core', ['kubejs:half_machine_core', 'art_of_forging:enigmatic_letruct']),
		event.recipes.createPressing('kubejs:half_machine_core', 'kubejs:half_machine_core')
	]).transitionalItem('kubejs:half_machine_core').loops(2)

	event.recipes.create.sequenced_assembly([
		Item.of('kubejs:jade_eye')
	], 'alexsmobs:void_worm_eye', [
		event.recipes.createDeploying('alexsmobs:void_worm_eye', ['kubejs:half_machine_core', 'meetyourfight:spectres_eye']),
		event.recipes.createDeploying('alexsmobs:void_worm_eye', ['kubejs:half_machine_core', 'goety:jade']),
		event.recipes.createDeploying('alexsmobs:void_worm_eye', ['kubejs:half_machine_core', 'kubejs:lightning_dragon_bead']),
		event.recipes.createDeploying('alexsmobs:void_worm_eye', ['kubejs:half_machine_core', 'kubejs:fire_dragon_bead']),
		event.recipes.createDeploying('alexsmobs:void_worm_eye', ['kubejs:half_machine_core', 'kubejs:ice_dragon_bead']),
	]).transitionalItem('alexsmobs:void_worm_eye').loops(3)

	//
	//event.replaceInput({},'minecraft:paper','#kubejs:paper');
	//Utils.server.players.tell(`${Items.PAPER}`)
});
