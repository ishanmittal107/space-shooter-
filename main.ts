controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . 3 2 4 . . . . . 
        . . . . . . . 3 3 2 . . . . . . 
        . . . . . . . 3 2 2 . . . . . . 
        . . . . . . 3 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . 2 3 3 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . 3 2 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . . . . . 3 3 2 4 . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 5 2 2 2 
    . . . . . . . . . . 5 5 5 5 5 . 
    . . . . . . . . 5 5 5 5 5 . . . 
    . . . . . . . 5 5 5 5 5 5 . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . 7 7 7 7 7 7 7 7 7 a . . . . 
    2 8 8 8 8 8 8 8 8 8 a a a . . . 
    2 8 8 8 8 8 8 8 8 8 a a a . . . 
    . . 7 7 7 7 7 7 7 7 7 a . . . . 
    . . . . . 5 5 5 5 5 5 5 5 . . . 
    . . . . . . . . . . 5 5 5 5 5 . 
    . . . . . . . . . . . . . 2 2 2 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 7 2 2 . . . . 
        . . . . . . . . 6 7 . . . . . . 
        . . . . . . . . 6 7 . . . . . . 
        . . . . . . . 6 6 7 . . . . . . 
        . . . . . . . 6 7 7 . . . . . . 
        . . . . . . 6 6 7 7 . . . . . . 
        . . . . . 6 6 7 7 7 . . . . . . 
        . . 6 6 6 6 7 7 7 7 . . . . . . 
        . . 6 6 6 6 7 7 7 7 . . . . . . 
        . . . . 6 6 7 7 7 7 . . . . . . 
        . . . . . 6 6 7 7 7 . . . . . . 
        . . . . . . 6 6 6 7 . . . . . . 
        . . . . . . . . 6 7 . . . . . . 
        . . . . . . 6 6 6 7 2 2 . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 12)
    statusbar.max = 100
    statusbar.attachToSprite(enemyShip)
})
