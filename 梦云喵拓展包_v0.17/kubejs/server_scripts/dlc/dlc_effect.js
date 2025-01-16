

PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 10 != 0) return

    let itemMap = getPlayerChestCavityItemMap(player);
    let typeMap = getPlayerChestCavityTypeMap(player);

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

    if(itemMap.has('kubejs:temperature_controller'))
    {
        let temperature = ColdSweat.getTemperature(player, 'body');
        if(temperature>=50)
            ColdSweat.setTemperature(player, 'core', 50);
        else if(temperature<=-50)
            ColdSweat.setTemperature(player, 'core', -50);
    }
    
    if (itemMap.has('kubejs:sculk_eye'))
        {
            player.removeEffect('minecraft:darkness');
            player.potionEffects.add('minecraft:night_vision',15 * 20 - 1 ,0);
        }
    
    if (player.age % 15 != 0) return

    if (itemMap.has('kubejs:candy_kidney')) {
        let count = 0;
        let onlySet = new Set();
        player.removeAttribute('minecraft:generic.movement_speed', 'sugar_rush_att');
        player.removeAttribute('forge:step_height_addition','sugar_rush_att_1');
        typeMap.get('kubejs:candy').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                count++;
            }
        })
        
        if(count>=5)
        {
            player.modifyAttribute('forge:step_height_addition','sugar_rush_att_1',1,'addition');
            player.modifyAttribute('minecraft:generic.movement_speed','sugar_rush_att',0.05,'addition');
            player.potionEffects.add('kubejs:sugar_rush', 15 * 20 - 1 , count-1);
        }
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
    
})
