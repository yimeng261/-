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

const dlcTick={
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

};

Object.assign(organPlayerTickOnlyStrategies,dlcTick);