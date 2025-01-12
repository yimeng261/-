function updateDlcBar(player,qiPercent,qiCountNum,qiMax,visible) {
    player.paint({
        barBackGround: {
            type: 'rectangle',
            x: '$screenW/2-$screenW*2/13-2',
            y: '-$screenH/9',
            w: 98,
            h: 11,
            alignX: 'left',
            alignY: 'bottom',
            texture: 'dlc:textures/gui/qi_bar.png',
            visible: visible,
        },
        qiBarOverlay: {
            type: 'rectangle',
            x: '$screenW/2-$screenW*2/13+1',
            y: '-$screenH/9-3',
            v0: 0,
            u0: 1-qiPercent,
            v1: 1,
            u1: 1,
            w: 92 * qiPercent,
            h: 5,
            alignX: 'left',
            alignY: 'bottom',
            texture: 'dlc:textures/gui/qi_bar_overlay.png',
            visible: visible,
        }, 
        barCountText: {
            type: 'text',
            x: '$screenW*11/28',
            y: '-$screenH/7',
            text: `${qiCountNum}§f/${qiMax}§f`,
            alignX: 'left',
            alignY: 'bottom',
            visible: visible
        }
    })
}