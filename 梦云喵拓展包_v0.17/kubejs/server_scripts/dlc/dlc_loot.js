const dlcLoot={
    'kubejs:recycle_system':function(event,organ){
        let player = event.killerEntity;
        let count = player.persistentData.getInt(resourceCount);
        player.persistentData.putInt(resourceCount,count+5);
    }
}

Object.assign(entityLootStrategies,dlcLoot);