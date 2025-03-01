// priority: 100

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('sweet_shell')
        .setCastTime(10)
        .setCooldownSeconds(40)
        .setBaseManaCost(100)
        .setManaCostPerLevel(10)
        .setCastType('long')
        .setSchool('kubejs:candy')
        .setMinRarity('common')
        .setMaxLevel(15)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.sweet_shell(ctx)
        });

    event.create('sweet_whirlpool')
        .setCastTime(40)
        .setCooldownSeconds(180)
        .setBaseManaCost(300)
        .setManaCostPerLevel(40)
        .setCastType('long')
        .setSchool('kubejs:candy')
        .setMinRarity('common')
        .setMaxLevel(10)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.sweet_whirlpool(ctx)
        });

    event.create('better_spectral_hammer')
        .setBaseManaCost(15)
        .setCastTime(0)
        .setManaCostPerLevel(5)
        .setBaseSpellPower(1)
        .setSpellPowerPerLevel(1)
        .setSchool('irons_spellbooks:evocation')
        .setMaxLevel(5)
        .setCooldownSeconds(2)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.betterHammer(ctx)
        });
})


