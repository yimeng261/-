// priority: 50
/**
 * @param {Internal.LivingDamageEvent} event
 * @returns 
 */
const origin_Damage = global.LivingDamageByOthers;

global.LivingDamageByOthers = event => {
    let player=event.entity
    sweetPlayerHurtByOthers(event)
    candyLungPlayerHurtByOthers(event)
    sugarRushPlayerHurtByOthers(event)
    origin_Damage(event)
    sweetShellPlayerHurtByOthers(event);
    dlc_sweetDreamPlayerHurtByOthers(event);
    if(event.amount>player.health)
        gingerManPlayerHurtByOthers(event);
    findCandyPlayer(event);
    phoenixPlayer(event);
}

const origin_Hurt_Player = global.LivingHurtByPlayer;

/**
 * @param {Internal.LivingHurtEvent} event 
 * @returns 
 */
global.LivingHurtByPlayer = event => {
    //event.source.type=DamageSource.MAGIC;
    pigmentEffect(event);
    origin_Hurt_Player(event);
    civilizationPlayer(event);
}

const origin_Hurt_Others = global.LivingHurtByOthers

/**
 * @param {Internal.LivingDamageEvent} event
 * @returns 
 */
global.LivingHurtByOthers = event => {
    let player=event.entity
    disasterPlayer(event);
    treeBodyPlayer(event);
    origin_Hurt_Others(event);

}
