function pigmentEffect(event)
{
    if(event.entity.isPlayer()) return;
    let e = event.entity;
    if(e.hasEffect('kubejs:pigment'))
    {
        e.invulnerableTime = 0
        let duration = e.getEffect('kubejs:pigment').getDuration() > 2400 ? 2400 : e.getEffect('kubejs:pigment').getDuration();
        let amp = e.getEffect('kubejs:pigment').getAmplifier() > 15 ? 15 : e.getEffect('kubejs:pigment').getAmplifier();
        event.amount*=1+duration/2000+(amp+1)/8;
        e.removeEffect('kubejs:pigment');
        e.potionEffects.add('kubejs:pigment',duration + 10, amp + 1);
    }
}


/**
 * @param {Internal.LivingDamageEvent} event
 * @returns 
 */



function civilizationPlayer(event){
    let player = event.source.player;
    let curiosItem = getCuriosItem(player,'kubejs:the_preservation_of_civilization');
    if (curiosItem?.id == 'kubejs:the_preservation_of_civilization'){
        event.entity.invulnerableTime=0;
        event.entity.attack(DamageSource.MAGIC,event.amount);
        let currentHealth = event.entity.getHealth();
        event.entity.setHealth(Math.max(currentHealth-event.amount*0.2,0));
        event.amount = 0;
    }
}

function disasterPlayer(event)
{
    let player=event.entity;
    let count;
    if(event.source.type==='outOfWorld') return;
    let ageCounter=player.age-player.persistentData.getInt('ageRecord');
    count = player.persistentData.getInt('damageCount');
    let itemMap=getPlayerChestCavityItemMap(player);
    if(itemMap.has('kubejs:disaster_source'))
    {
        count+=event.amount;
        player.persistentData.putInt('damageCount',count);
        player.persistentData.putInt('ageRecord',player.age);
        player.modifyAttribute('minecraft:generic.attack_damage','damageCounter',count,'addition');
        //player.tell(`${ageCounter},${count + event.amount}`);
        if(count>200||ageCounter>20*20)
        {
            for(let i=0;i<10;i++)
            {
                if(event.source.actual!=player)
                {
                    if(event.source.actual)
                    {
                        event.source.actual.invulnerableTime=0;
                        event.source.actual.attack(DamageSource.playerAttack(player),count*20);
                        event.source.actual.invulnerableTime=0;
                    }
                    else
                    {
                        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 7);
                        entityList.forEach(e=>{
                            e.invulnerableTime=0;
                            e.attack(DamageSource.playerAttack(player),count*20/entityList.length)
                            e.invulnerableTime=0;
                        });
                    }
                }
            };
            player.persistentData.putInt('damageCount',0)
            player.removeAttribute('minecraft:generic.attack_damage','damageCounter');
            return;
        }
    }
    else if(!itemMap.has('kubejs:disaster_source')&&count>0)
    {
        player.invulnerableTime=0;
        player.attack(DamageSource.playerAttack(player),count*20)
        player.invulnerableTime=0;
        player.persistentData.putInt('damageCount',0)
        player.removeAttribute('minecraft:generic.attack_damage','damageCounter');
        return;
    }
}

function treeBodyPlayer(event)
{
    if(event.source.type==='outOfWorld') return;
    let player=event.entity;
    if(!player.hasEffect('kubejs:tree_blessing')) return;
    let itemMap=getPlayerChestCavityItemMap(player);
    //player.tell(`${event.amount}`)
    if(itemMap.has('kubejs:tree_body'))
    {
        if(Math.random()<=0.3){
            //player.tell('临时生命')
            player.absorptionAmount+=event.amount;
        }
        if(event.source.actual!=player&&Math.random()<=0.3)
        {
            //player.tell('免疫')
            if(event.source.actual)
            {
                event.source.actual.invulnerableTime=0;
                event.source.actual.attack(DamageSource.playerAttack(player),event.amount);
                event.source.actual.invulnerableTime=0;
            }
            event.amount=0;
        }
    };
}

const BlackHole=Java.loadClass('io.redspace.ironsspellbooks.entity.spells.black_hole.BlackHole')
const SoundRegistry = Java.loadClass('io.redspace.ironsspellbooks.registries.SoundRegistry')
const SoundSource=Java.loadClass('net.minecraft.sounds.SoundSource')

/**
 * 玩家承受伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingDamageEvent, organ, EntityHurtCustomModel):void>}
 */

const dlcOrganPlayerBearOnlyStrategies = {
    'kubejs:tree_body': function (event, organ, data) {
        if(event.source.type == 'fall')
            event.amount=0;
    },
    'kubejs:chaos_tumor':function(event, organ,data){
        if(organ.nbt==undefined) return;
        let coolDowns = event.entity.getCooldowns()
        organ.tag.devouredOrgans.forEach(org=>{
            if(!coolDowns.isOnCooldown(Item.of(org))&&Item.of(org).hasTag('kubejs:bear_only'))
                organPlayerBearOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
    'kubejs:gravitational_iris': function (event, organ, data) {
        let player = event.entity
        let coolDowns = event.entity.getCooldowns()
        if(!coolDowns.isOnCooldown('kubejs:gravitational_iris')&&player.getHealth()-event.amount<player.getMaxHealth() * 0.1){
            player.addItemCooldown('kubejs:gravitational_iris', 60*20);
            event.amount=0;
            Utils.server.scheduleInTicks(2,e=>{
            let radius = 30;
            let center = new Vec3(player.x,player.y-13,player.z);
            let blackHole = new BlackHole(player.level, player);
            blackHole.setRadius(radius);
            blackHole.setDamage(40);
            blackHole.moveTo(center);
            player.level.addFreshEntity(blackHole);
            player.level.playSound(null, center.x, center.y, center.z, SoundRegistry.BLACK_HOLE_CAST.get(), SoundSource.AMBIENT, 4, 1);})
        }
    },
    'kubejs:luminescent_sac_gland':function(event, organ,data){
        let player = event.entity
        let coolDowns = player.getCooldowns()
        if(coolDowns.isOnCooldown(Item.of(organ.id))) return;
        player.addItemCooldown('kubejs:luminescent_sac_gland', 15*20);
        let spawn = player.getPosition(0)
        let offset=[(0,0,3),(0,0,-3),(-3,0,0),(3,0,0)]
        let target=event.source.actual?event.source.actual:null;
        for(var i=0;i<4;i++){
            let fireflies = new FireflySwarmProjectile(player.level, player, target, getSpellPower(7,player,AttributeRegistry.NATURE_SPELL_POWER)/3);
            fireflies.moveTo(spawn.add(offset[i]));
            player.level.addFreshEntity(fireflies);
        }
    },
    'kubejs:bloodthorn_heart':function (event, organ, data) {
        let player = event.entity
        if(!event.source.actual) return;
        player.health-=5;
        let resultVec = event.source.actual.position();
        let needle=new $BloodNeedle(player.level,player);
        let damage = getSpellPower(10,player,AttributeRegistry.BLOOD_SPELL_POWER);
        needle.setDamage(damage)
        let spawn = player.getEyePosition();
        needle.moveTo(spawn)
        needle.shoot(resultVec.subtract(spawn).normalize())
        player.level.addFreshEntity(needle)
    },
    'kubejs:blaze_nucleus':function (event, organ, data) {
        let player = event.entity
        if(event.source.isFire()){
            event.amount=0;
            player.extinguish();
        }
    },
    'kubejs:lava_core':function (event, organ, data) {
        let player = event.entity
        if(event.source.isFire()){
            event.amount=0;
            player.extinguish();
        }
    },
    'kubejs:darksteel_spine':function (event, organ, data) {
        let player = event.entity
        var amp=player.persistentData.getInt('wudao');
        event.amount*=(1-amp/120);
    },
    'kubejs:star_gallblader':function (event, organ, data) {
        if(event.source.isProjectile()){
            event.amount=0;
        }
    },
}

Object.assign(organPlayerBearOnlyStrategies,dlcOrganPlayerBearOnlyStrategies);