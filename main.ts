controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.placeOnTile(dino, tiles.getTileLocation(2, 10))
    pause(500)
    tiles.placeOnTile(dino, tiles.getTileLocation(2, 11))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    tiles.placeOnTile(dino, tiles.getTileLocation(2, 11))
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverMessage(false, "GAME OVER!")
    game.setGameOverEffect(false, effects.blizzard)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    tiles.placeOnTile(dino, tiles.getTileLocation(2, 11))
})
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.floorLight4, function (sprite, location) {
    console.log("proiectil la destinatie " + sprite + location)
    info.changeScoreBy(1)
    sprites.destroy(sprite)
})
let bullet_double: Sprite = null
let bullet: Sprite = null
let dino: Sprite = null
music.play(music.createSong(hex`0078000408020600001c00010a006400f4016400000400000000000000000000000000050000040a0020002400051d2024272a01001c000f05001202c102c201000405002800000064002800031400060200040a0018001c00051b1e22252902001c000c960064006d019001000478002c010000640032000000000a0600050a0008000c00051b1e22252906001c00010a006400f4016400000400000000000000000000000000000000021b0000000400051d2024272a300034000c191b1d1e2022242527292a2c07001c00020a006400f4016400000400000000000000000000000000000000030a0010001400051d2024272a08001c000e050046006603320000040a002d0000006400140001320002010002090028002c000424252729`), music.PlaybackMode.LoopingInBackground)
dino = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . c c c c . . . . 
    . . . . . . c c 5 5 5 5 c c . . 
    . . . . . c 5 5 5 5 5 5 5 5 c . 
    . . . . c 5 5 5 f 1 5 5 5 5 5 c 
    . . . c 5 5 5 5 f f 5 5 5 5 5 c 
    . . . c 5 5 5 5 5 5 5 5 5 5 5 c 
    . . c d 5 5 5 5 5 5 b 1 b b c c 
    . . c d d d 5 5 5 5 5 3 3 3 5 c 
    . . c d d d 5 5 5 5 5 5 5 5 b . 
    . . c d d d d b 5 5 c b b c . . 
    c c c d d d d b b 5 5 c b b c . 
    c d d d d d d d d c c c c c c . 
    . c c d d b 5 5 d c c c c . . . 
    . . . c c b 5 5 c c c b b c . . 
    . . . . . c 5 5 d c c c c c . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level4`)
tiles.placeOnTile(dino, tiles.getTileLocation(2, 11))
scene.cameraFollowSprite(dino)
let mySprite = sprites.create(img`
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    `, SpriteKind.Food)
tiles.placeOnRandomTile(mySprite, sprites.dungeon.floorLight4)
info.setScore(0)
info.setLife(1)
game.onUpdateInterval(1000, function () {
    if (Math.percentChance(50)) {
        console.log("creating Projectile 0")
        bullet = sprites.create(img`
            . . c c c b . . 
            . 1 d c c b . . 
            1 1 b 1 1 b . . 
            c 1 b b c b . . 
            . c b b b b . . 
            . . c c c b . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(bullet, assets.tile`myTile1`)
        bullet.setVelocity(50, 0)
        bullet.follow(mySprite)
    } else {
        console.log("creating Projectile 1")
        bullet_double = sprites.create(img`
            . . c c c b . . 
            . 1 d c c b . . 
            1 1 b 1 1 b . . 
            c 1 b b c b . . 
            . c b b b b . . 
            . . c c c b . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(bullet_double, assets.tile`myTile0`)
        tiles.placeOnRandomTile(bullet_double, assets.tile`myTile2`)
        bullet_double.follow(mySprite)
        bullet_double.setVelocity(50, 0)
    }
})
