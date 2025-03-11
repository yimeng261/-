const CaelusApi =Java.loadClass('top.theillusivec4.caelus.api.CaelusApi')
const FireflySwarmProjectile=Java.loadClass('io.redspace.ironsspellbooks.entity.spells.firefly_swarm.FireflySwarmProjectile')
const PetalBladeProjectile=Java.loadClass('com.cerbon.bosses_of_mass_destruction.projectile.PetalBladeProjectile');


ItemEvents.rightClicked(event=>{
    let player=event.player;
    let itemMap=getPlayerChestCavityItemMap(player);

    /*
    let level=player.level;
    let blade=new PetalBladeProjectile(player, level, {}, [player.type], player.yaw);
    blade.setNoGravity(true);
    blade.moveTo(player.getPosition(1).add(0,1.5,0));
    blade.setDeltaMovement(player.lookAngle.scale(0.5));
    player.sendData('sounds','bosses_of_mass_destruction:petal_blade');
    level.playSound(null,player.x,player.y,player.z,'bosses_of_mass_destruction:petal_blade',player.getSoundSource(),2,1);
    level.addFreshEntity(blade);
    player.server.scheduleInTicks(8*20,event=>{
        blade.setNoGravity(false);
    })
    */
    if(itemMap.has('kubejs:void_engine')){
        let mainHandItem=player.mainHandItem
        if(mainHandItem.hasTag('forge:stone')){
            mainHandItem.shrink(1)
            player.potionEffects.add('kubejs:void_wings',20*120,1);
            player.modifyAttribute(CaelusApi.getInstance().getFlightAttribute(),'void_wings_fly',1,'addition')
        }
    }
})