
let Minecraft = Java.loadClass('net.minecraft.client.Minecraft');
let ClipContext=Java.loadClass('net.minecraft.world.level.ClipContext')
let HitResult=Java.loadClass('net.minecraft.world.phys.HitResult')
let ops=Minecraft.getInstance().options
let directions = [
    new Vec3(1,0,0),new Vec3(-1,0,0),new Vec3(0,0,1),new Vec3(0,0,-1)
];
let requireOrgans=['kubejs:spider_gland','kubejs:void_engine']
let Organs=new Map()

NetworkEvents.dataReceived('organ',event=>{
    let data=event.data;
    Organs.set(data['organ'],data['has'])
})

ClientEvents.tick(event => {
    let player = event.player
    if(player.age%20==0){
        requireOrgans.forEach(organ=>{requestOrgan(player,organ)});
    }
    if(player.age%2) return;
    
    if(Organs.get('kubejs:spider_gland')&&isWallNearby(player)){
        let mov=player.getDeltaMovement();
        if(ops.keyUp.pressed||ops.keyLeft.pressed||ops.keyRight.pressed){
            player.setMotionY(0.3)
        }else{
            player.setMotionY(mov.y()*0.5);
        }
    }

    if(player.age%20) return;

    if(player.isFallFlying()&&Organs.get('kubejs:void_engine')){
        let vec3=player.getLookAngle()
        let vec32=player.getDeltaMovement()
        let acc=vec32.add(vec3.x() * 0.1 + (vec3.x() * 1.5 - vec32.x()) * 0.5, vec3.y() * 0.1 + (vec3.y() * 1.5 - vec32.y()) * 0.5, vec3.z() * 0.1 + (vec3.z() * 1.5 - vec32.z()) * 0.5);
        player.setMotion(acc.x(),acc.y(),acc.z());
    }
    
    if(!player.persistentData.getBoolean('aim')){
        let t = Minecraft.getInstance().options.fov().get();
        player.persistentData.putInt('orignalFOV',t);
    }
});

ClientEvents.loggedIn(event=>{
    player.persistentData.putBoolean('aim',false);
})

/**
 * @param {Internal.ServerPlayer} player 
 */

function isWallNearby(player) {
    let mov = player.getDeltaMovement();
    let bbWidth = player.getBbWidth();
    let pos = player.position();

    return directions.some(dir => {
        let checkPos = pos.add(
            dir.x() * (bbWidth/2 + 0.1),  // 稍大于碰撞箱的偏移量
            0.1,
            dir.z() * (bbWidth/2 + 0.1)
        );

        // 执行方块碰撞检测
        return player.level.clip(
            new ClipContext(
                pos.add(0, 0.5, 0),      // 起始点（玩家中心）
                checkPos,                // 终点
                ClipContext.Block.COLLIDER,
                ClipContext.Fluid.NONE,
                player
            )
        ).getType() === HitResult.Type.BLOCK;
    });
}

/**
 * @param {Internal.ServerPlayer} player 
 */

function requestOrgan(player,organID){
    player.sendData('organ',{'organ':organID});
}