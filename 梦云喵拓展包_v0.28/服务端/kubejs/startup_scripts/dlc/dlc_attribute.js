// priority: 10
StartupEvents.registry('attribute', event => {
    global.attributes.SWEETNESS = event.create('kubejs:sweetness').setDefaultValue(0.0).setMinimumValue(0.0).setMaximumValue(95.0);
    global.attributes.QIMAX = event.create('kubejs:qi_max').setDefaultValue(0.0).setMinimumValue(0.0).setMaximumValue(9999999.0);
})


ForgeModEvents.onEvent('net.minecraftforge.event.entity.EntityAttributeModificationEvent', event => {
    event.types.forEach(type => {
        event.add(type, global.attributes.SWEETNESS.get())
        event.add(type, global.attributes.QIMAX.get())
    })
})