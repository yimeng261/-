function pigmentEffect(event)
{
    let e = event.entity;
    if(e.hasEffect('kubejs:pigment'))
    {
        e.invulnerableTime = 0
        let duration = e.getEffect('kubejs:pigment').getDuration() > 2400 ? 2400 : e.getEffect('kubejs:pigment').getDuration();
        let amp = e.getEffect('kubejs:pigment').getAmplifier() > 15 ? 15 : e.getEffect('kubejs:pigment').getAmplifier();
        event.amount*=1+duration/2000+(amp+1)/8;
        e.removeEffect('kubejs:pigment');
        e.potionEffects.add('kubejs:pigment',duration + 10, amp + 1);
    }
}

function civilizationPlayer(event){
    let player = event.source.player;
    let curiosItem = getCuriosItem(player,'kubejs:the_preservation_of_civilization');
    if (curiosItem?.id == 'kubejs:the_preservation_of_civilization'){
        event.entity.invulnerableTime=0;
        event.entity.attack(DamageSource.MAGIC,event.amount);
        let currentHealth = event.entity.getHealth();
        event.entity.setHealth(Math.max(currentHealth-event.amount*0.2,0));
        event.amount = 0;
    }
}

function disasterPlayer(event)
{
    let player=event.entity;
    let count;
    if(event.source.type==='outOfWorld') return;
    let ageCounter=player.age-player.persistentData.getInt('ageRecord');
    count = player.persistentData.getInt('damageCount');
    let itemMap=getPlayerChestCavityItemMap(player);
    if(itemMap.has('kubejs:disaster_source'))
    {
        count+=event.amount;
        player.persistentData.putInt('damageCount',count);
        player.persistentData.putInt('ageRecord',player.age);
        player.modifyAttribute('minecraft:generic.attack_damage','damageCounter',count,'addition');
        //player.tell(`${ageCounter},${count + event.amount}`);
        if(count>200||ageCounter>20*20)
        {
            for(let i=0;i<10;i++)
            {
                if(event.source.actual!=player)
                {
                    if(event.source.actual)
                    {
                        event.source.actual.invulnerableTime=0;
                        event.source.actual.attack(DamageSource.playerAttack(player),count*20);
                        event.source.actual.invulnerableTime=0;
                    }
                    else
                    {
                        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 7);
                        entityList.forEach(e=>{
                            e.invulnerableTime=0;
                            e.attack(DamageSource.playerAttack(player),count*20/entityList.length)
                            e.invulnerableTime=0;
                        });
                    }
                }
            };
            player.persistentData.putInt('damageCount',0)
            player.removeAttribute('minecraft:generic.attack_damage','damageCounter');
            return;
        }
    }
    else if(!itemMap.has('kubejs:disaster_source')&&count>0)
    {
        player.invulnerableTime=0;
        player.attack(DamageSource.playerAttack(player),count*20)
        player.invulnerableTime=0;
        player.persistentData.putInt('damageCount',0)
        player.removeAttribute('minecraft:generic.attack_damage','damageCounter');
        return;
    }
}