ItemEvents.rightClicked(event=>{
    let player = event.player;
    //player.tell(`${player.mainHandItem.nbt}`)
    if(player.mainHandItem!='kubejs:sculk_bow') return;
    let Minecraft = Java.loadClass('net.minecraft.client.Minecraft');
    let Int = Java.loadClass('java.lang.Integer')
    let camera = Minecraft.getInstance()

    let orignalFOV = player.persistentData.getInt('orignalFOV');
    if(!player.persistentData.getBoolean('aim')){
        player.persistentData.putBoolean('aim',true);
        camera.options.fov().set(Int.valueOf('30'));
    }
    else{
        player.persistentData.putBoolean('aim',false);
        camera.options.fov().set(Int.valueOf(orignalFOV.toString()));
    }
})