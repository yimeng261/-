
global.dlc_effect= event =>{
    let player=event.entity;
    let effect=event.effectInstance.effect;
    let typeMap = getPlayerChestCavityTypeMap(player);

    let onlySet = new Set()
    if (typeMap.has('kubejs:player_effect_only')) {
        typeMap.get('kubejs:player_effect_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organPlayerEffectOnlyStrategies[organ.id](event, organ, effect)
            }
        })
    }
    if (typeMap.has('kubejs:player_effect')) {
        typeMap.get('kubejs:player_effect').forEach(organ => {
            organPlayerEffectStrategies[organ.id](event, organ, effect)
        })
    }
}

const organPlayerEffectStrategies={

}

const organPlayerEffectOnlyStrategies={
    'kubejs:wither_spine_claw':function(event,organ,effect){
        if(effect.descriptionId=='effect.minecraft.wither'){
            event.effectInstance.setDuration(0);
        }
    },
    'kubejs:darksteel_spine':function(event,organ,effect){
        if(!effect.isBeneficial()){
            event.effectInstance.setDuration(0);
        }
    },
    'kubejs:sculk_eye':function(event,organ,effect){
        if(effect.descriptionId=='effect.minecraft.darkness'){
            event.effectInstance.setDuration(0);
        }
    },
}
