let IronUtils=Java.loadClass('io.redspace.ironsspellbooks.api.util.Utils')
let ClientboundTeleportParticles=Java.loadClass('io.redspace.ironsspellbooks.network.spell.ClientboundTeleportParticles')
let ClipContext=Java.loadClass('net.minecraft.world.level.ClipContext')
let PacketDistributor=Java.loadClass('net.minecraftforge.network.PacketDistributor')
let CollisionContext=Java.loadClass('net.minecraft.world.phys.shapes.CollisionContext')
let HitResult=Java.loadClass('net.minecraft.world.phys.HitResult')
let Messages=Java.loadClass('io.redspace.ironsspellbooks.setup.Messages')
let Connection=Java.loadClass("net.minecraft.server.network.ServerPlayerConnection")

PlayerEvents.tick(event => {
    let player = event.player

    if(player.age%2) return;
    //let itemMap = getPlayerChestCavityItemMap(player);
    
    if (player.age % 10) return

    if(!player.hasEffect('kubejs:void_wings')){
        player.removeAttribute(CaelusApi.getInstance().getFlightAttribute(),'void_wings_fly')
    }

    let itemMap = getPlayerChestCavityItemMap(player);
    let typeMap = getPlayerChestCavityTypeMap(player);
    let level = player.level;
    let qiRecover = player.persistentData.getInt('qiRecover');
    let qi;
    qi = player.persistentData.getInt('qi');
    let qiMax = player.getAttributeValue('kubejs:qi_max');
    let visible = typeMap.has('kubejs:cultivate')?true:false;
    
    if(qi+qiRecover<qiMax)
        player.persistentData.putInt('qi',qi+qiRecover);
    else
        player.persistentData.putInt('qi',qiMax);

    if(player.abilities.flying&&!player.isCreative()&&player.persistentData.getBoolean('neidan')&&itemMap.has('kubejs:neidan')){
        qi = player.persistentData.getInt('qi');
        if(qi<100){
            player.abilities.flying=false;
            player.onUpdateAbilities();
        }else{
            qi-=100;
        }
        player.persistentData.putInt('qi',qi);
    }

    updateDlcBar(player,qi/qiMax,qi,qiMax,visible);

    if(itemMap.has('kubejs:spider_gland')){
        player.resetFallDistance();
    }

    if(itemMap.has('kubejs:temperature_controller'))
    {
        let temperature = ColdSweat.getTemperature(player, 'body');
        if(temperature>=50)
            ColdSweat.setTemperature(player, 'core', 50);
        else if(temperature<=-50)
            ColdSweat.setTemperature(player, 'core', -50);
    }

    if(player.hasEffect('kubejs:sweet_whirlpool'))
    {
        
        let amp;
        let spellLevel = player.getEffect('kubejs:sweet_whirlpool').getAmplifier();
        if (player.hasEffect('kubejs:sweet_dream')) {
            amp = player.getEffect('kubejs:sweet_dream').getAmplifier();
        } else {
            amp = 0;
        }
        let baseDamage = player.getAttributeValue('minecraft:generic.attack_damage')/4;
        let powerModifier_candy = player.getAttributeValue('kubejs:candy_spell_power');
        let powerModifier_common = player.getAttributeValue('irons_spellbooks:spell_power');
        let sweetness=player.getAttributeTotalValue('kubejs:sweetness');
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5+spellLevel*2);
        entityList.forEach(e=>{
            if(e!==player)
                e.attack(DamageSource.playerAttack(player),(3+spellLevel+baseDamage)*powerModifier_candy*powerModifier_common*(sweetness/20+1)*(amp+1)/2);
        })
    }


    if(player.isSprinting()&&itemMap.has('kubejs:chance_tedons')&&Math.random()>0.7&&player.onGround){
        let dest = findTeleportLocation(level, player, 20);
        Messages.sendToPlayersTrackingEntity(new ClientboundTeleportParticles(player.position(), dest), player, true);
        if (player.isPassenger()) {
            player.stopRiding();
        }
        let originalMotion = {
            x: player.getMotionX(),
            y: player.getMotionY(),
            z: player.getMotionZ()
        }
        player.moveTo(dest)
        player.setMotion(originalMotion.x,originalMotion.y,originalMotion.z)
        player.resetFallDistance();
        player.sendData('sounds',{'sound':'minecraft:entity.enderman.teleport'})
    }
    
})



function random_between(left,right){
    return (Math.random()*(right - left + 1)) + left;
}

function findTeleportLocation(level,entity,maxDistance) {
            
    let blockHitResult = IronUtils.getTargetBlock(level, entity, ClipContext.Fluid.NONE, maxDistance);
    let pos = blockHitResult.getBlockPos();

    let bbOffset = entity.getForward().normalize().multiply(entity.getBbWidth() / 3, 0, entity.getBbHeight() / 3);
    let bbImpact = blockHitResult.getLocation().subtract(bbOffset);
    let ledgeY = level.clip(new ClipContext(Vec3.atBottomCenterOf(pos).add(0, 3, 0), Vec3.atBottomCenterOf(pos), ClipContext.Block.COLLIDER, ClipContext.Fluid.NONE, null)).getLocation().y();
    let isAir = level.getBlockState(new BlockPos(pos.getX(), ledgeY, pos.getZ()).above()).isAir();
    let los = level.clip(new ClipContext(bbImpact, bbImpact.add(0, ledgeY - pos.getY(), 0), ClipContext.Block.COLLIDER, ClipContext.Fluid.NONE, entity)).getType() == HitResult.Type.MISS;
    if (isAir && los && Math.abs(ledgeY - pos.getY()) <= 3) {
        return new Vec3(pos.getX() + .5, ledgeY + 0.001, pos.getZ() + .5);
    }
    return level.clip(new ClipContext(bbImpact, bbImpact.add(0, -entity.getBbHeight(), 0), ClipContext.Block.COLLIDER, ClipContext.Fluid.NONE, entity)).getLocation().add(0, 0.001, 0);
}
