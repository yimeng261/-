
ServerEvents.loaded(event=>{
    let MobEffect=Java.loadClass('net.minecraft.world.effect.MobEffect')
    for(let i=0;MobEffect.byId(i)!=null;i++)
        global.EFFECTS.push(MobEffect.byId(i).getDescriptionId().slice(7).replace('.',':'))

    event.server.recipeManager.getAllRecipesFor('minecraft:smelting').forEach(r => {
        r.getIngredients().forEach(ind => {
            ind.getItemIds().forEach(id => {
                global.smeltingMap.set(id, r.getResultItem());
            });
        });
    });
    
})