

function phoenixPlayer(event){
    let player=event.entity;
    if(player.health>event.amount) return;
    let itemMap=getPlayerChestCavityItemMap(player);
    if(itemMap.has('kubejs:phoenix_feather')){
        event.amount=0;
        let coolDowns=player.cooldowns;
        if(!coolDowns.isOnCooldown('kubejs:phoenix_feather')){
            player.setHealth(player.maxHealth)
            //player.playSound('minecraft:item.totem.use')
            player.sendData('sounds',{'sound':'minecraft:item.totem.use'})
            player.potionEffects.add('minecraft:fire_resistance',1200,0);
            player.potionEffects.add('minecraft:absorption',200,10);
            player.potionEffects.add('minecraft:strength',600,5);
            player.potionEffects.add('minecraft:resistance',600,2);
            player.potionEffects.add('minecraft:regeneration',1200,1);
            coolDowns.addCooldown('kubejs:phoenix_feather',120*20);
        }
    }
}