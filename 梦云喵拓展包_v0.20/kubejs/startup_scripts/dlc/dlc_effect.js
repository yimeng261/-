// priority: 10

StartupEvents.registry('mob_effect', event => {
    event.create('sweet_shell')
        .beneficial()
        .color(Color.PINK_DYE);

    event.create('sugar_rush')
        .beneficial()
        .color(Color.PINK_DYE)
        .modifyAttribute('minecraft:generic.movement_speed','sugar_rush_att',0.05,'addition')
        .modifyAttribute('forge:step_height_addition','sugar_rush_att_1',1,'addition');

    event.create('sweet_whirlpool')
        .beneficial()
        .color(Color.PINK_DYE);

    event.create('pigment')
        .modifyAttribute('minecraft:generic.movement_speed','pigmentSlow',-0.6,'multiply_total')
        .beneficial()
        .color(Color.YELLOW_DYE);

    event.create('shock')
        .harmful()
        .color('#43f5ff');

    event.create('tree_blessing')
        .beneficial()
        .color('#a2bd63');

    event.create('auto_smelt')
        .beneficial()
        .color('#ff6b00');

    event.create('void_wings')
        .beneficial()
        .color('#a46ad8');

});
