const ChainLightning=Java.loadClass('io.redspace.ironsspellbooks.spells.lightning.ChainLightningSpell')
const EntityType=Java.loadClass('net.minecraft.world.entity.EntityType')
const AbstractSpell=Java.loadClass('io.redspace.ironsspellbooks.api.spells.AbstractSpell')
const SpellRegistry=Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')
const CastSource=Java.loadClass('io.redspace.ironsspellbooks.api.spells.CastSource')

const glowingMap=new Map()

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

/**
 * 造成伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */

const DLCOrganPlayerDamageOnlyStrategies={
    'kubejs:chance_tedons':function(event, organ, data) {
        let player = event.source.player
        let chance = randomNum(0,20)/100;
        event.amount*=(1-chance);
        let hp=event.entity.health-event.amount*chance;
        event.entity.setHealth(hp>0?hp:0);
    },
    'kubejs:life_devouring_bone':function(event, organ,data){
        let player=event.source.player;
        if(player.health/player.maxHealth>0.95){
            event.amount+=player.maxHealth/2;
        }else{
            player.health+=player.maxHealth*0.05
        }
    },
    /*
    'kubejs:wither_spine_claw':function(event, organ,data){
        let entity=event.entity;
        entity.removeEffect('minecraft:wither');
        entity.potionEffects.add('minecraft:wither',5*20,4)
    },
    */
    'kubejs:bloodthorn_heart':function(event, organ,data){
        let player=event.source.player;
        if(event.source.type == 'irons_spellbooks.blood_needles'){
            player.health+=event.amount*0.2;
        }
    },
    'kubejs:thundercloud_bone':function(event,organ,data){
        let player=event.source.player;
        let cooldowns=player.cooldowns;
        if(!player.level.isThundering()) return;
        if(cooldowns.isOnCooldown('kubejs:thundercloud_bone')) return;
        cooldowns.addCooldown('kubejs:thundercloud_bone',5*20);
        player.server.runCommandSilent(`/cast ${player.name.getString()} chain_lightning 7`)
    },
    'kubejs:mimetic_gland':function(event, organ,data){
        event.source.player.removeEffect('irons_spellbooks:true_invisibility');
        event.source.player.removeEffect('minecraft:invisibility');
    },
    'kubejs:phoenix_feather':function(event,organ,data){
        if(event.entity.isUndead()){
            event.amount*=1.5;
        }
    },
    'kubejs:jade_eye':function(event,organ,data){
        let player=event.source.player;
        if(event.entity==player) return;
        let uuid=String(player.uuid);
        let entityList=getLivingWithinRadius(player.level,new Vec3(player.x,player.y,player.z),20);
        let amp=player.persistentData.getInt('wudao');
        let itemMap=getPlayerChestCavityItemMap(player);
        let mesg=`本次战斗[悟道]对你的提升为：增加${(amp/1.5).toFixed(2)}%伤害，术法等级+${Math.floor(amp/40)}`;
        if(itemMap.has('kubejs:darksteel_spine')){
            mesg+=`，提供${(amp/1.2).toFixed(2)}%免伤`;
        }
        player.setStatusMessage(mesg);
        player.persistentData.putBoolean('fighting',true);
        event.amount*=(1+amp/150);
        entityList.forEach(e=>{
            if(!e.isPlayer()){
                e.setGlowing(true)
            }
        })
        let preList=glowingMap.get(uuid);
        if(preList){
            glowingMap.set(uuid,entityList.concat(preList));
        }else{
            glowingMap.set(uuid,entityList);
        }
        player.cooldowns.addCooldown('kubejs:jade_eye',10*20);
    },
    'kubejs:flower_of_heart':function(event,organ,data){
        let player=event.source.player;
        let target=event.entity;
        let coolDowns=player.cooldowns;
        target.invulnerableTime=0;
        if(coolDowns.isOnCooldown('kubejs:flower_of_heart')) return;
        coolDowns.addCooldown('kubejs:flower_of_heart',50);
        var radius=target.getBbWidth()*4;
        let targetPos=new Vec3(target.x,target.y+target.getEyeHeight(),target.z);
        let level=player.level;
        let posMap = getPlayerChestCavityPosMap(player)
        let pos = organ.Slot
        var num=8;
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'kubejs:flower_heart') {
            num=16;
        }
        /*
        target.setNoAI(true)
        target.server.scheduleInTicks(2, event => {
            target.setNoAI(false)
        })
            */
        for(var i=0;i<num;i++){
            let spawnPos=new Vec3(target.x+radius*Math.cos(i*2*JavaMath.PI/num),target.y+target.getEyeHeight()+2,target.z+radius*Math.sin(i*2*JavaMath.PI/num));
            let blade=new PetalBladeProjectile(player, level, {}, [player.type], player.yaw);
            blade.setNoGravity(true);
            blade.moveTo(spawnPos);
            blade.setDeltaMovement(targetPos.subtract(spawnPos).scale(0.14));
            level.addFreshEntity(blade);
        }
        level.playSound(null,player.x,player.y,player.z,'bosses_of_mass_destruction:petal_blade',player.getSoundSource(),4,1);
    },
    'kubejs:chaos_tumor':function(event, organ,data){
        if(organ.nbt==undefined) return;
        let coolDowns = event.entity.getCooldowns()
        organ.tag.devouredOrgans.forEach(org=>{
            if(!coolDowns.isOnCooldown(Item.of(org))&&Item.of(org).hasTag('kubejs:damage_only'))
                organPlayerDamageOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
    'kubejs:star_spleen':function(event,organ,data){
        let entity = event.entity
        let player = event.source.player
        if (event.source.type == 'player'&&Math.random()>0.7) {
            overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'flaming_strike'), 10, player, false)
            entity.setNoAI(true)
            entity.server.scheduleInTicks(1, event => {
                entity.setNoAI(false)
            })
        }
        if(entity.isOnFire()&&Math.random()>0.7){
            if(player.cooldowns.isOnCooldown('kubejs:star_spleen')) return;
            player.addItemCooldown('kubejs:star_spleen', 30*20);
            Utils.server.scheduleInTicks(1,e=>{
                let radius = 5;
                let center = new Vec3(entity.x,entity.y-2,entity.z);
                let blackHole = new BlackHole(player.level, player);
                blackHole.setRadius(radius);
                blackHole.setDamage(getSpellPower(random_between(2,12),player,AttributeRegistry.ENDER_SPELL_POWER));
                blackHole.moveTo(center);
                player.level.addFreshEntity(blackHole);
                player.level.playSound(null, center.x, center.y, center.z, SoundRegistry.BLACK_HOLE_CAST.get(), SoundSource.AMBIENT, 4, 1);
            })
        }
    },
    'kubejs:star_gallblader':function(event,organ,data){
        let entity = event.entity
        entity.attack(DamageSource.OUT_OF_WORLD,event.amount*0.1);
    },
}

Object.assign(organPlayerDamageOnlyStrategies,DLCOrganPlayerDamageOnlyStrategies)