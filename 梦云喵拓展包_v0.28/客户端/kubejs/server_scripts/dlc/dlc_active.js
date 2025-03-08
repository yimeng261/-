// priority: 50
const dlcActiveOnly={
    'kubejs:gold_cup':function(player, organ, attributeMap){
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2 * maxCount/50);
        attributeMapValueAddition(attributeMap, global.MAX_MANA, maxCount/5);
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, maxCount/100);
        attributeMapValueAddition(attributeMap, global.ARMOR, maxCount/80);
    },
    'kubejs:spirits_bone':function(player, organ, attributeMap){
        let count = getPlayerMagicData(player).getMana()
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2 * count/660);
        attributeMapValueAddition(attributeMap, global.MANA_REGEN, count/3000);
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, count/150);
        attributeMapValueAddition(attributeMap, global.ARMOR, count/240);
    },
    'kubejs:machine_core':function(player, organ, attributeMap){
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + 200)
    },
    'kubejs:tree_heart':function(player, organ, attributeMap){
        let typeMap = getPlayerChestCavityTypeMap(player);
        let count = typeMap.get('kubejs:nature').length;
        attributeMapValueAddition(attributeMap, global.NATURE_SPELL_POWER, count*0.8);
    },
    'kubejs:chaos_tumor':function(player, organ, attributeMap){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if(Item.of(org).hasTag('kubejs:active_only')){
                organActiveOnlyStrategies[org.toString().slice(1,-1)](player, Item.of(org),attributeMap)
            }
        })
    },
    'kubejs:thunderstorm_feather':function(player, organ, attributeMap){
        let typeMap = getPlayerChestCavityTypeMap(player);
        let count = typeMap.get('kubejs:magic').length;
        attributeMapValueAddition(attributeMap, global.LIGHTNING_SPELL_DAMAGE, count*0.2);
    },
    'kubejs:bloodthorn_heart':function(player, organ, attributeMap){
        attributeMapValueAddition(attributeMap, global.BLOOD_SPELL_DAMAGE, 1);
    },
    'kubejs:flower_of_heart':function(player, organ, attributeMap){
        let count=getPlayerChestCavityTypeMap(player).get('kubejs:nature').length;
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, count*3);
    },
    'kubejs:phoenix_feather':function(player, organ, attributeMap){
        attributeMapValueAddition(attributeMap, global.FIRE_SPELL_POWER, 0.5);
    },
};

const dlcActive={
    'kubejs:recycle_system':function(player, organ, attributeMap){
        let count = 0;
        let typeMap = getPlayerChestCavityTypeMap(player);
        typeMap.get('kubejs:resource').forEach(organ => {count++});
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + 25*count);
    },
    'kubejs:chaos_tumor':function(player, organ, attributeMap){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if(Item.of(org).hasTag('kubejs:active'))
                organActiveStrategies[org.toString().slice(1,-1)](player, Item.of(org),attributeMap)
        })
    },
};

/**
 * 全局函数，用于更新玩家的激活效果状态
 * @param {Internal.ServerPlayer} player 
 */
global.dlcUpdatePlayerActiveStatus = player => {
    let typeMap = getPlayerChestCavityTypeMap(player)
    let uuid = String(player.getUuid())
    let attributeMap = new Map()
    // 重置玩家胸腔基础属性
    $ChestCavityUtil.evaluateChestCavity(player.getChestCavityInstance())
    player.persistentData.putInt(resourceCountMax, defaultResourceMax)
    player.persistentData.putInt(warpCountMax, defaultWarpMax)
    // 激活状态根据Tag区分并遍历可以用于激活的器官方法
    if (typeMap.has('kubejs:active')) {
        typeMap.get('kubejs:active').forEach(organ => {
            organActiveStrategies[organ.id](player, organ, attributeMap)
        })
    }
    let onlySet = new Set()
    if (typeMap.has('kubejs:active_only')) {
        typeMap.get('kubejs:active_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organActiveOnlyStrategies[organ.id](player, organ, attributeMap)
            }
        })
    }
    playerAttributeMap.set(uuid, attributeMap)
    attributeMap.forEach((value, key, map) => {
        player.modifyAttribute(global.ATTRIBUTE_MAP[key].key, key, value, global.ATTRIBUTE_MAP[key].operation)
    })
    let maxResourceCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
    updateResourceMaxCount(player, maxResourceCount)
    let maxWarpCount = player.persistentData.getInt(warpCountMax) ?? defaultWarpMax
    updateWarpMaxCount(player, maxWarpCount)
}

global.updatePlayerActiveStatus = global.dlcUpdatePlayerActiveStatus

Object.assign(organActiveOnlyStrategies,dlcActiveOnly);
Object.assign(organActiveStrategies,dlcActive);