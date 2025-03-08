NetworkEvents.dataReceived('sounds',event=>{
    event.player.playSound(event.data['sound'],2,1);
})