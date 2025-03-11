ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar('kubejs:ritual_catalyst')
        .id('kubejs:sunbird_summon')
        .mobOutput(
            SummoningOutput.mob('alexsmobs:sunbird')
                .count(1)
                .offset(0, 3, 0)
                .spread(3, 0, 3)
                .data({ Health: 80, Attributes: [{ Name: 'generic.max_health', Base: 80 }] })
        )
        .input('64x minecraft:gold_block')
        .input('64x minecraft:glowstone_dust')
        .input('8x minecraft:chicken')
        .recipeTime(200);

    event.recipes.summoningrituals
        .altar('kubejs:dark_stardust_fragment')
        .id('kubejs:neidan_recipe')
        .itemOutput('kubejs:neidan')
        .inputs([
            'iceandfire:fire_dragon_blood', 
            'iceandfire:lightning_dragon_blood', 
            'iceandfire:ice_dragon_blood',
            '2x tetra:dragon_sinew', 
            'kubejs:sunbird_crystals', 
            'minecraft:heart_of_the_sea', 
            'minecraft:nether_star', 
            '4x irons_spellbooks:lightning_bottle', 
            'minecraft:dragon_breath', 
            '8x twilightforest:naga_scale'
        ])

    event.recipes.summoningrituals
        .altar('kubejs:neidan')
        .itemOutput('kubejs:yuanshen')
        .id('kubejs:yuanshen_recipe')
        .inputs([
            '64x minecraft:soul_sand', 
            '8x minecraft:ghast_tear', 
            '2x art_of_forging:dragon_soul', 
            '2x art_of_forging:soul_ember', 
            '4x bosses_of_mass_destruction:ancient_anima', 
            '4x alexsmobs:soul_heart', 
            '2x kubejs:weird_paperman', 
            'kubejs:doppelganger'
        ])

    event.recipes.summoningrituals
        .altar('kubejs:dark_stardust_fragment')
        .itemOutput('kubejs:entropy_stomach')
        .id('kubejs:entropy_stomach_recipe')
        .inputs([
            'kubejs:candy_stomach', 
            'kubejs:void_worm_stomach', 
            'kubejs:king_of_stomach', 
            'kubejs:dragon_blood_stomach', 
            'kubejs:fantasy_stomach', 
            'kubejs:chameleon_stomach'
        ])

    event.recipes.summoningrituals
        .altar('kubejs:nether_star_shard')
        .itemOutput('kubejs:pyroclastic_scope')
        .id('kubejs:pyroclastic_scope_recipe')
        .inputs([
            'kubejs:eye_of_fortress', 
            'minecraft:netherite_ingot', 
            '8x minecraft:magma_cream'
        ])

    event.recipes.summoningrituals
        .altar('kubejs:spine_diamond')
        .sacrifice('cataclysm:ignis',1)
        .id('darksteel_spine_recipe')
        .itemOutput('kubejs:darksteel_spine')
        .inputs([
            'cataclysm:ancient_metal_ingot', 
            'minecraft:netherite_ingot', 
            'iceandfire:dragonsteel_lightning_ingot', 
            'iceandfire:dragonsteel_fire_ingot', 
            'iceandfire:dragonsteel_ice_ingot', 
            'iceandfire:ghost_ingot', 
            'art_of_forging:forged_steel_ingot', 
            'irons_spellbooks:arcane_ingot'
        ])

    event.recipes.summoningrituals
        .altar('minecraft:totem_of_undying')
        .sacrifice('alexsmobs:sunbird',1)
        .id('phoenix_recipe')
        .itemOutput('kubejs:phoenix_feather')
        .inputs([
            '8x minecraft:gold_block'
        ])
        
});