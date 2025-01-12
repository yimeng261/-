// priority: 1
StartupEvents.registry('item', event => {
    /**
     * 
     * @param {Organ} organ 
     * @returns {Internal.BasicItemJS$Builder}
     */
    function registerOrgan(organ) {
        global.ORGAN_LIST.push(organ)
        let builder = event.create(organ.itemID).maxStackSize(organ.maxStackSize).tag('kubejs:organ').group("kubejs.dlc")
        if (organ.ctrlTextLines.length > 0) {
            builder.tag('chestcavity:active')
        }
        if (organ.altTextLines.length > 0) {
            builder.tag('chestcavity:special')
        }
        return builder
    }

    /**
     * 
     * @param {Organ} organ 
     */
    global.ORGAN_LIST.forEach(organ=>{
        if(organ.itemID==='kubejs:candy_heart')
        {
            while (organ.organScores.pop() != undefined);
            while (organ.shiftTextLines.pop() != undefined);
            organ
            .addScore('nutrition', 1.5)
            .addScore('sweetness',20)
            .addScore('health',5)
            .build();
        }
        else if(organ.itemID==='kubejs:candy_stomach')
        {
            while (organ.organScores.pop() != undefined);
            while (organ.shiftTextLines.pop() != undefined);
            organ
            .addScore('nutrition', 1.5)
            .addScore('digestion', 2)
            .addScore('sweetness',15).build();
        }
        else if(organ.itemID==='kubejs:candy_pancreas')
        {
            while (organ.organScores.pop() != undefined);
            while (organ.shiftTextLines.pop() != undefined);
            organ
            .addScore('endurance', 2.5)
            .addScore('health', 0.5)
            .addScore('sweetness',10).build();
        }
        else if(organ.itemID==='kubejs:color_palette')
        {
            while(organ.altTextLines.pop()!=undefined);
            organ
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray('手持'),Text.gold('大艺术家法杖'),Text.gray('造成法术伤害时，如果法术为：')])
            .addTextLines('alt', [LEADING_SYMBOL, Text.green('毒箭射击'),Text.gray('、'),Text.gold('火焰箭'),Text.gray('、'),Text.blue('冰锥'),Text.gray('、'),Text.darkRed('猩红之刺（猩红刺狱）'),Text.gray('、'),Text.of('荆棘之梦').color('#e8a0dc'),Text.gray('、'),Text.darkPurple('魔法箭')])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray('会造成'),Text.gold('当前法力值/30（色彩状态下为min(28-色彩效果等级,20))'),Text.gray('的额外伤害')])
        }
    });

    registerOrgan(new Organ('kubejs:candy_lung')
        .addScore('burning_point', -5)
        .addScore('health', -0.25)
        .addScore('breath_recovery', 0.5)
        .addScore('nutrition',0.5)
        .addScore('sweetness', 4)
        .addTextLines('default', [Text.gray('空气也变得甜蜜')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('吸收20%伤害')])
        .build())
        .texture('dlc:organ/candy_lung')
        .tag('kubejs:lung')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(4).saturation(3).alwaysEdible()})
        .displayName('棉花糖肺');

    registerOrgan(new Organ('kubejs:ginger_man_totem')
        .addScore('health', -0.25)
        .addScore('breath_recovery', 1.5)
        .addScore('nutrition',0.5)
        .addScore('sweetness', 2)
        .addTextLines('default', [Text.gray('刀剑劈开的，并非身躯')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('在糖果器官种类大于等于4时，可以抵挡一次致命攻击\n根据糖果器官的种类及数量提供一次糖果之梦效果')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('冷却为25s')])
        .build())
        .texture('dlc:organ/ginger_man')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(6).saturation(2.5).alwaysEdible()})
        .displayName('姜饼人替身');
    
    registerOrgan(new Organ('kubejs:jelly_muscle')
        .addScore('burning_point', -1)
        .addScore('strength', 2.5)
        .addScore('speed',2.5)
        .addScore('knockback_resistant', 3)
        .addScore('impact_resistant', 3)
        .addScore('nutrition',0.5)
        .addScore('safe_fall_distance',8)
        .addScore('sweetness', 1)
        .addTextLines('default', [Text.gray('弹弹的')])
        .build())
        .texture('dlc:organ/jelly_muscle')
        .tag('kubejs:muscle')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(3).saturation(1).alwaysEdible()})
        .displayName('果冻肌肉');

    registerOrgan(new Organ('kubejs:maple_syrup')  //记得修改数量计算方式
        .addScore('health', 0.4)
        .addScore('nerves', 0.4)
        .addScore('breath_recovery', 0.4)
        .addScore('strength', 0.4)
        .addScore('filtration', 0.4)
        .addScore('detoxification', 0.4)
        .addScore('defense', 0.2)
        .addScore('nutrition', 0.2)
        .addScore('endurance', 0.4)
        .addScore('digestion', 0.2)
        .addScore('metabolism', 0.4)
        .addScore('breath_capacity', 0.4)
        .addScore('speed', 0.4)
        .addScore('burning_point', -2)
        .addScore('sweetness', 1)
        .addTextLines('default', [Text.gray('魔法使的糖果心，当然流动着'),Text.of('糖').color('#e8a0dc')])
        .build())
        .texture('dlc:organ/maple_syrup')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(3).saturation(2).alwaysEdible()})
        .displayName('枫糖浆');

    registerOrgan(new Organ('kubejs:candy_rib')  //记得修改数量计算方式
        .addScore('strength', 0.8)
        .addScore('defense', 2.5)
        .addScore('burning_point', -4)
        .addScore('sweetness', 4)
        .addTextLines('default', [Text.gray('以'),Text.of('糖').color('#e8a0dc'),Text.gray('克刚')])
        .build())
        .texture('dlc:organ/candy_rib')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(4).saturation(1.5).alwaysEdible()})
        .displayName('橡皮糖肋骨');

    
    registerOrgan(new Organ('kubejs:candy_kidney')
        .addScore('detoxification', 1)
        .addScore('filtration', 2.25)
        .addScore('nutrition', 1)
        .addScore('sweetness', 1.5)
        .addScore('burning_point', -1)
        .addTextLines('default', [Text.gray('你前所未有的清醒')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('拥有糖果器官种类大于等于5时，提供糖果冲刺效果')])
        .build())
        .texture('dlc:organ/candy_kidney')
        .tag('kubejs:kidney')
        .tag('kubejs:candy')
        .tag('kubejs:food')
        .food(food => {food.hunger(2).saturation(1).alwaysEdible()})
        .displayName('冰糖肾脏');
    
    registerOrgan(new Organ('kubejs:sculk_core')
        .addScore('health', 6.0)
        .addScore('endurance', 6.0)
        .addScore('nerves', 4)
        .addTextLines('default', [Text.gray('它听见了')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('使用主动按键可在对应方向连续唤起3次监守者音爆，玩家经验等级及幽匿器官数量给予额外伤害加成')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('对途径的每个目标造成多段音爆伤害，对指向目标产生额外伤害')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('冷却30s，该音爆每击中一次敌人冷却降低3s')])
        .build())
        .texture('dlc:organ/sculk_core')
        .tag('kubejs:heart')
        .tag('kubejs:sculk')
        .tag('kubejs:key_pressed')
        .displayName('幽匿核心');

    registerOrgan(new Organ('kubejs:sculk_eye')
        .addScore('nerves', 12.0)
        .addTextLines('default', [Text.gray('即使已经退化，它仍想念地上的风景')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('获得夜视效果，并不再受黑暗效果影响')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('存在幽匿核心时，根据音爆击中的敌人数量给予玩家深渊庇佑效果以及数值提升')])
        .build())
        .texture('dlc:organ/sculk_eye')
        .tag('kubejs:heart')
        .tag('kubejs:sculk')
        .displayName('幽匿之眼');

    registerOrgan(new Organ('kubejs:sculk_lamp')
        .addScore('nerves', 8)
        .addScore('speed', 1.5)
        .addTextLines('default', [Text.gray('它已经燃烧了很久...')])
        .addTextLines('default', [Text.of('也会继续燃烧下去').color('#0b616b')])
        .build())
        .texture('dlc:organ/sculk_lamp')
        .tag('kubejs:relics')
        .tag('kubejs:sculk')
        .displayName('幽匿魂盏');

    registerOrgan(new Organ('kubejs:temperature_controller')
        .addScore('strength', 1.5)
        .addScore('filtration', 1.5)
        .addTextLines('default', [Text.gray('恒温系统！')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('当体温高于50度时，提供额外的心火/融火效果，并将体温保持在50度')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('该器官提供的心火/融火效果等级不会超过100')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('安装该器官后，心火/融火效果时间不会超过1200s')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('当体温低于-50度时，提供额外的法强，并将体温保持在-50度')])
        .build())
        .texture('dlc:organ/temperature_controller')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:flame')
        .tag('kubejs:ice')
        .tag('kubejs:machine')
        .displayName('温度控制系统');

    registerOrgan(new Organ('kubejs:gold_cup')
        .addScore('strength', 5)
        .addScore('health', 1.5)
        .addTextLines('default', [Text.gray('财富，象征着权力')])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray('激活后，根据资源点数上限及资源点数提供基础数值加成')])
        .build())
        .texture('dlc:organ/gold_cup')
        .tag('kubejs:active_only')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:resource')
        .displayName('金酒之杯');
    
    registerOrgan(new Organ('kubejs:recycle_system')
        .addScore('strength', -0.5)
        .addScore('health', -1.5)
        .addScore('filtration', 5)
        .addTextLines('default', [Text.gray('高效')])
        .addTextLines('ctrl',[LEADING_SYMBOL, Text.gray('激活后根据体内资源器官数量增加资源点数上限')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('每杀死一个生物，获得5资源点数')])
        .build())
        .texture('dlc:organ/recycle_system')
        .tag('kubejs:loot_entity')
        .tag('kubejs:active')
        .tag('kubejs:machine')
        .tag('kubejs:resource')
        .displayName('残骸回收系统');

    registerOrgan(new Organ('kubejs:carry_crayon')
        .addScore('strength', 1.5)
        .addScore('speed', 0.5)
        .addTextLines('default', [Text.gray('不掉色...吧？')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('提供额外色彩效果等级')])
        .build())
        .texture('dlc:organ/carry_crayon')
        .tag('kubejs:magic')
        .tag('kubejs:color')
        .displayName('随身蜡笔');

    registerOrgan(new Organ('kubejs:pigment_bubble')
        .addScore('breath_recovery', -1.0)
        .addScore('speed', -0.5)
        .addTextLines('default', [Text.gray('颜料泡泡，发射吧！')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('按下主动技能按键，为半径30格所有生物添加颜料束缚效果')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('使生物行动缓慢且易伤，并取消生物无敌时间')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('提供额外色彩效果等级')])
        .build())
        .texture('dlc:organ/pigment_bubble')
        .tag('kubejs:key_pressed')
        .tag('kubejs:magic')
        .tag('kubejs:color')
        .displayName('颜料泡泡');

    registerOrgan(new Organ('kubejs:spirits_bone')
        .addScore('defense', 8)
        .addTextLines('default', [Text.gray('魔力锻体')])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray('激活后根据魔力上限提供基础数值')])
        .build())
        .texture('dlc:organ/spirits_bone')
        .tag('kubejs:active_only')
        .tag('kubejs:color')
        .tag('kubejs:magic')
        .displayName('束灵骨');

    registerOrgan(new Organ('kubejs:disaster_source')
        .addScore('defense', -8)
        .addTextLines('default', [Text.gray('共赴灭亡')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('累计所受伤害，并根据所受伤害提高攻击力')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('在20秒不受伤害或累计值大于200后受到下一次伤害时，或登出时')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('会重置累计值并对玩家和直接攻击者造成1次伤害值等于累计值*20的伤害')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('如果没有直接攻击者，则将该伤害平分给玩家附近8格的生物（包括玩家）')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('每次重生或进入游戏会重置累计值')])
        .build())
        .texture('dlc:organ/disaster_source')
        .displayName('灾难之源');

    registerOrgan(new Organ('kubejs:machine_core')
        .addScore('health', 3)
        .addTextLines('default', [Text.gray('资源，火焰与机器')])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray('激活后增加200点资源上限')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('根据当前资源点数获得心火/熔火效果')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('根据每秒资源点数变化量提供基础数值加成')])
        .build())
        .texture('dlc:organ/machine_core')
        .tag('kubejs:player_tick_only')
        .tag('active_only')
        .tag('kubejs:machine')
        .tag('kubejs:resource')
        .displayName('机械核心');
    
    registerOrgan(new Organ('kubejs:jingmai')  //记得修改数量计算方式
        .addScore('health', 0.4)
        .addScore('nerves', 0.6)
        .addScore('breath_recovery', 0.4)
        .addScore('strength', 0.4)
        .addScore('filtration', 0.4)
        .addScore('detoxification', 0.4)
        .addScore('defense', 0.2)
        .addScore('nutrition', 0.2)
        .addScore('endurance', 0.4)
        .addScore('digestion', 0.2)
        .addScore('metabolism', 0.4)
        .addScore('breath_capacity', 0.4)
        .addScore('speed', 0.4)
        .addScore('burning_point', 1)
        .addScore('qiMax', 5)
        .addTextLines('default', [Text.gray('内属于腑脏，外络于肢节')])
        .build())
        .texture('dlc:organ/jingmai')
        .tag('kubejs:cultivate')
        .displayName('经脉');

    registerOrgan(new Organ('kubejs:dantian_up')
        .addScore('health', 2.0)
        .addScore('strength', 2.0)
        .addScore('nerves', 9.0)
        .addScore('qiMax', 20)
        .addTextLines('default', [Text.gray('藏神之府')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('气的上限提升至3倍,恢复速度增加')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('内丹的前置器官')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('缓慢在体内生成经脉')])
        .build())
        .texture('dlc:organ/dantian_up')
        .tag('kubejs:cultivate')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:heart')
        .displayName('上丹田');

    registerOrgan(new Organ('kubejs:dantian_middle')
        .addScore('health', 9.0)
        .addScore('strength', 2.0)
        .addScore('nerves', 2.0)
        .addScore('qiMax', 40)
        .addTextLines('default', [Text.gray('藏气之府')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('气的上限提升至3倍,恢复速度增加')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('内丹的前置器官')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('缓慢在体内生成经脉')])
        .build())
        .texture('dlc:organ/dantian_middle')
        .tag('kubejs:cultivate')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:heart')
        .displayName('中丹田');

    registerOrgan(new Organ('kubejs:dantian_down')
        .addScore('health', 2.0)
        .addScore('strength',9.0)
        .addScore('nerves', 2.0)
        .addScore('qiMax', 20)
        .addTextLines('default', [Text.gray('藏精之府')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('气的上限提升至3倍,恢复速度增加')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('内丹的前置器官')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('缓慢在体内生成经脉')])
        .build())
        .texture('dlc:organ/dantian_down')
        .tag('kubejs:cultivate')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:heart')
        .displayName('下丹田');

    registerOrgan(new Organ('kubejs:yuanshen')
        .addScore('health', 15.0)
        .addScore('nerves', 12.0)
        .addScore('strength', 8.0)
        .addScore('qiMax', 50)
        .addTextLines('default', [Text.gray('内念不萌，外想不入，独我自主')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('气的上限提升至5倍且恢复速度大幅提升，法术强度提升至3倍')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('释放法术时花费等于法术消耗5倍的气对法术进行升级或超限')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('提升等级等于floor(气上限/8000)')])
        .build())
        .texture('dlc:organ/yuanshen')
        .tag('kubejs:heart')
        .tag('kubejs:cultivate')
        .displayName('元神');

    registerOrgan(new Organ('kubejs:neidan')
        .addScore('health', 15.0)
        .addScore('nerves', 12.0)
        .addScore('strength', 8.0)
        .addScore('qiMax', 50)
        .addTextLines('default', [Text.gray('炼气化神，炼神还虚')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('根据体内修真器官数量提升法术强度，气的恢复速度增加')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('消耗气可进行飞行')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray('元神的前置器官')])
        .build())
        .texture('kubejs:item/organs/alex/sunbird_crystals')
        .tag('kubejs:heart')
        .tag('kubejs:cultivate')
        .displayName('内丹');
});