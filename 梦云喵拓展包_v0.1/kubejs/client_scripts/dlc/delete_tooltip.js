// priority: 50

ItemEvents.tooltip((tooltip) => {
    function deleteTooltips(organ) {
        tooltip.addAdvanced(organ.itemID, (item, advanced, text) => {
            text.removeIf(e => {
                if (e.getString().includes('organscore')) {
                    return true;
                }
                return false;
    })})}
    global.ORGAN_LIST.forEach(organ => {
        deleteTooltips(organ)
    })
        
});