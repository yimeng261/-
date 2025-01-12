// priority: 50

global.test=[]
global.DLC_SAFE_FALL_DISTANCE = {key: 'minecraft:generic.safe_fall_distance', name: 'kubejsSafeFallDistance', operation: 'addition' }


global.DLC_ATTRIBUTE_MAP = {
    'kubejsSafeFallDistance': global.DLC_SAFE_FALL_DISTANCE
}

global.DLC_SCORE_MAP = {
    'chestcavity:safe_fall_distance': Text.of('安全坠落高度'),
    'chestcavity:sweetness': Text.of('甜度'),
    'chestcavity:damageReduction': Text.of('伤害减免'),
    'chestcavity:qiMax':Text.of('气上限')
}

global.DLC_TYPE_MAP ={
    'kubejs:color': Text.join([Text.yellow('彩'),Text.blue('色')]),
    'kubejs:sculk':Text.of('幽匿').color('#0b616b'),
    'kubejs:cultivate':Text.of('修真').color('#70eabc'),
}

Object.assign(global.ATTRIBUTE_MAP, global.DLC_ATTRIBUTE_MAP);
Object.assign(global.SCORE_MAP, global.DLC_SCORE_MAP);
Object.assign(global.TYPE_MAP,global.DLC_TYPE_MAP);