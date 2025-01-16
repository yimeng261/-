// priority: 10
StartupEvents.registry('minecraft:item', event => {
    event.create('the_preservation_of_civilization', 'basic')
        .texture('dlc:curios/the_preservation_of_civilization')
        .maxStackSize(1)
        .tooltip(Text.darkGray('小小的黑色王冠'))
        .tooltip('将攻击伤害转换为原版魔法伤害，并额外附带20%真伤')
        .tag('curios:head')
        .tag('itemborders:diamond')
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true))
        .displayName('文明的存续')
});