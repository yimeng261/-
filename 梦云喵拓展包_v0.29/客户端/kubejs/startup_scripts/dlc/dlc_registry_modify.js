// priority: 10
ItemEvents.modification((event) => {
    event.modify('kubejs:artist_wand', item => {
        item.itemBuilder.finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            let player = entity;
            let chestInventory = player.getChestCavityInstance().inventory.tags
            let count = 0;
            for (let i = 0; i < chestInventory.length; i++) {
                let organ = chestInventory[i];
                let itemId = String(organ.getString('id'))
                Item.of(itemId).getTags().toArray().forEach(e=>{
                    if(e.location()==='kubejs:color')
                        count++;
                })
            }
            player.potionEffects.add('kubejs:colorful', 20 * (20+count*2), count)
            player.addItemCooldown(itemstack, 20 * 60)
            return itemstack;
        })
    });

})