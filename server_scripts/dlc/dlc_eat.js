
const DLCOrganFoodEatenStrategies = {
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if (Item.of(org).hasTag('kubejs:eat_effect'))
                organFoodEatenStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
    'kubejs:entropy_stomach': function (event, organ) {
        let player=event.player;
        let count=0;
        let len=global.EFFECTS.length
        //player.tell(`${global.EFFECTS}`)
        while(count<3){
            let id=global.EFFECTS[Math.floor(random_between(0,len))]
            if(player.hasEffect(id)) continue;
            player.potionEffects.add(id, 20 * random_between(10,100), random_between(0,4))
            count++;
        }
    },
};

const DLCOrganFoodEatenOnlyStrategies = {
    
    'kubejs:chaos_tumor':function(event, organ){
        if(organ.nbt==undefined) return;
        organ.tag.devouredOrgans.forEach(org=>{
            if (Item.of(org).hasTag('kubejs:eat_effect_only'))
                organFoodEatenOnlyStrategies[org.toString().slice(1,-1)](event, Item.of(org))
        })
    },
};

Object.assign(organFoodEatenStrategies,DLCOrganFoodEatenStrategies);
Object.assign(organFoodEatenOnlyStrategies,DLCOrganFoodEatenOnlyStrategies)