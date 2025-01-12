// priority: 50

let originalUpdatePlayerActiveStatus = global.updatePlayerActiveStatus

function dlcUpdate(player)
{
    let sweetness = player.getAttributeTotalValue('kubejs:sweetness');
    let typeMap = getPlayerChestCavityTypeMap(player);
    let itemMap = getPlayerChestCavityItemMap(player);
    let count = 0;

    if (typeMap.has('kubejs:candy')) {
        typeMap.get('kubejs:candy').forEach(organ => {count++;})}
    
    if(count>=10)
    {
        player.modifyAttribute('irons_spellbooks:spell_power','sweetSpellCommon',1+(sweetness/45),'addition');
        player.modifyAttribute('kubejs:candy_spell_power','sweetSpell',1+(sweetness/25),'multiply_total');
        player.modifyAttribute('minecraft:generic.max_health','sweetHP',1+(sweetness/25),'multiply_total');
    }
    else
    {
        player.removeAttribute('irons_spellbooks:spell_power','sweetSpellCommon');
        player.removeAttribute('kubejs:candy_spell_power','sweetSpell');
        player.removeAttribute('minecraft:generic.max_health','sweetHP');
    }

    count=0;

    if (typeMap.has('kubejs:cultivate')) {
        typeMap.get('kubejs:cultivate').forEach(organ => {count++;})}

    if(itemMap.has('kubejs:neidan')){
        player.abilities.mayfly = true;
        player.onUpdateAbilities();
        player.modifyAttribute('irons_spellbooks:spell_power','neidan',count/10,'addition');
        count+=15;
    }
    else{
        if(!player.isCreative())
            player.abilities.mayfly = false;
        player.onUpdateAbilities();
        player.removeAttribute('irons_spellbooks:spell_power','neidan');
    }

    if(itemMap.has('kubejs:dantian_up')){
        player.modifyAttribute('kubejs:qiMax','dantian_up',2,'multiply_total')
        count+=10;
    }
    else{
        player.removeAttribute('kubejs:qiMax','dantian_up');
    }

    if(itemMap.has('kubejs:dantian_middle')){
        player.modifyAttribute('kubejs:qiMax','dantian_middle',2,'multiply_total');
        count+=10;
    }
    else{
        player.removeAttribute('kubejs:qiMax','dantian_middle');
    }

    if(itemMap.has('kubejs:dantian_down')){
        player.modifyAttribute('kubejs:qiMax','dantian_down',2,'multiply_total');
        count+=10;
    }
    else{
        player.removeAttribute('kubejs:qiMax','dantian_down');
    }

    if(itemMap.has('kubejs:yuanshen')){
        player.modifyAttribute('kubejs:qiMax','yuanshen',4,'multiply_total');
        count+=20;
        count*=2;
        player.modifyAttribute('irons_spellbooks:spell_power','yuanshen',2.0,'multiply_total');
    }
    else{
        player.removeAttribute('kubejs:qiMax','yuanshen');
        player.removeAttribute('irons_spellbooks:spell_power','yuanshen');
    }

    if(itemMap.has('kubejs:neidan')){
        if(!(itemMap.has('kubejs:dantian_up')&&itemMap.has('kubejs:dantian_middle')&&itemMap.has('kubejs:dantian_down'))){
            player.tell('内丹前置器官为上中下三个丹田，请补齐，否则将在20秒后身体崩坏');
            Utils.server.scheduleInTicks(20*20,event=>{
                if(!(itemMap.has('kubejs:dantian_up')&&itemMap.has('kubejs:dantian_middle')&&itemMap.has('kubejs:dantian_down')))
                    player.kill();
            });
        }
    }

    if(itemMap.has('kubejs:yuanshen')){
        if(!itemMap.has('kubejs:neidan')){
            player.tell('元神前置器官为内丹，请补齐，否则将在20秒后身体崩坏');
            Utils.server.scheduleInTicks(20*20,event=>{
                if(!itemMap.has('kubejs:neidan'))
                    player.kill();
            });
        }
    }

    if(typeMap.has('kubejs:cultivate')&&(itemMap.has('kubejs:random_tumor')||typeMap.has('kubejs:infected')||typeMap.has('kubejs:warp'))){
        player.tell('道躯无暇，不容禁忌/突变之物\n（修真器官不能与禁忌器官和肿瘤器官共存，请取下其中一种，否则将在20秒后身体崩坏）');
        Utils.server.scheduleInTicks(20*20,event=>{
            if(typeMap.has('kubejs:cultivate')&&(itemMap.has('kubejs:random_tumor')||typeMap.has('kubejs:infected')||typeMap.has('kubejs:warp')))
                player.kill();
        });
    }

    if(typeMap.has('kubejs:cultivate')&&typeMap.has('kubejs:machine')){
        player.tell('机巧如此，甚是难得');
    }

    let qiMax = player.getAttributeTotalValue('kubejs:qiMax');
    
    player.persistentData.putInt('qiRecover', count+qiMax/600);

    player.modifyAttribute('irons_spellbooks:spell_power','qi',qiMax/15000,'addition');

}

function initNumbers(player){
    player.persistentData.putInt('damageCount', 0);
    player.persistentData.putInt('ageRecord',player.age);
    player.persistentData.putInt('resourceRecord', 0);
    player.persistentData.putInt('qi', 0);
}

global.updatePlayerActiveStatus = player =>{
    dlcUpdate(player);
    updateDlcBar(player,0,0,0,false);
    originalUpdatePlayerActiveStatus(player);
}

PlayerEvents.respawned((event)=>{
    initNumbers(event.player);
    dlcUpdate(event.player);
    event.player.potionEffects.add('minecraft:instant_health',200,5);
})

PlayerEvents.loggedIn(event=>{
    initNumbers(event.player);
    dlcUpdate(event.player);
    event.player.potionEffects.add('minecraft:instant_health',200,5);
})

PlayerEvents.loggedOut((event)=>{
    let player=event.player;
    
    let count = player.persistentData.getInt('damageCount');
    player.persistentData.putInt('ageRecord',player.age);
    if(count>0)
    {
        player.attack(DamageSource.playerAttack(player),count*20);
        player.persistentData.putInt('damageCount',0);
        player.removeAttribute('minecraft:generic.attack_damage','damageCounter');
    }
})

PlayerEvents.inventoryClosed((event) => {
    let player = event.player
    if (!player.mainHandItem.hasTag('kubejs:chest_opener') && !player.offHandItem.hasTag('kubejs:chest_opener')) {
        return
    }
    dlcUpdate(player);
});

PlayerEvents.spellOnCast((event)=>{
    let player = event.player;
    
    let qi = player.persistentData.getInt('qi')
    let qiMax = player.getAttributeValue('kubejs:qiMax');
    let cost = event.getManaCost();
    
    if(qi>cost*8){
        event.setSpellLevel(event.spellLevel+qiMax/8000);
        player.persistentData.putInt('qi',qi-cost*8);
    }
})