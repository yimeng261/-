/**
 * 器官实体掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */

const dlcLoot={
    'kubejs:recycle_system':function(event,organ){
        let player = event.killerEntity;
        let count = player.persistentData.getInt(resourceCount);
        player.persistentData.putInt(resourceCount,count+5);
    },
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.nbt.devouredOrgans.forEach(org=>{
            if (Item.of(org).hasTag('kubejs:loot_entity'))
                entityLootStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },

}

/**
 * 器官实体掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */

const dlcLootOnly={
    'kubejs:sarcoma_core':function(event,organ){
        let level = event.level;
        let player = level.getPlayerByUUID(event.killerEntity.uuid);
        let cooldowns=player.cooldowns;
        if(cooldowns.isOnCooldown('kubejs:sarcoma_core')) return;
        var timer = player.persistentData.getInt('sarcomaTimer');
        if(timer==5){
            cooldowns.addCooldown('kubejs:sarcoma_core',5);
            player.persistentData.putInt('sarcomaTimer',0);
            player.invulnerableTime=60;
            let exp = level.createExplosion(player.x,player.y,player.z)
            exp.causesFire(false);
            exp.damagesTerrain(false);
            exp.exploder(player);
            exp.strength(8);
            exp.explode();
            player.health-=player.maxHealth*0.49;
            return;
        }
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player);
        var count=0;
        count+=typeMap.get('kubejs:infected').length;
        itemMap.forEach((value,key)=>{
            if(key.includes('tumor')){
                count+=value.length;
            }
        })
        player.modifyAttribute('minecraft:generic.attack_damage','sarcoma',(2+count*3)*(timer+1),'addition');
        player.persistentData.putInt('sarcomaTimer',timer+1);
        player.health-=player.maxHealth*0.1;
    },
    'kubejs:wither_spine_claw':function(event,organ){
        if(event.entity.type=='minecraft:wither_skeleton'&&Math.random()>0.3){
            event.addLoot('minecraft:wither_skeleton_skull');
        }
    },
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.nbt.devouredOrgans.forEach(org=>{
            if (Item.of(org).hasTag('kubejs:loot_entity_only'))
                entityLootOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
}

Object.assign(entityLootOnlyStrategies,dlcLootOnly);
Object.assign(entityLootStrategies,dlcLoot);

LootJS.modifiers(event=>{
    event.addLootTypeModifier(LootType.BLOCK)
    .matchPlayer((player) => {
        player.hasEffect('kubejs:auto_smelt')
    })
    .modifyLoot(Ingredient.all,(itemStack) => {
        let rt=global.smeltingMap.get(`${itemStack.id}`);
        return rt==undefined?itemStack:rt.withCount(itemStack.count);
    });

    event.addEntityLootModifier('minecraft:spider')
    .addLoot(LootEntry.of('kubejs:spider_gland').when((c) => c.randomChance(0.2)));
})