ChestCavityEvents.updateOrganScore(event => {
    if (event.chestCavity && event.chestCavity.owner && event.chestCavity.owner.isPlayer()) {
        const chestCavity = event.chestCavity
        const player = chestCavity.owner

        let sweetnessScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:sweetness'));
        player.modifyAttribute('kubejs:sweetness', 'kubejsSweetness', sweetnessScore, 'addition');

        let qiScore = chestCavity.getOrganScore(new ResourceLocation('chestcavity:qiMax'));
        player.modifyAttribute('kubejs:qiMax', 'kubejsQiMax', qiScore, 'addition');
    }
})
