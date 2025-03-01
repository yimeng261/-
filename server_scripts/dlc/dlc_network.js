NetworkEvents.dataReceived('organ',event=>{
    let player=event.player;
    let itemMap=getPlayerChestCavityItemMap(player);
    let id=event.data['organ']
    player.sendData('organ',{'organ':id,'has':itemMap.has(id)});
})