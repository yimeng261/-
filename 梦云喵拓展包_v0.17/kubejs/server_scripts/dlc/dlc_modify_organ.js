
organPlayerDamageOnlyStrategies['kubejs:color_palette'] =function(event, organ, data) {
    let player = event.source.player
    if (player.getMainHandItem() != 'kubejs:artist_wand' && player.getOffHandItem() != 'kubejs:artist_wand')
        return
    //增加彩色法术种类
    if (event.source.type == 'irons_spellbooks.firebolt' || 
        event.source.type == 'irons_spellbooks.icicle' || 
        event.source.type == 'irons_spellbooks.poison_arrow'||
        event.source.type == 'irons_spellbooks.blood_needles'||
        event.source.type == 'irons_spellbooks.magic_arrow'
    ) {
        //player.tell('colorful spells!')
        let amplify = 30
        if (player.hasEffect('kubejs:colorful')) {
            amplify = Math.min(28-player.getEffect('kubejs:colorful').getAmplifier(),20);
        }
        event.amount = event.amount + getPlayerMagicData(player).getMana() / amplify
    }
};
