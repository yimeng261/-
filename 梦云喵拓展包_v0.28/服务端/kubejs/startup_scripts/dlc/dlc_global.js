// priority: 10
global.EFFECTS=[];
global.smeltingMap=new Map();
global.DLC_SAFE_FALL_DISTANCE = {key: 'minecraft:generic.safe_fall_distance', name: 'kubejsSafeFallDistance', operation: 'addition' }
global.NATURE_SPELL_POWER = {key: 'irons_spellbooks:nature_spell_power', name:'kubejsNatureSpellPower', operation: 'addition'}
global.LIGHTNING_SPELL_DAMAGE = { key: 'irons_spellbooks:lightning_spell_power', name: 'kubejsLightningSpellDamage', operation: 'addition' }

global.DLC_ATTRIBUTE_MAP = {
    'kubejsSafeFallDistance': global.DLC_SAFE_FALL_DISTANCE,
    'kubejsNatureSpellPower': global.NATURE_SPELL_POWER,
    'kubejsLightningSpellDamage': global.LIGHTNING_SPELL_DAMAGE,
}

global.DLC_SCORE_MAP = {
    'chestcavity:safe_fall_distance': Text.of('安全坠落高度'),
    'chestcavity:sweetness': Text.of('甜度'),
    'chestcavity:damageReduction': Text.of('伤害减免'),
    'chestcavity:qi_max':Text.of('气上限')
}

global.DLC_TYPE_MAP ={
    'kubejs:color': Text.join([Text.yellow('彩'),Text.blue('色')]),
    'kubejs:sculk':Text.of('幽匿').color('#0b616b'),
    'kubejs:cultivate':Text.of('修真').color('#70eabc'),
    'kubejs:nature':Text.of('自然').color('#a2bd63'),
    'kubejs:star':Text.of('星界').color('#a46ad8'),
    'kubejs:chaos':Text.of('混沌').color('#ff400d'),
    'kubejs:smelt':Text.of('下界/熔铸').color('#ff6b00'),
    'kubejs:player_effect_only':Text.of('唯一玩家效果添加').gold(),
    'kubejs:player_effect':Text.of('玩家效果添加').gold()
}

global.DLC_organCharmNbtMap={
    'kubejs:tree_heart_template': { type: 'place', placeTask: { targetblock: ['#minecraft:saplings'], counter: 0, consume: true, placeAmount: 32 }, targetOrgan: 'kubejs:tree_heart' },
    'kubejs:origin_of_tumor': { type: 'kill', killTask: { mobType: 'biomancy:hungry_flesh_blob', killAmount: 10, counter: 0 }, targetOrgan: 'kubejs:sarcoma_core' },
    'kubejs:flower_heart': { type: 'kill', killTask: { mobType: 'bosses_of_mass_destruction:void_blossom', killAmount: 15, counter: 0 }, targetOrgan: 'kubejs:flower_of_heart' },
    
}

Object.assign(global.organCharmNbtMap,global.DLC_organCharmNbtMap);
Object.assign(global.ATTRIBUTE_MAP, global.DLC_ATTRIBUTE_MAP);
Object.assign(global.SCORE_MAP, global.DLC_SCORE_MAP);
Object.assign(global.TYPE_MAP,global.DLC_TYPE_MAP);