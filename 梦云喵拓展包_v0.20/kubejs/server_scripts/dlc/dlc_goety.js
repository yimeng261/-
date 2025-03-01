ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }

    registerCustomRecipe(new GoetyRitualRecipe(
        'lich', 
        [
            Ingredient.of('minecraft:obsidian'), 
            Ingredient.of('kubejs:immortal_volcanic_rock'), 
            Ingredient.of('minecraft:goat_horn'), 
            Ingredient.of('minecraft:netherite_ingot')
        ], 
            Item.of('iceandfire:witherbone'), 
            Item.of('kubejs:life_devouring_bone')
        )
            .setSoulCost(1000)
    )

    registerCustomRecipe(new GoetyRitualRecipe(
        'lich', 
        [
            Item.of('irons_spellbooks:scroll', '{ISB_Spells:{data:[{id:"irons_spellbooks:blood_needles",index:0,locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}').weakNBT(), 
            Ingredient.of('irons_spellbooks:blood_vial'), 
            Ingredient.of('goety:unholy_blood'), 
            Ingredient.of('nameless_trinkets:vampire_blood'),
            Ingredient.of('hexerei:blood_bottle')
        ], 
            Item.of('kubejs:heart_diamond'), 
            Item.of('kubejs:bloodthorn_heart')
        )
            .setSoulCost(1000)
    )

    registerCustomRecipe(new GoetyRitualRecipe(
        'storm', 
        [
            Ingredient.of('goety:lightning_focus'), 
            Ingredient.of('kubejs:diamond_bottle'), 
            Ingredient.of('goety:storm_robe'), 
            Ingredient.of(Item.of('irons_spellbooks:scroll', '{ISB_Spells:{data:[{id:"irons_spellbooks:chain_lightning",index:0,locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}').weakNBT())
        ], 
            Item.of('kubejs:spirits_bone'), 
            Item.of('kubejs:thundercloud_bone')
        )
            .setSoulCost(500)
    )

    registerCustomRecipe(new GoetyRitualRecipe(
        'storm', 
        [
            Ingredient.of('minecraft:trident'), 
            Ingredient.of('kubejs:diamond_bottle'), 
            Ingredient.of('minecraft:lightning_rod'), 
            Ingredient.of(Item.of('irons_spellbooks:scroll', '{ISB_Spells:{data:[{id:"irons_spellbooks:lightning_bolt",index:0,locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}').weakNBT())
        ], 
            Item.of('iceandfire:stymphalian_bird_feather'), 
            Item.of('kubejs:thunderstorm_feather')
        )
            .setSoulCost(500)
    )

})