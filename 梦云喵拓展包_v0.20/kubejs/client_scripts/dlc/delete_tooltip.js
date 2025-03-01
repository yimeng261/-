// priority: 50

ItemEvents.tooltip((tooltip) => {
    tooltip.addAdvancedToAll((item,adv,t)=>{
        t.removeIf(e => {
            if (e.getString().includes('organscore')) {
                return true;
            }
            return false;
        })
    })
});