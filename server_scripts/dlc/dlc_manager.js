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
        player.modifyAttribute('irons_spellbooks:spell_power','sweetSpellCommon',(sweetness/45),'addition');
        player.modifyAttribute('kubejs:candy_spell_power','sweetSpell',(sweetness/25),'addition');
        player.modifyAttribute('minecraft:generic.max_health','sweetHP',(sweetness/25),'multiply_total');
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
        player.abilities.flyingSpeed=0.1;
        player.onUpdateAbilities();
        player.modifyAttribute('irons_spellbooks:spell_power','neidan',count/10,'addition');
        player.persistentData.putBoolean('neidan',true);
        count+=15;
    }
    else{
        if(!player.isCreative()&&player.persistentData.getBoolean('neidan')){
            player.abilities.mayfly = false;
            player.persistentData.putBoolean('neidan',false);
        }
        player.onUpdateAbilities();
        player.removeAttribute('irons_spellbooks:spell_power','neidan');
    }

    if(itemMap.has('kubejs:dantian_up')){
        player.modifyAttribute('kubejs:qi_max','dantian_up',1.5,'multiply_total')
        count+=8;
    }
    else{
        player.removeAttribute('kubejs:qi_max','dantian_up');
    }

    if(itemMap.has('kubejs:dantian_middle')){
        player.modifyAttribute('kubejs:qi_max','dantian_middle',1.5,'multiply_total');
        count+=8;
    }
    else{
        player.removeAttribute('kubejs:qi_max','dantian_middle');
    }

    if(itemMap.has('kubejs:dantian_down')){
        player.modifyAttribute('kubejs:qi_max','dantian_down',1.5,'multiply_total');
        count+=8;
    }
    else{
        player.removeAttribute('kubejs:qi_max','dantian_down');
    }

    if(itemMap.has('kubejs:yuanshen')){
        player.modifyAttribute('kubejs:qi_max','yuanshen',3,'multiply_total');
        count+=15;
        count*=2;
        player.modifyAttribute('irons_spellbooks:spell_power','yuanshen',1,'multiply_total');
    }
    else{
        player.removeAttribute('kubejs:qi_max','yuanshen');
        player.removeAttribute('irons_spellbooks:spell_power','yuanshen');
    }

    if(organCount(itemMap,'kubejs:dantian_down')!=organCount(itemMap,'kubejs:dantian_middle')||organCount(itemMap,'kubejs:dantian_down')!=organCount(itemMap,'kubejs:dantian_up')){
        player.tell('丹田有缺\n上中下丹田数量不一致，请在20秒内调整，否则身体将崩坏');
        Utils.server.scheduleInTicks(20*20,event=>{
            let itemMap = getPlayerChestCavityItemMap(player);
            if(organCount(itemMap,'kubejs:dantian_down')!=organCount(itemMap,'kubejs:dantian_middle')||organCount(itemMap,'kubejs:dantian_down')!=organCount(itemMap,'kubejs:dantian_up'))
                player.kill();
        });
    }
    if(itemMap.has('kubejs:neidan')){
        if(!itemMap.has('kubejs:dantian_up')){
            player.tell('内丹前置器官为上中下三个丹田，请补齐，否则将在20秒后身体崩坏');
            Utils.server.scheduleInTicks(20*20,event=>{
                let itemMap = getPlayerChestCavityItemMap(player);
                if(itemMap.has('kubejs:neidan')&&!itemMap.has('kubejs:dantian_up'))
                    player.kill();
            });
        }
    }

    if(itemMap.has('kubejs:chaos_tumor')&&itemMap.get('kubejs:chaos_tumor').length>3){
        player.tell('不可安装3个以上混沌肿瘤，请取下，否则将在20秒后身体崩坏');
        Utils.server.scheduleInTicks(20*20,event=>{
            let itemMap = getPlayerChestCavityItemMap(player);
            if(itemMap.has('kubejs:chaos_tumor')&&itemMap.get('kubejs:chaos_tumor').length>3)
                player.kill();
        });
    }

    if(organCount(itemMap,'kubejs:neidan')>organCount(itemMap,'kubejs:dantian_down')*2){
        player.tell('内丹数量过多（不可超出上/中/下丹田数目*2），请在20秒内调整，否则身体将崩坏')
        Utils.server.scheduleInTicks(20*20,event=>{
            let itemMap = getPlayerChestCavityItemMap(player);
            if(organCount(itemMap,'kubejs:neidan')>organCount(itemMap,'kubejs:dantian_down')*2)
                player.kill();
        });
    }

    if(itemMap.has('kubejs:yuanshen')){
        if(organCount(itemMap,'kubejs:neidan')<organCount(itemMap,'kubejs:yuanshen')){
            player.tell('元神前置器官为内丹,且元神数量不得超过内丹，请补齐，否则将在20秒后身体崩坏');
            Utils.server.scheduleInTicks(20*20,event=>{
                let itemMap = getPlayerChestCavityItemMap(player);
                if(organCount(itemMap,'kubejs:neidan')<organCount(itemMap,'kubejs:yuanshen'))
                    player.kill();
            });
        }
    }

    if(typeMap.has('kubejs:cultivate')&&(itemMap.has('kubejs:random_tumor')||typeMap.has('kubejs:infected')||typeMap.has('kubejs:warp')||typeMap.has('kubejs:chaos'))){
        player.tell('道躯无暇，不容禁忌/突变之物\n（修真器官不能与禁忌、肿瘤以及混沌器官共存，请取下其中一种，否则将在20秒后身体崩坏）');
        Utils.server.scheduleInTicks(20*20,event=>{
            let itemMap = getPlayerChestCavityItemMap(player);
            let typeMap = getPlayerChestCavityTypeMap(player);
            if(typeMap.has('kubejs:cultivate')&&(itemMap.has('kubejs:random_tumor')||typeMap.has('kubejs:infected')||typeMap.has('kubejs:warp')||typeMap.has('kubejs:chaos')))
                player.kill();
        });
    }

    if(itemMap.has('kubejs:tree_body')){
        player.modifyAttribute('minecraft:generic.max_health','tree_body_health',0.5,'multiply_total');
    }else{
        player.removeAttribute('minecraft:generic.max_health','tree_body_health');
    }

    let qiMax = player.getAttributeTotalValue('kubejs:qi_max');
    
    player.persistentData.putInt('qiRecover', count+qiMax/600);

    player.modifyAttribute('irons_spellbooks:spell_power','qi',qiMax/15000,'addition');

}

function initNumbers(player){
    player.persistentData.putInt('damageCount', 0);
    player.persistentData.putInt('ageRecord',player.age);
    player.persistentData.putInt('resourceRecord', 0);
    player.persistentData.putInt('qi', 0);
    player.persistentData.putBoolean('neidan',false);
    player.persistentData.putInt('sarcomaTimer',0);
    player.persistentData.putInt('wudao',0);
    player.persistentData.putBoolean('fighting',false);
}

function organCount(itemMap,id){
    return itemMap.has(id)?itemMap.get(id).length:0;
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
    let itemMap=getPlayerChestCavityItemMap(player);

    if(itemMap.has('kubejs:jade_eye')){
        let amp=player.persistentData.getInt('wudao');
        event.setSpellLevel(event.spellLevel+amp/40);
    }

    if(itemMap.has('kubejs:tree_heart')){
        if(event.getSpellId()=='irons_spellbooks:oakskin'){
            event.spellLevel+=1;
        }
    }

    if(itemMap.has('kubejs:yuanshen')){
        let qi = player.persistentData.getInt('qi')
        let qiMax = player.getAttributeValue('kubejs:qi_max');
        let cost = event.getManaCost();
        if(qi>cost*8){
            event.setSpellLevel(event.spellLevel+qiMax/8000);
            player.persistentData.putInt('qi',qi-cost*8);
        }
    }
})