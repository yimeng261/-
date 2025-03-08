// priority: 200

/**
 * 甜蜜之梦承伤事件
 * @param {Internal.LivingDamageEvent} event 
 * @returns 
 */
function findCandyPlayer(event) {
    let player = event.entity
    if(player.hasEffect('kubejs:sweet_shell')) return;
    let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 60)
    let candyPlayerList=[]
    let count=0;
    for(var e of entityList)
        if (e.hasEffect('kubejs:sweet_shell')&&e.isPlayer()) {
            candyPlayerList.push(e);
            count++;
        }
    if(!count) return;
    for(var e of candyPlayerList)
        e.attack(event.amount/count);
    event.amount=0;
}

function candyLungPlayerHurtByOthers(event) {
    /** @type {Internal.ServerPlayer} */
    let player = event.entity
    let itemMap = getPlayerChestCavityItemMap(player)
    if(itemMap.has('kubejs:candy_lung'))
    {
        event.amount*=0.8;
    }
}

function gingerManPlayerHurtByOthers(event) {
    let player = event.entity;
    let typeMap = getPlayerChestCavityTypeMap(player);
    let onlySet = new Set();
    let count = 0;
    let count_num =0;
    if (typeMap.has('kubejs:candy')) {
        typeMap.get('kubejs:candy').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                count++;
            }
            count_num++;
        })
        if(count >= 4 && !player.cooldowns.isOnCooldown('kubejs:ginger_man_totem'))
        {
            event.amount=0;
            player.addItemCooldown('kubejs:ginger_man_totem', 25*20);
            if (!player.hasEffect('kubejs:sweet_dream')) {
                player.potionEffects.add('kubejs:sweet_dream', 4 * 20 * count_num, count)
            }
        }
    }
}

function sugarRushPlayerHurtByOthers(event) {
    let player = event.entity
    if(player.hasEffect('kubejs:sugar_rush'))
    {
        let amp=player.getEffect('kubejs:sugar_rush').getAmplifier();
        event.amount*=(1-amp/(amp+1.5));
    }
}

function sweetPlayerHurtByOthers(event)
{
    let player = event.entity;
    let typeMap = getPlayerChestCavityTypeMap(player);
    let count = 0;
    let sweetness=player.getAttributeTotalValue('kubejs:sweetness');
    if (typeMap.has('kubejs:candy')) {
        typeMap.get('kubejs:candy').forEach(organ => {count++;})}
    if(count>=18)
    {
        player.invulnerableTime = 10 / (1+sweetness/35);
        if(event.amount>3000)
            event.amount=3000;
    }
    event.amount*=(1-sweetness/100);
}

function sweetShellPlayerHurtByOthers(event)
{
    let player = event.entity;
    if(!player.hasEffect('kubejs:sweet_shell')) return;
    let amp = player.getEffect('kubejs:sweet_shell').getAmplifier();
    event.amount*=(1-amp/16);
}

function nulsub(event,data){return;}

sweetDreamPlayerHurtByOthers = nulsub;

function dlc_sweetDreamPlayerHurtByOthers(event) {
    /** @type {Internal.ServerPlayer} */
    let player = event.entity
    if (player.hasEffect('kubejs:sweet_dream')) {
        let itemMap = getPlayerChestCavityItemMap(player);
        if (!itemMap.has('kubejs:candy_heart')) {
            return;
        }
        let sweetDreamPotion = player.getEffect('kubejs:sweet_dream')
        let damage = event.amount;
        if (sweetDreamPotion.getDuration() * (sweetDreamPotion.getAmplifier() + 1) < damage * 20) {
            player.removeEffect('kubejs:sweet_dream');
            if (itemMap.has('kubejs:candy_pancreas')) {
                player.potionEffects.add('minecraft:absorption', 20 * 30, 4)
            }
            event.amount = 0
            return;
        }
        let duration = Math.floor(sweetDreamPotion.getDuration() - damage * 20 * 2 / (sweetDreamPotion.getAmplifier() + 1));
        duration = Math.min(duration, 600 * 20)
        let amplifier = sweetDreamPotion.getAmplifier();
        player.removeEffect('kubejs:sweet_dream')
        player.potionEffects.add('kubejs:sweet_dream', duration, amplifier, false, false);
        event.amount = 0
        return;
    }

    if (event.amount >= 5 && !player.hasEffect('kubejs:sweet_dream')) {
        let itemMap = getPlayerChestCavityItemMap(player);
        if (!itemMap.has('kubejs:magic_hippocampus') || player.cooldowns.isOnCooldown(Item.of('kubejs:magic_hippocampus'))) {
            return;
        }
        let durationMulti = 1;
        let amplifierMulti = 0;
        player.cooldowns.addCooldown(Item.of('kubejs:magic_hippocampus'), 60)
        if (itemMap.has('kubejs:magic_muscle')) {
            durationMulti = durationMulti + itemMap.get('kubejs:magic_muscle').length
        }
        if (itemMap.has('kubejs:magic_spine')) {
            amplifierMulti = amplifierMulti + Math.floor(itemMap.get('kubejs:magic_spine').length / 2)
        }
        if (!player.hasEffect('kubejs:sweet_dream')) {
            player.potionEffects.add('kubejs:sweet_dream', 20 * 10 * durationMulti, amplifierMulti, false, false);
        }
    }
}