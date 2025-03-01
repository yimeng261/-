
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added',event=>{
    if(!event.entity.isPlayer()) return;
    global.dlc_effect(event);
    event.effectInstance.effect.isBeneficial();
    
})