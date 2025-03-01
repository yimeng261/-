// priority: 50
const AttributeRegistry=Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry')
const ItemEntity=Java.loadClass('net.minecraft.world.entity.item.ItemEntity')
const ItemStack=Java.loadClass('net.minecraft.world.item.ItemStack')
const Packet = Java.loadClass('net.minecraft.network.protocol.game.ServerboundPlayerActionPacket');
const Action = Java.loadClass('net.minecraft.network.protocol.game.ServerboundPlayerActionPacket$Action');
const MinecraftForge=Java.loadClass('net.minecraftforge.common.MinecraftForge')
const BlockEvent=Java.loadClass('net.minecraftforge.event.level.BlockEvent')
const JsBlock=Java.loadClass('net.minecraft.world.level.block.Block')
const SoundEvents=Java.loadClass('net.minecraft.sounds.SoundEvents')

let blockWhiteList=[
    "minecraft:gravel",
    "minecraft:soul_sand",
    "minecraft:soul_soil",
    "minecraft:sandstone",
    "minecraft:red_sandstone",
    "minecraft:calcite",
    "minecraft:smooth_basalt",
    'minecraft:clay',
    'minecraft:amethyst_block',
    'minecraft:budding_amethyst'
]



/**
 * @param {Internal.CustomSpell$CastContext} ctx 
 * @returns 
 */
global.betterHammer = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity
    let spellLevel = ctx.getSpellLevel()
    let level=player.level

    var face = player.facing;
    var depth = getSpellPower(spellLevel, player,AttributeRegistry.EVOCATION_SPELL_POWER);
    var radius = Math.max(getSpellPower(spellLevel, player,AttributeRegistry.EVOCATION_SPELL_POWER) * 0.3, 1);
    let targetBlock=player.rayTrace(16).block;
    if(!targetBlock) return;
    let position = targetBlock.getPos().subtract(face.normal);
    let blockTypeMap = new Map()
    let tagWhiteList=[
        '#forge:gravel',
        "#forge:stone",
        '#create:stone_types/asurine',
        "#minecraft:terracotta",
        "#minecraft:ice",
        "#minecraft:nylium",
        "#minecraft:wart_blocks",
        "#minecraft:base_stone_overworld",
        "#minecraft:base_stone_nether",
        "#minecraft:dirt",
        "#minecraft:sand",
        "#minecraft:dripstone_replaceable_blocks",
        '#create:stone_types/scoria',
        '#create:stone_types/limestone',
        '#create:stone_types/ochrum',
        '#create:stone_types/dripstone',
        '#create:stone_types/crimsite'
    ]

    if(player.isCrouching()){
        tagWhiteList.push("#forge:ores")
    }

    //player.tell(`${position},${targetBlock}`)
    level.playSound(null,position.x, position.y, position.z,SoundEvents.STONE_BREAK,SoundSource.NEUTRAL,25,1);
    level.levelEvent(2001, position, JsBlock.getId(targetBlock.getBlockState()))
    level.playSound(null, position.x, position.y, position.z, SoundRegistry.FORCE_IMPACT.get(), SoundSource.NEUTRAL, 2, random_between(6,8) * 0.1);
    level.playSound(null, position.x, position.y, position.z, SoundEvents.ZOMBIE_ATTACK_IRON_DOOR, SoundSource.NEUTRAL, 1, random_between(6,8) * 0.1);

    var minX;
    var maxX;
    var minY;
    var maxY;
    var minZ;
    var maxZ;

    switch (face) {
        case 'west': // X负方向
            minX = position.x - depth;
            maxX = position.x;
            minY = position.y - radius;
            maxY = position.y + radius;
            minZ = position.z - radius;
            maxZ = position.z + radius;
            break;
        case 'east': // X正方向
            minX = position.x;
            maxX = position.x + depth;
            minY = position.y - radius;
            maxY = position.y + radius;
            minZ = position.z - radius;
            maxZ = position.z + radius;
            break;
        case 'north': // Z负方向
            minZ = position.z - depth;
            maxZ = position.z;
            minX = position.x - radius;
            maxX = position.x + radius;
            minY = position.y - radius;
            maxY = position.y + radius;
            break;
        case 'south': // Z正方向
            minZ = position.z;
            maxZ = position.z + depth;
            minX = position.x - radius;
            maxX = position.x + radius;
            minY = position.y - radius;
            maxY = position.y + radius;
            break;
        case 'up': // Y正方向
            minY = position.y;
            maxY = position.y + depth;
            minX = position.x - radius;
            maxX = position.x + radius;
            minZ = position.z - radius;
            maxZ = position.z + radius;
            break;
        case 'down': // Y负方向
            minY = position.y - depth;
            maxY = position.y;
            minX = position.x - radius;
            maxX = position.x + radius;
            minZ = position.z - radius;
            maxZ = position.z + radius;
            break;
    }

    var num=0;
    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            for(let z = minZ; z <= maxZ; z++) {
                let pos=new BlockPos(x,y,z);
                let id=`${level.getBlock(pos).id}`;     
                let locations=blockTypeMap.get(id)
                if(id=='minecraft:lava'||id=='minecraft:water'){
                    level.removeBlock(pos,false)
                }
                if(locations==undefined){
                    blockTypeMap.set(id,[pos])
                }else{
                    locations.push(pos)
                    blockTypeMap.set(id,locations)
                }
            }
        }
    }



    blockTypeMap.forEach((value,key)=>{
        let item=Item.of(key)
        if(tagWhiteList.some(t=>item.hasTag(t.slice(1)))||blockWhiteList.some(b=>b==key)){
            num+=value.length
            value.forEach(p=>{
                level.removeBlock(p,false)
                let event = new BlockEvent.BreakEvent(level, p, level.getBlockState(p), player);
                MinecraftForge.EVENT_BUS.post(event);
            })
        }else{
            blockTypeMap.delete(key)
        }
    })

    if(num<640){
        blockTypeMap.forEach((value,key)=>{
            var count=value.length
            let itemStack=new ItemStack(key)
            while(count>64){
                let drops=new ItemEntity(level,position.x+0.5,position.y+0.5,position.z+0.5,itemStack.withCount(64),0,0,0)
                level.addFreshEntity(drops)
                count-=64;
            }
            let drops=new ItemEntity(level,position.x+0.5,position.y+0.5,position.z+0.5,itemStack.withCount(count),0,0,0)
            level.addFreshEntity(drops)
        })
    }else{
        let itemStack=new ItemStack('kubejs:matter_cluster')
        itemStack.nbt={}
        blockTypeMap.forEach((value,key)=>{
            itemStack.nbt.put(key,value.length);
        })
        player.give(itemStack)
    }

}

function getSpellPower(spellLevel, sourceEntity, school) {

    var entitySpellPowerModifier = 1;
    var entitySchoolPowerModifier = 1;
    var level = spellLevel;
    if (sourceEntity.isPlayer()) {
        entitySpellPowerModifier = sourceEntity.getAttributeValue(AttributeRegistry.SPELL_POWER.get());
        entitySchoolPowerModifier = sourceEntity.getAttributeValue(school.get())
    }

    return ((1 + 1 * (level - 1)) * entitySpellPowerModifier * entitySchoolPowerModifier);
}

/**
 * @param {Internal.CustomSpell$CastContext} ctx 
 * @returns 
 */
global.sweet_shell = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity
    let spellLevel = ctx.getSpellLevel()
    let shellEffect = player.getEffect('kubejs:sweet_shell')
    let duration;
    if (player.hasEffect('kubejs:sweet_shell')) {
        duration = shellEffect.getDuration();
    } else {
        duration = 0;
    }
    player.potionEffects.add('kubejs:sweet_shell', duration + 120 * 20, spellLevel-1)
}

global.sweet_whirlpool = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity;
    let count = getPlayerChestCavityTypeMap(player).get('kubejs:candy').length;
    if(count<15){
        player.tell('糖果器官似乎太少了？');
        return;
    }
    
    let spellLevel = ctx.getSpellLevel()
    player.potionEffects.add('kubejs:sweet_whirlpool',100*20,spellLevel);
    //漩涡
    
}
