let blackList=['minecraft:dirt','forge:stone','minecraft:logs']
NetworkEvents.dataReceived('new_scan_type', event => {
    let player = event.player
    if (!player) return;
    if(!getPlayerChestCavityItemMap(player).has('kubejs:pyroclastic_scope')){
        player.tell('似乎没有对应器官哦？')
        return;
    }
    let id=player.getMainHandItem().getId();
    if(id=='minecraft:air'){
        player.sendData('ore',{'blockType':'noPermission'});
        player.tell('已取消方块透视')
        return;
    }
    let block = Block.getBlock(id);
    if(blackList.some(t=>Item.of(id).hasTag(t))){
        player.tell('这东西应该不少吧')
        return;
    }
    player.server.runCommandSilent(`/fill 0 0 0 ${id}`);
    let isFullBlock = block.defaultBlockState().isCollisionShapeFullBlock(player.level,new BlockPos(0,0,0))
    player.server.runCommandSilent(`/fill 0 0 0 minecraft:air`);
    //player.tell(`${xsize}`)
    if(isFullBlock){
        player.sendData('ore',{'blockType':id});
        player.tell(`新的矿物类型已记录: ${id}`)
    }else{
        player.tell(`你确定这东西是原矿？`)
    }
    
})
