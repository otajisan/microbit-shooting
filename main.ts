function create_enemies() {
    
    enemies = []
    for (let index = 0; index < 5; index++) {
        enemies.push(game.createSprite(index, 0))
        soundExpression.giggle.play()
        basic.pause(500)
    }
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    hero.set(LedSpriteProperty.Direction, -90)
    hero.move(1)
})
function start_game() {
    music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
}

function is_all_enemies_deleted(): number {
    for (let e of enemies) {
        if (e.get(LedSpriteProperty.Brightness) != 0) {
            return 0
        }
        
    }
    return 1
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    beam = game.createSprite(hero.get(LedSpriteProperty.X), 3)
    while (beam.get(LedSpriteProperty.Y) != 0) {
        music.playTone(494, music.beat(BeatFraction.Eighth))
        basic.pause(500)
        beam.change(LedSpriteProperty.Blink, 1)
        beam.change(LedSpriteProperty.Y, -1)
        for (let e_index = 0; e_index < 5; e_index++) {
            f = enemies[e_index]
            if (beam.isTouching(f) && f.get(LedSpriteProperty.Brightness) != 0) {
                music.playTone(131, music.beat(BeatFraction.Eighth))
                f.set(LedSpriteProperty.Brightness, 0)
                game.addScore(1)
            }
            
        }
    }
    beam.delete()
    if (is_all_enemies_deleted()) {
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        game.gameOver()
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    hero.set(LedSpriteProperty.Direction, 90)
    hero.move(1)
})
function reset() {
    create_enemies()
    start_game()
}

let f : game.LedSprite = null
let beam : game.LedSprite = null
let enemies : game.LedSprite[] = []
let hero : game.LedSprite = null
hero = game.createSprite(2, 4)
reset()
