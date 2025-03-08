// priority: 10
const ItemStack=Java.loadClass('net.minecraft.world.item.ItemStack')

StartupEvents.registry('item', event => {
    event.create('half_syrup').texture('dlc:organ/maple_syrup')
    event.create('half_jelly').texture('dlc:organ/jelly_muscle')
    event.create('half_lung').texture('dlc:organ/candy_lung')
    event.create('half_ginger_man').texture('dlc:organ/ginger_man')
    event.create('half_rib').texture('dlc:organ/candy_rib')
    event.create('half_kidney').texture('dlc:organ/candy_kidney')
    event.create('half_temperature_controller').texture('dlc:organ/temperature_controller')
    event.create('half_recycle_system').texture('dlc:organ/recycle_system')
    event.create('half_machine_core').texture('dlc:organ/machine_core')

    event.create('blank_bamboo_slip').texture('dlc:item/blank_bamboo_slip').displayName('空白竹简').group("kubejs.dlc")
    event.create('bamboo_slip').texture('dlc:item/bamboo_slip').displayName('竹简').group("kubejs.dlc")
    event.create('matter_cluster')
        .texture('dlc:item/matter_cluster')
        .displayName('物质团')
        .group("kubejs.dlc")
        .useDuration(itemStack => 7200)
        .useAnimation('bow')
        .use((level, player, hand) => {
            player.stopUsingItem()
            return true;
        })
        .releaseUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            let player=entity
            let mainHandItem=itemstack;
            if(mainHandItem.id=='kubejs:matter_cluster'){
                let nbt=mainHandItem.nbt;
                if(nbt==null) mainHandItem.shrink(1)
                if(!player.isCrouching()){
                    nbt.allKeys.forEach(key=>{
                        player.give(new ItemStack(key,nbt[key]))
                    })
                    mainHandItem.shrink(1)
                }else{
                    let pos = player.rayTrace(7).block.getPos();
                    let chest = player.level.getBlock(pos);
                    if(chest==undefined){
                        player.tell('所指向不是方块')
                    }else if(chest.inventory==undefined){
                        player.tell('所指向方块不是容器')
                    }else{
                        let inv=chest.inventory
                        var slot_count=inv.getSlots()
                        let blanks=[]
                        for(var i=0;i<slot_count;i++){
                            if(inv.getStackInSlot(i).id=='minecraft:air'){
                                blanks.push(i);
                            }
                        }
                        var max=inv.getSlotLimit(blanks[0])
                        var i=0;
                        var len=blanks.length
                        nbt.getAllKeys().toArray().forEach(key=>{
                            var count=nbt[key]
                            while(count>max&&i<len){
                                inv.setStackInSlot(blanks[i++],new ItemStack(key,max))
                                count-=max;
                            }
                            if(i==len){
                                nbt[key]=count;
                            }else{
                                inv.setStackInSlot(blanks[i++],new ItemStack(key,count))
                                nbt.remove(key)
                            }
                        })
                        if(nbt.isEmpty()){
                            mainHandItem.shrink(1)
                        }
                    }
                }
            }
            return itemstack;
        })
        .finishUsing((itemstack,level,entity)=>{
            return itemstack;
        })

    event.create('moonlight_staff','irons_spells_js:magic_sword')
        .displayName('月光大杖')
        .tooltip(Text.of('想做你的傀儡，在你的指尖起舞').color('#fffbd0'))
        .texture('dlc:item/moonlight_staff')
        .addAdditionalAttribute('irons_spellbooks:spell_power', 'moonlightStaffSpellPower', 5, 'addition')
        .addAdditionalAttribute('irons_spellbooks:max_mana', 'moonlightStaffMana', 1000, 'addition')
        .addAdditionalAttribute('irons_spellbooks:mana_regen','moonlightStaffManaRegen',1,'addition')
        .addAdditionalAttribute('irons_spellbooks:cooldown_reduction','moonlightStaffCooldown',1,'addition')
        .attackDamageBaseline(12.0)
        .attackDamageBonus(12)
        .speedBaseline(-1)
        .speed(4.0)
        .maxDamage(2333)
        .rarity('epic')
        .group("kubejs.dlc")
});