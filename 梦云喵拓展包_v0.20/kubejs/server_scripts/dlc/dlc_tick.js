function dantianTick(event){
    let player = event.player
        if (player.age % (400) != 0&&player.experienceLevel<50) return
        let instance = player.getChestCavityInstance()
        // 如果该位置存在物品，则不进行生成
        let randomIndex = Math.floor(Math.random() * 27)
        if (instance.inventory.getItem(randomIndex) != 'minecraft:air') return
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (!typeMap.has('kubejs:organ')) return
        let jingmai = Item.of('kubejs:jingmai')
        instance.inventory.setItem(randomIndex, jingmai)
        player.potionEffects.add('minecraft:levitation', 2 * 20, 1)
        dlcUpdate(player);
        global.initChestCavityIntoMap(player, false)
        if (player.persistentData.contains(organActive) &&
            player.persistentData.getInt(organActive) == 1) {
            global.updatePlayerActiveStatus(player)
        }
}

function getItemLightEmission(item){
    let block = Block.getBlock(item.id)
    if(block==undefined) return -1;
    let lightLevel = block.defaultBlockState().getLightEmission();
    if(lightLevel==undefined) return -1;
    return lightLevel;
}

let api = new $CuriosApi();

/**
 * 玩家Tick秒级唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */

const dlcTick={
    'kubejs:luminescent_sac_gland':function(event,organ){
        if(event.level.isDay()) return;
        let player=event.player
        let players=getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 8);
        players.forEach(e=>{
            if(e.isPlayer()){
                e.setHealth(Math.min(e.health+1,e.maxHealth));
            }
        })
    },
    'kubejs:nano_repair_core':function(event,organ){
        let player=event.player
        if(player.age%40) return;
        let mainHandItem=player.mainHandItem;
        let offHandItem=player.offHandItem;
        mainHandItem.damageValue-=Math.max(mainHandItem.maxDamage*0.01,1);
        offHandItem.damageValue-=Math.max(offHandItem.maxDamage*0.01,1);
        player.health+=2;
    },
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if(Item.of(org).hasTag('kubejs:player_tick'))
                organPlayerTickOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
}

/**
 * 玩家Tick秒级唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
let dlcTickOnly={
    'kubejs:temperature_controller': function (event, organ) {
        let player = event.player
        if(player.age%200!=0) return;
        let temperature = ColdSweat.getTemperature(player, 'body');
        let typeMap = getPlayerChestCavityTypeMap(player);
        if(temperature>=50)
        {
            let count = 0;
            let count_num = 0;
            let onlySet = new Set();
            if (typeMap.has('kubejs:sculk')) {
                typeMap.get('kubejs:sculk').forEach(organ => {
                    if (!onlySet.has(organ.id))
                    {
                        onlySet.add(organ.id);
                        count++;
                    }
                    count_num++;
                })}
           
            if(player.hasEffect('kubejs:burning_heart'))
            {
                let e = player.getEffect('kubejs:burning_heart');
                let duration = e.getDuration();
                let amp = e.getAmplifier();
                if(amp<30) amp+=count/4;
                if(duration + 40 * (1 + count_num/2)>1200*20) duration=1200*20-40 * (1 + count_num/2);
                player.removeEffect('kubejs:burning_heart');
                player.potionEffects.add('kubejs:burning_heart',duration + 40 * (1 + count_num/2),amp);
            }
            else if(player.hasEffect('kubejs:flaring_heart'))
            {
                let e = player.getEffect('kubejs:flaring_heart');
                let duration = e.getDuration();
                let amp = e.getAmplifier();
                if(amp<30) amp+=count/4;
                if(duration + 40 * (1 + count_num/2)>1200*20) duration=1200*20-40 * (1 + count_num/2);
                player.removeEffect('kubejs:flaring_heart');
                player.potionEffects.add('kubejs:flaring_heart',duration + 40 * (1 + count_num/2),amp);
            }
            else
            {
                player.potionEffects.add('kubejs:burning_heart',40 * (1 + count_num/2)+200,count/4);
            }
        }
        else if(temperature<=-50)
        {
            player.modifyAttribute("irons_spellbooks:spell_power",'kubejsTemperature', 1.5, 'multiply_total');
        }
        else if(player.getAttributes("irons_spellbooks:spell_power",'kubejsTemperature')&&temperature>-50)
        {
            player.removeAttribute("irons_spellbooks:spell_power",'kubejsTemperature');
        }
    },
    'kubejs:gold_cup':function(event, organ){
        let player = event.player
        let count = player.persistentData.getInt(resourceCount)
        player.modifyAttribute('minecraft:generic.attack_damage','gold_cup_attack',1+count/1000,'multiply_total');
        player.modifyAttribute('irons_spellbooks:spell_power','gold_cup_spell',1+count/1000,'multiply_total');
        player.modifyAttribute('irons_spellbooks:max_mana','gold_cup_mana',1+count/1000,'multiply_total');
        player.modifyAttribute('minecraft:generic.max_health','gold_cup_health',1+count/1000,'multiply_total');
    },
    'kubejs:machine_core':function(event, organ){
        let player = event.player
        let count = player.persistentData.getInt(resourceCount)
        let temp = count - player.persistentData.getInt('resourceRecord');
        let addition = temp > 0 ? temp : -temp;
        let duration;
        let amp;
        if (player.hasEffect('kubejs:burning_heart')) {
            let effect = player.getEffect('kubejs:burning_heart');
            duration = effect.getDuration();
            amp = effect.getAmplifier();
            updateResourceCount(player,0);
            player.removeEffect('kubejs:burning_heart')
            if(player.age%200 == 0&&amp<30) amp++;
            player.potionEffects.add('kubejs:burning_heart',duration + count%1200,amp);

        } else if (player.hasEffect('kubejs:flaring_heart')) {
            let effect = player.getEffect('kubejs:flaring_heart');
            duration = effect.getDuration();
            amp = effect.getAmplifier();
            updateResourceCount(player,0);
            player.removeEffect('kubejs:flaring_heart')
            if(player.age%200 == 0&&amp<30) amp++;
            player.potionEffects.add('kubejs:flaring_heart',duration + count%1200,amp);
        }
        else{
            if(50>count)
                updateResourceCount(player,0);
            else
                updateResourceCount(player,count - 50);
            player.potionEffects.add('kubejs:burning_heart',60,0);
        }


        //if(player.age%40) return;
        
        player.persistentData.putInt('resourceRecord', 0);
        player.modifyAttribute('minecraft:generic.attack_damage','machine_attack',addition/20,'addition');
        player.modifyAttribute('irons_spellbooks:spell_power','machine_spell',addition/700,'addition');
        player.modifyAttribute('irons_spellbooks:max_mana','machine_mana',addition,'addition');
        player.modifyAttribute('minecraft:generic.max_health','machine_health',addition/40,'addition');
    },
    'kubejs:dantian_up': function (event, organ) {
        dantianTick(event);
    },
    'kubejs:dantian_middle': function (event, organ) {
        dantianTick(event);
    },
    'kubejs:dantian_down': function (event, organ) {
        dantianTick(event);
    },
    'kubejs:tree_branch':function(event, organ){
        let player = event.player;
        if(!player.hasEffect('kubejs:tree_blessing')) return;
        let precipitation = player.level.getBiome(player.pos).value().getPrecipitation();
        //player.tell(`${precipitation}`);
        let count = getPlayerChestCavityTypeMap(player).get('kubejs:nature').length;
        if(precipitation=='RAIN'||precipitation=='SNOW'){
            player.removeEffect('minecraft:strength');
            player.potionEffects.add('minecraft:strength',15 * 20,count/4);
            player.removeEffect('minecraft:regeneration');
            player.potionEffects.add('minecraft:regeneration',15*20,1);
        }else{
            player.removeEffect('minecraft:reststance');
            player.potionEffects.add('minecraft:reststance',15 * 20,Math.ceil(5-20/count));
        }
    },
    'kubejs:tree_leaf':function(event, organ){
        let player = event.player;
        if(player.age%200) return;
        if(!player.hasEffect('kubejs:tree_blessing')) return;
        
        let mainLight = getItemLightEmission(player.mainHandItem);
        let offLight = getItemLightEmission(player.offHandItem);
        let lanternLight;
        lanternLight = 0;
        let optionalCurios = api.getCuriosHelper().getEquippedCurios(player)
        let curios = optionalCurios.resolve().get()
        for (let slot = 0; slot < curios.getSlots(); slot++) {
            let item = curios.getStackInSlot(slot);
            if(item.id.includes('lantern')){
                lanternLight = getItemLightEmission(item);
            }
        }
        let brightness = Math.max(player.level.getBrightness(0,player.blockPosition()),player.level.getBrightness(1,player.blockPosition()),mainLight,offLight,lanternLight);
        if(brightness>=8){
            let count = getPlayerChestCavityTypeMap(player).get('kubejs:nature').length;
            player.absorptionAmount+=player.maxHealth*count/20;
        }
        
    },
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if(Item.of(org).hasTag('kubejs:player_tick_only'))
                organPlayerTickOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
    'kubejs:lava_core':function(event, organ){
        let player=event.player;
        player.potionEffects.add('kubejs:auto_smelt',15*20,1);
        player.potionEffects.add('minecraft:fire_resistance',15*20,1);
    },
    'kubejs:candy_kidney':function(event,organ){
        let typeMap=getPlayerChestCavityTypeMap(event.player)
        let onlySet = new Set(typeMap.get('kubejs:candy').map(organ => organ.id));
        if(onlySet.size>=5){
            event.player.potionEffects.add('kubejs:sugar_rush', 15 * 20 - 1 , onlySet.size-1);
        }
    },
    'kubejs:stellar_pathway':function(event,organ){
        let player=event.player
        let moonPhase=player.level.moonPhase
        if(player.age%400==0){
            player.potionEffects.add('irons_spellbooks:evasion',400,0);
        }
        switch(moonPhase) {
            case 0: // 滿月 (Full Moon)
                player.potionEffects.add("minecraft:night_vision", 300, 0);
                break;
            case 1: // 虧凸月 (Waning Gibbous)
                player.potionEffects.add("minecraft:regeneration", 300, 0);
                break;
            case 2: // 下弦月 (Last Quarter)
                player.potionEffects.add("minecraft:speed", 300, 0);
                break;
            case 3: // 殘月 (Waning Crescent)
                player.potionEffects.add("minecraft:resistance", 300, 0);
                break;
            case 4: // 新月 (New Moon)
                player.potionEffects.add("minecraft:jump_boost", 300, 1);
                break;
            case 5: // 峨嵋月 (Waxing Crescent)
                player.potionEffects.add("minecraft:haste", 300, 0);
                break;
            case 6: // 盈凸月 (Waxing Gibbous)
                player.potionEffects.add("minecraft:strength", 300, 0);
                break;
            case 7: // 第二次滿月
                player.potionEffects.add("minecraft:glowing", 300, 0);
                break;
        }
    },
    'kubejs:rune_kidney':function(event,organ){
        let player=event.player;
        if(player.age%60) return;
        let effectMap=player.potionEffects.map;
        if(Math.random()>0.95){
            effectMap.forEach(t=>{
                operateEffect(t,'addDuration');
            })
        }
        if(Math.random()>0.85){
            let r=random_between(0,effectMap.size())
            let count=0;
            effectMap.forEach(t=>{
                if(count++==r){
                    operateEffect(t,'addDuration');
                }
            })
        }
        if(Math.random()>0.95){
            effectMap.forEach(t=>{
                operateEffect(t,'addAmp');
            })
        }
        if(Math.random()>0.85){
            let r=random_between(0,effectMap.size())
            let count=0;
            effectMap.forEach(t=>{
                if(count++==r){
                    operateEffect(t,'addAmp');
                }
            })
        }
        if(Math.random()>0.85){
            let r=random_between(0,effectMap.size())
            let count=0;
            effectMap.forEach(t=>{
                if(count++==r){
                    operateEffect(t,'remove');
                }
            })
        }
    },
    'kubejs:thundercloud_bone':function(event,organ){
        let player=event.player;
        let level=player.level;
        if(level.isThundering()){
            player.modifyAttribute('irons_spellbooks:lightning_spell_power','thunderbone',1,'addition');
        }else{
            player.removeAttribute('irons_spellbooks:lightning_spell_power','thunderbone');
        }
    },
    'kubejs:mimetic_gland':function(event,organ){
        let player=event.player;
        if(player.age%200) return;
        player.potionEffects.add('minecraft:invisibility',40*20,0);
        player.potionEffects.add('irons_spellbooks:true_invisibility',40*20,0);
    },
    'kubejs:jade_eye':function(event,organ){
        let player=event.player;
        var amp=player.persistentData.getInt('wudao');
        let fighting=player.persistentData.getBoolean('fighting');
        if(!player.cooldowns.isOnCooldown('kubejs:jade_eye')){
            if(amp<100) amp++;
            if(fighting){
                player.persistentData.putBoolean('fighting',false);
                amp=0;
                glowingMap.get(String(player.uuid)).forEach(e=>{
                    e.setGlowing(false);
                })
            }
            player.persistentData.putInt('wudao',amp);
        }
    },
    'kubejs:yuanshen':function(event,organ){
        let player=event.player;
        var amp=player.persistentData.getInt('wudao');
        player.persistentData.putInt('wudao',amp<100?amp+1:amp);
    },
    'kubejs:sculk_eye':function(event,organ){
        let player=event.player;
        player.potionEffects.add('minecraft:night_vision',15 * 20 ,0);
    },
    'kubejs:abyss_gaze':function(event,organ){
        let player=event.player
        let typeMap=getPlayerChestCavityTypeMap(player);
        let result = player.rayTrace(50,false)
        if (result && result.type === 'entity') {
            let entity = result.entity;
            if (entity.isLiving()) {
                var count=typeMap.get('kubejs:chaos').length
                var types=new Set(typeMap.get('kubejs:chaos').map(organ => organ.id)).size;
                var atk=player.getAttributeValue('minecraft:generic.attack_damage');
                entity.invulnerableTime=0;
                entity.attack(new DamageSource.playerAttack(player),random_between(atk-types*(10+count),atk+types*(10+count)));
                entity.invulnerableTime=0;
            }
        }
    },
};

function operateEffect(r,option){
    let id=t.descriptionId.slice(7).replace('.',':')
    let effect=player.getEffect(id)
    let amp=effect.amplifier
    let duration=effect.duration
    switch(option){
        case 'addDuration':
            player.removeEffect(id);
            player.potionEffects.add(id,duration>1200?duration*2:duration+1200,amp);
            break;
        case 'remove':
            player.removeEffect(id);
            break;
        case 'addAmp':
            player.removeEffect(id);
            player.potionEffects.add(id,duration,amp>3?amp*2:amp+3);
            break;
    }

}

Object.assign(organPlayerTickOnlyStrategies,dlcTickOnly);
Object.assign(organPlayerTickStrategies,dlcTick);
