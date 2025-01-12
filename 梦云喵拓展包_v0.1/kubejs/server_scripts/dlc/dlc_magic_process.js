// priority: 50
/**
 * @param {Internal.CustomSpell$CastContext} ctx 
 * @returns 
 */
global.sweet_shell = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity
    let spellLevel = ctx.getSpellLevel()
    let shellEffect = player.getEffect('kubejs:sweet_shell')
    let duration;
    if (player.hasEffect('kubejs:sweet_shell')) {
        duration = shellEffect.getDuration();
    } else {
        duration = 0;
    }
    player.potionEffects.add('kubejs:sweet_shell', duration + 120 * 20, spellLevel-1)
}

global.sweet_whirlpool = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity;
    let count = 0;
    getPlayerChestCavityTypeMap(player).get('kubejs:candy').forEach(organ=>{count++});
    if(count<15){
        player.tell('糖果器官似乎太少了？');
        return;
    }
    
    let spellLevel = ctx.getSpellLevel()
    player.potionEffects.add('kubejs:sweet_whirlpool',100*20,spellLevel);
    //漩涡
    
}