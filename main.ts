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
scene.onOverlapTile(SpriteKind.Projectile, sprites.builtin.brick, function (sprite, location) {
    console.log("proiectil la destinatie " + sprite + location)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverMessage(false, "GAME OVER!")
    game.setGameOverEffect(false, effects.blizzard)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    tiles.placeOnTile(dino, tiles.getTileLocation(2, 11))
})
let bullet_double: Sprite = null
let bullet: Sprite = null
let dino: Sprite = null
dino = sprites.create(img`
    ........................
    ........................
    ...........cc...........
    ...........cccc.........
    .......cc...ccccccc.....
    .......cccccc555555cc...
    ........ccb5555555555c..
    .....cc..b555555555555c.
    .....cccb555555ff155555c
    .....ccb55555555ff55d55c
    ......b5555555555555555c
    ...c..b555d55555bb13bbc.
    ...cccd55ddddd55bb3335c.
    ....cbdddddddddd55b335c.
    ..cccdddddb55bdddd5555c.
    ..cccdddddb555bbbbcccc..
    ...ccddddddb5555cbcdc...
    ccccbdddddddcb55cbcc....
    cddddddddd55dbccbbc.....
    cbdddddddd555dbbbcc.....
    .ccbdddbbdd555bbcdbcc...
    ...cccbbbbdd55ccdddbc...
    ......cccbdddbccccccc...
    ........cdd555dc........
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
    `, SpriteKind.Projectile)
tiles.placeOnRandomTile(mySprite, sprites.builtin.brick)
info.setScore(0)
info.setLife(1)
game.onUpdateInterval(1000, function () {
    if (Math.percentChance(50)) {
        console.log("creating Projectile 0")
        bullet = sprites.create(img`
            . . 6 6 6 6 . . 
            . 6 d 4 4 4 6 . 
            6 1 b 1 1 4 d 6 
            c 1 b b 4 4 1 c 
            . c b b b d c . 
            . . c c c c . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(bullet, assets.tile`myTile0`)
        bullet.setVelocity(50, 0)
        bullet.follow(mySprite)
    } else {
        console.log("creating Projectile 1")
        bullet_double = sprites.create(img`
            . . 6 6 6 6 . . 
            . 6 1 4 4 4 6 . 
            6 d 4 4 4 4 4 6 
            c b b 1 1 4 d c 
            . c b b 4 1 c . 
            . . c c c c . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(bullet_double, assets.tile`myTile1`)
        bullet_double.follow(mySprite)
    }
})
