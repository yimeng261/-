ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }

    registerCustomRecipe(new BioBrewingRecipe([
        Ingredient.of('kubejs:holy_eyeball'), 
        Ingredient.of('kubejs:demon_eyeball'), 
        Ingredient.of('kubejs:ender_guard_eyeball')
    ], 
        Item.of('minecraft:nether_star'), 
        Item.of('kubejs:gravitational_iris')
    )
        .setNutrientsCost(20)
        .setProcessingTime(3600)
    )

    registerCustomRecipe(new BioBrewingRecipe([
        Ingredient.of('art_of_forging:heart_of_ender'), 
        Ingredient.of('minecraft:ender_pearl')
    ], 
        Item.of('kubejs:jingmai'), 
        Item.of('kubejs:stellar_pathway')
    )
        .setNutrientsCost(10)
        .setProcessingTime(600)
    )
})
