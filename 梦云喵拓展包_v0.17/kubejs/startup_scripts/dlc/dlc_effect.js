// priority: 10
StartupEvents.registry('mob_effect', event => {
    event.create('sweet_shell')
        .beneficial()
        .color(Color.PINK_DYE)
    event.create('sugar_rush')
        .beneficial()
        .color(Color.PINK_DYE)
    event.create('sweet_whirlpool')
        .beneficial()
        .color(Color.PINK_DYE)
    event.create('pigment')
        .modifyAttribute('minecraft:generic.movement_speed','pigmentSlow',-0.6,'multiply_total')
        .beneficial()
        .color(Color.YELLOW_DYE)
});