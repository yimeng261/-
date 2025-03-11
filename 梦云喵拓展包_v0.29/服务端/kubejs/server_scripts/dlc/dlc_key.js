/**
 * 主动策略
 * @constant
 * @type {Object<string,function(Internal.NetworkEventJS, organ):void>}
 */
const dlcKey = {
    'kubejs:sculk_core': function (event, organ) {
        /**@type {Internal.ServerPlayer} */
        let player = event.player
        let counter = 0
        function player_ray(player)
        {
            let counter = 0;
            let ray = player.rayTrace(35, false)
            let distance = ray.distance
            let damageSource = new DamageSource.sonicBoom(player)
            let vec3Nor = player.getLookAngle().normalize()
            let getlevel = player.getXpLevel()
            let count = 0;
            let typeMap = getPlayerChestCavityTypeMap(player);
            let onlySet = new Set();
            if (typeMap.has('kubejs:sculk')) {
                typeMap.get('kubejs:sculk').forEach(organ => {
                    if (!onlySet.has(organ.id))
                        onlySet.add(organ.id);
                    count++;
                })}
            if (ray.entity && ray.entity.isLiving()) {
                ray.entity.attack(damageSource, (60 + Math.min(getlevel, 1000))*(count/4+1))
                ray.entity.invulnerableTime = 0
                counter++
            }
            if (ray.block) {
                distance = player.getPosition(1.0).distanceTo(ray.block.pos)
            }
            for (let i = 0; i < distance; i++) {
                let vec3 = vec3Nor.scale(i).add(player.getEyePosition())
                event.level.spawnParticles($ParticleTypes.SONIC_BOOM, false, vec3.x(), vec3.y(), vec3.z(), 0, 0, 0, 1, 0)
                if (i % 2 == 0) {
                    let entityInRadius = getLivingWithinRadius(event.level, vec3, 2)
                    entityInRadius.forEach(e => {
                        if (!e.isPlayer()) {
                            counter++
                            e.attack(damageSource, (20 + Math.min(getlevel * 0.8, 1000))*(count/6+1))
                            e.invulnerableTime = 0
                        }
                    })
                }
            }
            return counter;
        }
        player.addItemCooldown('kubejs:sculk_core', 10000)
        counter+=player_ray(player,counter);
        Utils.server.scheduleInTicks(20, () => {counter+=player_ray(player)});
        Utils.server.scheduleInTicks(40, () => {counter+=player_ray(player)});
        Utils.server.scheduleInTicks(45, () => {
            player.addItemCooldown('kubejs:sculk_core', Math.max(20 * 30 - counter * 60, 0))
            if(getPlayerChestCavityItemMap(player).has('kubejs:sculk_eye'))
            {
                player.potionEffects.add('irons_spellbooks:abyssal_shroud',20 * 10 * counter/3);
                player.modifyAttribute('minecraft:generic.attack_damage','scluk_attack',counter*3,'addition');
                player.modifyAttribute('irons_spellbooks:spell_power','scluk_spell',counter/3,'addition');
                player.modifyAttribute('irons_spellbooks:max_mana','scluk_mana',counter*100,'addition');
                player.modifyAttribute('minecraft:generic.max_health','scluk_health',counter,'addition');
            }
        });
        Utils.server.scheduleInTicks(45+counter*20*10,()=>{
            player.removeAttribute('minecraft:generic.attack_damage','scluk_attack');
            player.removeAttribute('irons_spellbooks:spell_power','scluk_spell');
            player.removeAttribute('irons_spellbooks:max_mana','scluk_mana');
            player.removeAttribute('minecraft:generic.max_health','scluk_health');
        });
    },
    'kubejs:pigment_bubble':function (event, organ) {
        let player = event.player
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 30);
        entityList.forEach(e=>{
            if(e.isPlayer()) return;
            let duration = e.hasEffect('kubejs:pigment')?e.getEffect('kubejs:pigment').getDuration():200;
            let amp = e.hasEffect('kubejs:pigment')?e.getEffect('kubejs:pigment').getAmplifier():-1;
            e.potionEffects.add('kubejs:pigment',duration + 20, amp + 1);
        })
        player.addItemCooldown('kubejs:pigment_bubble', 20 * 20)
    },
    'kubejs:tree_heart':function(event, organ){
        let player = event.player;
        player.removeEffect('kubejs:tree_blessing');
        player.potionEffects.add('kubejs:tree_blessing',60 * 20,0);
        player.addItemCooldown('kubejs:tree_heart', 80*20);
    },
    'kubejs:chaos_tumor':function(event, organ){
        let coolDowns = event.player.getCooldowns()
        organ.tag.devouredOrgans.forEach(org=>{
            if (!coolDowns.isOnCooldown(Item.of(org))&&Item.of(org).hasTag('kubejs:key_pressed'))
                organPlayerKeyPressedOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
        player.addItemCooldown('kubejs:chaos_tumor', 90*20);
    },
    'kubejs:thunderstorm_feather':function(event,organ){
        event.player.server.runCommandSilent('/weather thunder')
    },
    'kubejs:blaze_nucleus':function (event, organ) {
        let player = event.player
        player.addItemCooldown('kubejs:blaze_nucleus', 5 * 20);
        let level=player.level;
        for(var i=0;i<3;i++)
            player.server.scheduleInTicks(i*10,e=>{
                let fireball=level.createEntity('minecraft:small_fireball');
                fireball.moveTo(player.getPosition(1).add(0,1.5,0));
                fireball.setDeltaMovement(player.lookAngle);
                fireball.nbt=fireball.nbt.merge({'power':[fireball.motionX*0.1,fireball.motionY*0.1,fireball.motionZ*0.1]})
                level.addFreshEntity(fireball);
        });
    },
}
var b1 = Object.assign(organPlayerKeyPressedOnlyStrategies, dlcKey);
