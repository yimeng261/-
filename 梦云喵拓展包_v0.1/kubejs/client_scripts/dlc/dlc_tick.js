
let Minecraft = Java.loadClass('net.minecraft.client.Minecraft');
ClientEvents.tick(event => {
    let player = event.player
    if (player.age % 20 != 0&&player.age<30) return
    
    if(!player.persistentData.getBoolean('aim')){
        let t = Minecraft.getInstance().options.fov().get();
        player.persistentData.putInt('orignalFOV',t);
    }
});

ClientEvents.loggedIn(event=>{
    player.persistentData.putBoolean('aim',false);
})