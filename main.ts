namespace SpriteKind {
    export const Object = SpriteKind.create()
    export const GroundObject = SpriteKind.create()
    export const WalkableObject = SpriteKind.create()
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
function make_main_player () {
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
                    sprite_object = sprites.create(sprites.castle.tileGrass1, SpriteKind.GroundObject)
                } else if (object_number < 30) {
                    sprite_object = sprites.create(sprites.castle.tileGrass3, SpriteKind.GroundObject)
                } else if (object_number < 45) {
                    sprite_object = sprites.create(sprites.castle.tileGrass2, SpriteKind.GroundObject)
                } else if (object_number < 60) {
                    sprite_object = sprites.create(sprites.builtin.forestFlowers0, SpriteKind.WalkableObject)
                } else if (object_number < 75) {
                    sprite_object = sprites.create(sprites.builtin.forestFlowers1, SpriteKind.WalkableObject)
                } else {
                    if (chunk_rng.percentChance(20)) {
                        sprite_object = sprites.create(sprites.duck.tree, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(25)) {
                        sprite_object = sprites.create(sprites.castle.treePine, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(33)) {
                        sprite_object = sprites.create(sprites.castle.treeOak, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(50)) {
                        sprite_object = sprites.create(sprites.castle.treeSmallPine, SpriteKind.Object)
                    } else {
                        sprite_object = sprites.create(sprites.builtin.forestTree1, SpriteKind.Object)
                    }
                }
                sprite_object.setPosition(x * 2, y * 2)
            }
        }
    }
}
function make_forest () {
    scene.setBackgroundColor(7)
    for (let y = 0; y <= (scene.screenHeight() - 1) / 2; y++) {
        for (let x = 0; x <= (scene.screenWidth() - 1) / 2; x++) {
            if (chunk_rng.percentChance(1)) {
                object_number = chunk_rng.randomRange(0, 99)
                if (object_number < 15) {
                    sprite_object = sprites.create(sprites.castle.tileGrass1, SpriteKind.GroundObject)
                } else if (object_number < 30) {
                    sprite_object = sprites.create(sprites.castle.tileGrass3, SpriteKind.GroundObject)
                } else if (object_number < 45) {
                    sprite_object = sprites.create(sprites.castle.tileGrass2, SpriteKind.GroundObject)
                } else if (object_number < 60) {
                    sprite_object = sprites.create(sprites.builtin.forestScenery3, SpriteKind.WalkableObject)
                } else if (object_number < 75) {
                    sprite_object = sprites.create(sprites.builtin.forestScenery1, SpriteKind.Object)
                } else {
                    if (chunk_rng.percentChance(20)) {
                        sprite_object = sprites.create(sprites.duck.tree, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(25)) {
                        sprite_object = sprites.create(sprites.castle.treePine, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(33)) {
                        sprite_object = sprites.create(sprites.castle.treeOak, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(50)) {
                        sprite_object = sprites.create(sprites.castle.treeSmallPine, SpriteKind.Object)
                    } else {
                        sprite_object = sprites.create(sprites.builtin.forestTree1, SpriteKind.Object)
                    }
                }
                sprite_object.setPosition(x * 2, y * 2)
            }
        }
    }
}
function enable_controls (en: boolean) {
    if (en) {
        can_move = true
    } else {
        can_move = false
    }
}
function make_dark_forest () {
    scene.setBackgroundColor(6)
    for (let y = 0; y <= (scene.screenHeight() - 1) / 2; y++) {
        for (let x = 0; x <= (scene.screenWidth() - 1) / 2; x++) {
            if (chunk_rng.percentChance(1)) {
                object_number = chunk_rng.randomRange(0, 99)
                if (object_number < 15) {
                    sprite_object = sprites.create(sprites.castle.tileDarkGrass1, SpriteKind.GroundObject)
                } else if (object_number < 30) {
                    sprite_object = sprites.create(sprites.castle.tileDarkGrass3, SpriteKind.GroundObject)
                } else if (object_number < 45) {
                    sprite_object = sprites.create(sprites.castle.tileDarkGrass2, SpriteKind.GroundObject)
                } else if (object_number < 60) {
                    sprite_object = sprites.create(sprites.builtin.forestScenery3, SpriteKind.WalkableObject)
                } else if (object_number < 75) {
                    sprite_object = sprites.create(sprites.builtin.forestScenery1, SpriteKind.Object)
                } else {
                    if (chunk_rng.percentChance(25)) {
                        sprite_object = sprites.create(sprites.builtin.forestTree1, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(33)) {
                        sprite_object = sprites.create(sprites.builtin.forestTree0, SpriteKind.Object)
                    } else if (chunk_rng.percentChance(50)) {
                        sprite_object = sprites.create(sprites.builtin.forestTree2, SpriteKind.Object)
                    } else {
                        sprite_object = sprites.create(sprites.builtin.forestTree3, SpriteKind.Object)
                    }
                }
                sprite_object.setPosition(x * 2, y * 2)
            }
        }
    }
}
let can_move_down = false
let can_move_up = false
let can_move = false
let sprite_object: Sprite = null
let object_number = 0
let sprite_player: Sprite = null
let biome_number = 0
let chunk_rng: FastRandomBlocks = null
let output = 0
let user_seed = 0
timer.background(function () {
    fade_out(2000, true)
})
user_seed = Math.abs(game.askForNumber("Enter a seed:"))
color.pauseUntilFadeDone()
color.setPalette(
color.Black
)
if (user_seed != user_seed) {
    user_seed = randint(0, 65535)
}
let chunk_x = 0
let chunk_y = 0
let updating_chunk = false
make_main_player()
generate_chunk(chunk_x, chunk_y)
fade_out(2000, false)
game.onUpdate(function () {
    for (let sprite of sprites.allOfKind(SpriteKind.Player)) {
        sprite.z = sprite.bottom
    }
    for (let sprite of sprites.allOfKind(SpriteKind.GroundObject)) {
        sprite.z = -100000000000000000000
    }
    for (let sprite of sprites.allOfKind(SpriteKind.WalkableObject)) {
        sprite.z = sprite.bottom
    }
    for (let sprite of sprites.allOfKind(SpriteKind.Object)) {
        sprite.z = sprite.bottom
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
    }
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
