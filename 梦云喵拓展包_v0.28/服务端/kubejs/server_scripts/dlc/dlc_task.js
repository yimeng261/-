//方块放置任务
BlockEvents.placed(event=>{
    let player = event.player;
    if (!player) return;
    let targetblock = event.block;
    let curiosItem = getCuriosItem(player, 'kubejs:organ_charm')
    if (curiosItem?.id == 'kubejs:organ_charm' && curiosItem.nbt?.type == 'place') {
        if (curiosItem.nbt.status == 1) {
            return
        }
        if (curiosItem.nbt.placeTask) {
            let count=0;
            curiosItem.nbt.placeTask.targetblock.forEach(ctx=>{
                let str=ctx.toString()
                if(str.startsWith('"#')){
                    if(!targetblock.tags.toArray().some(ctt=>ctt==str.slice(2,-1))){
                        count++;
                    }
                }else{
                    if(targetblock.id!=str.slice(1,-1)){
                        count++;
                    }
                }
            })
            if(count==curiosItem.nbt.placeTask.targetblock.length){
                return;
            }
        }

        curiosItem.nbt.placeTask.counter++
        if (curiosItem.nbt.placeTask?.counter >= curiosItem.nbt.placeTask?.placeAmount) {
            curiosItem.nbt.organ.id = curiosItem.nbt.targetOrgan
            curiosItem.nbt.status = 1
        }

        if (curiosItem.nbt.placeTask.consume) {
            targetblock.set('minecraft:air')
            event.cancel()
        }
    }
})

