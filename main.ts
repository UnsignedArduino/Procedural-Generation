namespace SpriteKind {
    export const Object = SpriteKind.create()
    export const GroundObject = SpriteKind.create()
    export const WalkableObject = SpriteKind.create()
}
function summon_object (image2: Image, _type: number, x: number, y: number, hardness: number) {
    sprite_object = sprites.create(image2, _type)
    sprite_object.setPosition(x, y)
    sprites.setDataNumber(sprite_object, "durability", hardness)
    sprites.setDataBoolean(sprite_object, "destroying", false)
    sprites.setDataNumber(sprite_object, "health", hardness)
    sprite_statusbar = statusbars.create(10, 2, StatusBarKind.Health)
    sprite_statusbar.attachToSprite(sprite_object)
    sprite_statusbar.max = hardness
    sprite_statusbar.setColor(5, 0)
    sprites.setDataString(sprite_object, "id", "" + biome_number + "-" + chunk_x + "-" + chunk_y + "-" + x + "-" + y)
    console.log("Sprite summoned in at " + x + ", " + y + " with ID " + sprites.readDataString(sprite_object, "id"))
    if (user_destroyed_objects.indexOf(sprites.readDataString(sprite_object, "id")) != -1) {
        sprite_object.destroy()
    }
}
function make_rng (seed: number, x: number, y: number) {
    output = parseFloat("" + Math.abs(seed) + Math.abs(x) + Math.abs(y))
    if (x < 0) {
        output = output * 10
    }
    if (y < 0) {
        output = output * 100
    }
    console.log("Chunk seed is " + output + " (Seed: " + seed + ", X: " + x + ", Y: " + y + ")")
    return Random.createRNG(output)
}
function generate_chunk (x: number, y: number) {
    clear_chunk()
    chunk_rng = make_rng(user_seed, x, y)
    biome_number = chunk_rng.randomRange(0, 99)
    if (biome_number < 40) {
        make_plains()
    } else if (biome_number < 80) {
        make_forest()
    } else {
        make_dark_forest()
    }
}
function get_overlapping_objects (sprite_target: Sprite) {
    overlapping_sprites = []
    for (let sprite of sprites.allOfKind(SpriteKind.WalkableObject)) {
        if (sprite_target.overlapsWith(sprite)) {
            overlapping_sprites.push(sprite)
        }
    }
    for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
        if (sprite_target.overlapsWith(sprite)) {
            overlapping_sprites.push(sprite)
        }
    }
    return overlapping_sprites
}
function fade_out (delay: number, blocking: boolean) {
    color.startFade(color.Black, color.originalPalette, delay)
    if (blocking) {
        color.pauseUntilFadeDone()
    }
}
function clear_chunk () {
    for (let sprite of sprites.allOfKind(SpriteKind.GroundObject)) {
        sprite.destroy()
    }
    for (let sprite of sprites.allOfKind(SpriteKind.WalkableObject)) {
        sprite.destroy()
    }
    for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
        sprite.destroy()
    }
}
function fade_in (delay: number, blocking: boolean) {
    color.startFade(color.originalPalette, color.Black, delay)
    if (blocking) {
        color.pauseUntilFadeDone()
    }
}
function make_plains () {
    scene.setBackgroundColor(7)
    for (let y = 0; y <= (scene.screenHeight() - 1) / 2; y++) {
        for (let x = 0; x <= (scene.screenWidth() - 1) / 2; x++) {
            if (chunk_rng.percentChance(1)) {
                object_number = chunk_rng.randomRange(0, 99)
                if (object_number < 15) {
                    summon_object(sprites.castle.tileGrass1, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 30) {
                    summon_object(sprites.castle.tileGrass3, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 45) {
                    summon_object(sprites.castle.tileGrass2, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 60) {
                    summon_object(sprites.builtin.forestFlowers0, SpriteKind.WalkableObject, x * 2, y * 2, 1)
                } else if (object_number < 75) {
                    summon_object(sprites.builtin.forestFlowers1, SpriteKind.WalkableObject, x * 2, y * 2, 1)
                } else {
                    if (chunk_rng.percentChance(20)) {
                        summon_object(sprites.duck.tree, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(25)) {
                        summon_object(sprites.castle.treePine, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(33)) {
                        summon_object(sprites.castle.treeOak, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(50)) {
                        summon_object(sprites.castle.treeSmallPine, SpriteKind.Object, x * 2, y * 2, 10)
                    } else {
                        summon_object(sprites.builtin.forestTree1, SpriteKind.Object, x * 2, y * 2, 30)
                    }
                }
            }
        }
    }
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    status.spriteAttachedTo().destroy(effects.ashes, 100)
    user_destroyed_objects.push(sprites.readDataString(status.spriteAttachedTo(), "id"))
})
function make_forest () {
    scene.setBackgroundColor(7)
    for (let y = 0; y <= (scene.screenHeight() - 1) / 2; y++) {
        for (let x = 0; x <= (scene.screenWidth() - 1) / 2; x++) {
            if (chunk_rng.percentChance(1)) {
                object_number = chunk_rng.randomRange(0, 99)
                if (object_number < 15) {
                    summon_object(sprites.castle.tileGrass1, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 30) {
                    summon_object(sprites.castle.tileGrass3, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 45) {
                    summon_object(sprites.castle.tileGrass2, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 60) {
                    summon_object(sprites.builtin.forestScenery3, SpriteKind.WalkableObject, x * 2, y * 2, 1)
                } else if (object_number < 75) {
                    summon_object(sprites.builtin.forestScenery1, SpriteKind.Object, x * 2, y * 2, 5)
                } else {
                    if (chunk_rng.percentChance(20)) {
                        summon_object(sprites.duck.tree, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(25)) {
                        summon_object(sprites.castle.treePine, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(33)) {
                        summon_object(sprites.castle.treeOak, SpriteKind.Object, x * 2, y * 2, 20)
                    } else if (chunk_rng.percentChance(50)) {
                        summon_object(sprites.castle.treeSmallPine, SpriteKind.Object, x * 2, y * 2, 10)
                    } else {
                        summon_object(sprites.builtin.forestTree1, SpriteKind.Object, x * 2, y * 2, 30)
                    }
                }
            }
        }
    }
}
function make_player () {
    sprite_player = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    enable_controls(true)
    sprites.setDataBoolean(sprite_player, "destroying", false)
    sprites.setDataSprite(sprite_player, "destroying_sprite", null)
    character.loopFrames(
    sprite_player,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f f 2 f e f . . 
        . . f f f 2 f e e 2 2 f f f . . 
        . . f e 2 f f e e 2 f e e f . . 
        . f f e f f e e e f e e e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . . e f f f f f f f f 4 e . . 
        . . . 4 f 2 2 2 2 2 e d d 4 . . 
        . . . e f f f f f f e e 4 . . . 
        . . . . f f f . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e f 2 f f f 2 f 2 e f . . 
        . . f f f 2 2 e e f 2 f f f . . 
        . . f e e f 2 e e f f 2 e f . . 
        . f f e e e f e e e f f e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f e . . . 
        . . 4 d d e 2 2 2 2 2 f 4 . . . 
        . . . 4 e e f f f f f f e . . . 
        . . . . . . . . . f f f . . . . 
        `],
    300,
    character.rule(Predicate.MovingUp)
    )
    character.runFrames(
    sprite_player,
    [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `],
    300,
    character.rule(Predicate.NotMoving, Predicate.FacingUp)
    )
    character.loopFrames(
    sprite_player,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 2 2 2 2 e d d 4 e . . 
        . . e 4 f 2 2 2 2 e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f e e 2 2 2 2 2 2 e f f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . e f e 4 d d d d 4 e f . . . 
        . . e 4 d d e 2 2 2 2 f e f . . 
        . . . e d d e 2 2 2 2 f 4 e . . 
        . . . . e e f 5 5 4 4 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . f f f . . . . 
        `],
    300,
    character.rule(Predicate.MovingDown)
    )
    character.runFrames(
    sprite_player,
    [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `],
    300,
    character.rule(Predicate.NotMoving, Predicate.FacingDown)
    )
    character.loopFrames(
    sprite_player,
    [img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `],
    300,
    character.rule(Predicate.MovingLeft)
    )
    character.runFrames(
    sprite_player,
    [img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `],
    300,
    character.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    character.loopFrames(
    sprite_player,
    [img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `],
    300,
    character.rule(Predicate.MovingRight)
    )
    character.runFrames(
    sprite_player,
    [img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `],
    300,
    character.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    return sprite_player
}
function enable_controls (en: boolean) {
    if (en) {
        can_move = true
    } else {
        can_move = false
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu_opened) {
        menu_opened = false
        blockMenu.closeMenu()
    } else {
        menu_opened = true
        blockMenu.showMenu(["Close", "Show seed", "Show chunk location"], MenuStyle.List, MenuLocation.BottomHalf)
    }
})
function make_dark_forest () {
    scene.setBackgroundColor(6)
    for (let y = 0; y <= (scene.screenHeight() - 1) / 2; y++) {
        for (let x = 0; x <= (scene.screenWidth() - 1) / 2; x++) {
            if (chunk_rng.percentChance(1)) {
                object_number = chunk_rng.randomRange(0, 99)
                if (object_number < 15) {
                    summon_object(sprites.castle.tileDarkGrass1, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 30) {
                    summon_object(sprites.castle.tileDarkGrass3, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 45) {
                    summon_object(sprites.castle.tileDarkGrass2, SpriteKind.GroundObject, x * 2, y * 2, 1)
                } else if (object_number < 60) {
                    summon_object(sprites.builtin.forestScenery3, SpriteKind.WalkableObject, x * 2, y * 2, 1)
                } else if (object_number < 75) {
                    summon_object(sprites.builtin.forestScenery1, SpriteKind.Object, x * 2, y * 2, 5)
                } else {
                    if (chunk_rng.percentChance(25)) {
                        summon_object(sprites.builtin.forestTree1, SpriteKind.Object, x * 2, y * 2, 30)
                    } else if (chunk_rng.percentChance(33)) {
                        summon_object(sprites.builtin.forestTree0, SpriteKind.Object, x * 2, y * 2, 30)
                    } else if (chunk_rng.percentChance(50)) {
                        summon_object(sprites.builtin.forestTree2, SpriteKind.Object, x * 2, y * 2, 30)
                    } else {
                        summon_object(sprites.builtin.forestTree3, SpriteKind.Object, x * 2, y * 2, 30)
                    }
                }
            }
        }
    }
}
blockMenu.onMenuOptionSelected(function (option, index) {
    menu_opened = false
    blockMenu.closeMenu()
    if (blockMenu.selectedMenuIndex() == 0) {
    	
    } else if (blockMenu.selectedMenuIndex() == 1) {
        game.showLongText("Seed: " + user_seed, DialogLayout.Bottom)
    } else if (blockMenu.selectedMenuIndex() == 2) {
        game.showLongText("Chunk X: " + chunk_x + "\\nChunk Y: " + chunk_y, DialogLayout.Bottom)
    }
})
let can_move_down = false
let can_move_up = false
let can_move = false
let sprite_player: Sprite = null
let object_number = 0
let overlapping_sprites: Sprite[] = []
let chunk_rng: FastRandomBlocks = null
let output = 0
let biome_number = 0
let sprite_statusbar: StatusBarSprite = null
let sprite_object: Sprite = null
let chunk_y = 0
let chunk_x = 0
let user_destroyed_objects: string[] = []
let user_seed = 0
let menu_opened = false
menu_opened = false
blockMenu.setControlsEnabled(false)
blockMenu.setColors(1, 15)
timer.background(function () {
    fade_out(2000, true)
})
user_seed = game.askForNumber("Enter a seed:")
color.pauseUntilFadeDone()
color.setPalette(
color.Black
)
if (user_seed != user_seed || user_seed == 0) {
    user_seed = randint(1, 65535)
}
user_seed = Math.abs(user_seed)
user_destroyed_objects = []
chunk_x = 0
chunk_y = 0
let updating_chunk = false
make_player()
generate_chunk(chunk_x, chunk_y)
fade_out(2000, false)
blockMenu.setControlsEnabled(true)
game.onUpdate(function () {
    for (let sprite of sprites.allOfKind(SpriteKind.Player)) {
        sprite.z = sprite.bottom - 100
    }
    for (let sprite of sprites.allOfKind(SpriteKind.GroundObject)) {
        sprite.z = -100000000000000000000
    }
    for (let sprite of sprites.allOfKind(SpriteKind.WalkableObject)) {
        sprite.z = sprite.bottom - 100
    }
    for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
        sprite.z = sprite.bottom - 100
    }
})
forever(function () {
    if (sprite_player.top > scene.screenHeight() && !(updating_chunk)) {
        updating_chunk = true
        enable_controls(false)
        fade_in(300, true)
        chunk_y += 1
        generate_chunk(chunk_x, chunk_y)
        sprite_player.bottom = 0
        fade_out(300, false)
        sprite_player.vy = 50
        pause(300)
        sprite_player.vy = 0
        enable_controls(true)
        updating_chunk = false
    }
})
forever(function () {
    if (sprite_player.right < 0 && !(updating_chunk)) {
        updating_chunk = true
        enable_controls(false)
        fade_in(300, true)
        chunk_x += -1
        generate_chunk(chunk_x, chunk_y)
        sprite_player.left = scene.screenWidth()
        fade_out(300, false)
        sprite_player.vx = -50
        pause(300)
        sprite_player.vx = 0
        enable_controls(true)
        updating_chunk = false
    }
})
forever(function () {
    for (let sprite of sprites.allOfKind(SpriteKind.GroundObject)) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, true)
    }
    for (let sprite of sprites.allOfKind(SpriteKind.WalkableObject)) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value = sprites.readDataNumber(sprite, "health")
        if (sprites.readDataBoolean(sprite, "destroying")) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, false)
            sprite.startEffect(effects.ashes, 100)
        } else {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, true)
        }
        if (!(sprites.readDataBoolean(sprite, "destroying")) && sprites.readDataNumber(sprite, "health") < sprites.readDataNumber(sprite, "durability")) {
            sprites.changeDataNumberBy(sprite, "health", 1)
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, false)
        }
    }
    for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value = sprites.readDataNumber(sprite, "health")
        if (sprites.readDataBoolean(sprite, "destroying")) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, false)
            sprite.startEffect(effects.ashes, 100)
        } else {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, true)
        }
        if (!(sprites.readDataBoolean(sprite, "destroying")) && sprites.readDataNumber(sprite, "health") < sprites.readDataNumber(sprite, "durability")) {
            sprites.changeDataNumberBy(sprite, "health", 1)
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).setFlag(SpriteFlag.Invisible, false)
        }
    }
    pause(100)
})
forever(function () {
    if (sprite_player.bottom < 0 && !(updating_chunk)) {
        updating_chunk = true
        enable_controls(false)
        fade_in(300, true)
        chunk_y += -1
        generate_chunk(chunk_x, chunk_y)
        sprite_player.top = scene.screenHeight()
        fade_out(300, false)
        sprite_player.vy = -50
        pause(300)
        sprite_player.vy = 0
        enable_controls(true)
        updating_chunk = false
    }
})
forever(function () {
    if (sprite_player.left > scene.screenWidth() && !(updating_chunk)) {
        updating_chunk = true
        enable_controls(false)
        fade_in(300, true)
        chunk_x += 1
        generate_chunk(chunk_x, chunk_y)
        sprite_player.right = 0
        fade_out(300, false)
        sprite_player.vx = 50
        pause(300)
        sprite_player.vx = 0
        enable_controls(true)
        updating_chunk = false
    }
})
forever(function () {
    if (can_move) {
        if (controller.left.isPressed()) {
            sprite_player.vx = -50
        } else if (controller.right.isPressed()) {
            sprite_player.vx = 50
        } else {
            sprite_player.vx = 0
        }
        if (controller.up.isPressed()) {
            can_move_up = true
            for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
                if (sprite_player.overlapsWith(sprite)) {
                    if (Math.abs(sprite_player.bottom - sprite.bottom) < 2) {
                        can_move_up = false
                    }
                }
            }
            if (can_move_up) {
                sprite_player.vy = -50
            } else {
                sprite_player.vy = 0
            }
        } else if (controller.down.isPressed()) {
            can_move_down = true
            for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
                if (sprite_player.overlapsWith(sprite)) {
                    if (Math.abs(sprite_player.bottom - sprite.bottom) < 2) {
                        can_move_down = false
                    }
                }
            }
            if (can_move_down) {
                sprite_player.vy = 50
            } else {
                sprite_player.vy = 0
            }
        } else {
            sprite_player.vy = 0
        }
    } else {
        sprite_player.vx = 0
        sprite_player.vy = 0
    }
})
forever(function () {
    can_move = !(menu_opened)
    pause(100)
})
forever(function () {
    if (controller.A.isPressed()) {
        for (let sprite of get_overlapping_objects(sprite_player)) {
            sprites.setDataBoolean(sprite, "destroying", false)
        }
        sprites.setDataBoolean(sprite_player, "destroying", false)
        sprites.setDataBoolean(sprites.readDataSprite(sprite_player, "destroying_sprite"), "destroying", false)
        if (get_overlapping_objects(sprite_player).length > 0) {
            sprites.setDataBoolean(sprite_player, "destroying", true)
            sprites.setDataSprite(sprite_player, "destroying_sprite", get_overlapping_objects(sprite_player)[0])
            sprites.setDataBoolean(sprites.readDataSprite(sprite_player, "destroying_sprite"), "destroying", true)
            if (sprites.readDataNumber(sprites.readDataSprite(sprite_player, "destroying_sprite"), "health") > 0) {
                sprites.changeDataNumberBy(sprites.readDataSprite(sprite_player, "destroying_sprite"), "health", -1)
            }
        }
    }
    pause(500)
})
