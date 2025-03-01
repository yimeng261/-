let foundBlocks = new Set()
let detectedBlocks = new Set(); // 使用 Set 提高性能
let block_type;
let detecCount=0;
let changeType=0;
let RenderSystem=Java.loadClass('com.mojang.blaze3d.systems.RenderSystem')

NetworkEvents.dataReceived('ore',event=>{
    block_type=event.getData()['blockType']
    changeType++;
    event.player.persistentData.putString('scanBlockType',block_type)
})

NetworkEvents.dataReceived('blockChange',event=>{
    let data=event.getData()
    let key=`${data['x']},${data['y']},${data['z']}`
    detectedBlocks.delete(key)
    foundBlocks.delete(key)
})

ClientEvents.tick(event => {
    if (global.ScanType.consumeClick()) {
        event.player.sendData('new_scan_type')
    }
    let player=event.player;

    if(player.age%20) return;

    if(player.age%40) return;
    highlightBlock(16,8,player);
})

RenderJSEvents.AddWorldRender(event => {
    event.addWorldRender(context => {
        foundBlocks.forEach(pos=>{
            RenderJSWorldRender.renderBlockOutLine1(new BlockPos(pos.split(',').map(Number)),Blocks.ANCIENT_DEBRIS.defaultBlockState(),RenderJSWorldRender.getTopLayerLineType())
        })
    })
})

function highlightBlock(end_range, end_height, player) {
    if(block_type==undefined||block_type=='noPermission') return;
    let level = player.level
    let base_pos = player.blockPosition()
    let base_x=base_pos.getX()
    let base_y=base_pos.getY()
    let base_z=base_pos.getZ()
    detecCount++;

    if(changeType){
        foundBlocks.clear();
        detectedBlocks.clear();
        changeType--;
    }else{
        for(let i=0;i<foundBlocks.length;i++){
            let pos=foundBlocks[i]
            if(Math.abs(pos.x()-base_x)>end_range||Math.abs(pos.y()-base_y)>end_height||Math.abs(pos.z()-base_z)>end_range){
                foundBlocks.splice(i,1)
            }
        }
    }
    
    for(let dx = -end_range; dx <= end_range; dx++) {
        for(let dz = -end_range; dz <= end_range; dz++) {
            for(let dy = -end_height; dy <= end_height; dy++) {
                
                let x = base_x + dx;
                let y = base_y + dy;
                let z = base_z + dz;

                let key = `${x},${y},${z}`;
                if (detectedBlocks.has(key)) continue;
                detectedBlocks.add(key);

                if(block_type.endsWith('ore')){
                    let findID=level.getBlock(x, y, z).getId().split(':')[1]
                    if(!findID.endsWith('ore')) continue;
                    let aimID=block_type.split(':')[1]
                    if(findID.includes(aimID)||aimID.includes(findID))
                        foundBlocks.add(`${x},${y},${z}`);
                }else{
                    if(level.getBlock(x, y, z) == block_type)
                        foundBlocks.add(`${x},${y},${z}`);
                }
                
            }
        }
    }
    if(detecCount%30==0){
        detectedBlocks.clear()
    }
}