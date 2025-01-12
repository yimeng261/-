/**
 * 获取某个半径内的生物
 * @param {Internal.Level} level
 * @param {Vec3} pos
 * @param {Number} radius
 * @returns {Array<Internal.LivingEntity>}
 */
function getLivingWithinRadius(level, pos, radius) {
    let area = new AABB.of(pos.x() - radius, pos.y() - radius, pos.z() - radius, pos.x() + radius, pos.y() + radius, pos.z() + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    let entityList = []
    entityAABBList.forEach(entity => {
        if (entity.position() && entity.isLiving() && entity.position().distanceTo(pos) <= radius) {
            entityList.push(entity)
        }
    })
    return entityList
}

StartupEvents.registry('item', event => {
    event.create('half_syrup').texture('dlc:organ/maple_syrup')
    event.create('half_jelly').texture('dlc:organ/jelly_muscle')
    event.create('half_lung').texture('dlc:organ/candy_lung')
    event.create('half_gingerMan').texture('dlc:organ/ginger_man')
    event.create('half_rib').texture('dlc:organ/candy_rib')
    event.create('half_kidney').texture('dlc:organ/candy_kidney')
    event.create('half_temperatureController').texture('dlc:organ/temperature_controller')
    event.create('half_recycleSystem').texture('dlc:organ/recycle_system')
    event.create('half_machineCore').texture('dlc:organ/machine_core')
    event.create('moonlight_staff','irons_spells_js:magic_sword')
    .displayName('月光大杖')
    .addDefaultSpell(SpellRegistry.STARFALL_SPELL,70)
    .tooltip(Text.of('想做你的傀儡，在你的指尖起舞').color('#fffbd0'))
    .texture('dlc:item/moonlight_staff')
    .addAdditionalAttribute('irons_spellbooks:spell_power', 'moonlightStaffSpellPower', 5, 'addition')
    .addAdditionalAttribute('irons_spellbooks:max_mana', 'moonlightStaffMana', 1000, 'addition')
    .addAdditionalAttribute('irons_spellbooks:mana_regen','moonlightStaffManaRegen',1,'addition')
    .addAdditionalAttribute('irons_spellbooks:cooldown_reduction','moonlightStaffCooldown',0.5,'addition')
    .attackDamageBaseline(8.0)
    .attackDamageBonus(3)
    .speedBaseline(-1)
    .speed(4.0)
    .maxDamage(2333)
    .rarity('epic')
});