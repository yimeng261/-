/**
* @author MrBai
* 脚本放在 '版本名称'/kubejs/client_scripts
* 直接显示交货协议的物品内容 / 按shift显示法术卷轴的描述
*/

ItemEvents.tooltip(e=>{
    e.addAdvancedToAll((item,adv,t)=>{
        item=item.copy();
        let nbt=item.nbt;
        if(!e.shift){
            let ids=['irons_spellbooks:scroll'];
            if(ids.indexOf(item.id)!=-1){
                t.add(Text.of('[shift显示详情]').gold());
            }
        }
        if(nbt!=undefined){
            if(e.shift&&item.id=='irons_spellbooks:scroll'){
                let spell_data=nbt['ISB_Spells']['data'][0];
                let sid=spell_data['id'];
                sid =String(sid).replace(':','.');
                let guide = `spell.${sid}.guide`
                t.add(Text.translate(guide).blue());
            }
            if(item.id=='wares:delivery_agreement'){
                t.add([
                    `剩余次数：`,
                    Text.aqua((nbt.ordered - (nbt.delivered||0)).toFixed()),
                ])
                let paymentItems=nbt['paymentItems'][0];
                let count_p=paymentItems['Count']||1;
                let item_p=String(paymentItems['id'].replace(':','.'));
                nbt['requestedItems'].forEach(r=>{
                    let rid=String(r['id'])
                    t.add([
                        '- ',Text.translate(rid.startsWith('#')?rid:`item.${rid.replace(':','.')}`).blue(),
                        ' * ',Text.of(Number(r['Count']).toFixed()).gold()
                    ])
                })
                t.add(['+ ',Text.translate(`item.${item_p}`).blue(),' * ',Text.of(Number(count_p).toFixed()).gold()]);
            }
        }
    })

    e.addAdvanced('kubejs:organ_charm', (item, advanced, text) => {
        let lineNum = 1
        if (item.nbt?.type == 'place') {
            let blockList = []
            if (item.nbt.placeTask.targetblock) {
                item.nbt.placeTask.targetblock.forEach(ctx => {
                    if(ctx.toString().startsWith('"#')){
                        blockList.push('任何带有'+ctx.toString()+'标签的方块');
                    }
                    else{
                        blockList.push(Text.translate(Item.of(ctx).descriptionId).string);
                    }
                })
            }
            text.add(lineNum++, [Text.gold(Text.translatable("目标方块：")), Text.yellow(blockList.join('/'))])
            text.add(lineNum++, [Text.gray(Text.translatable("需要放置")), Text.gray(`${item.nbt.placeTask.counter}/${item.nbt.placeTask.placeAmount}`), Text.gray(Text.translatable("kubejs.tooltips.organ_charm.14"))]);
        }
    });

    e.addAdvanced('kubejs:chaos_tumor',(item,advanced,text)=>{
        text.add(Text.of('已经吞噬的器官:').gold());
        let organs=[]
        item.nbt.devouredOrgans.forEach(organ=>{
            organs.push(Text.translate(`item.${String(organ).replace(':','.').slice(1,-1)}`).gold())
            organs.push(Text.of(','))
        })
        organs.pop()
        text.add(organs)
    })
})