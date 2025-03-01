/* 矿透 */

BlockEvents.broken(event=>{
    let pos=event.block.pos
    event.player.sendData('blockChange',{'x':pos.x,'y':pos.y,'z':pos.z})
})

BlockEvents.placed(event=>{
    let pos=event.block.pos
    event.player.sendData('blockChange',{'x':pos.x,'y':pos.y,'z':pos.z})
})
