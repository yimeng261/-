
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added',event=>{
    if(!event.entity.isPlayer()) return;
    if(event.entity.level.isClientSide()) return;
    global.dlc_effect(event);
})