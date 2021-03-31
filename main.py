def create_enemies():
    global enemies
    enemies = []
    for index in range(5):
        enemies.append(game.create_sprite(index, 0))
        soundExpression.giggle.play()
        basic.pause(500)

def on_button_pressed_a():
    hero.set(LedSpriteProperty.DIRECTION, -90)
    hero.move(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def start_game():
    music.start_melody(music.built_in_melody(Melodies.FUNK), MelodyOptions.ONCE)

def is_all_enemies_deleted():
    for e in enemies:
        if e.get(LedSpriteProperty.BRIGHTNESS) != 0:
            return 0
    return 1

def on_button_pressed_ab():
    global beam, f
    beam = game.create_sprite(hero.get(LedSpriteProperty.X), 3)
    while beam.get(LedSpriteProperty.Y) != 0:
        music.play_tone(494, music.beat(BeatFraction.EIGHTH))
        basic.pause(500)
        beam.change(LedSpriteProperty.BLINK, 1)
        beam.change(LedSpriteProperty.Y, -1)
        for e_index in range(5):
            f = enemies[e_index]
            if beam.is_touching(f) and f.get(LedSpriteProperty.BRIGHTNESS) != 0:
                music.play_tone(131, music.beat(BeatFraction.EIGHTH))
                f.set(LedSpriteProperty.BRIGHTNESS, 0)
                game.add_score(1)
    beam.delete()
    if is_all_enemies_deleted():
        music.start_melody(music.built_in_melody(Melodies.POWER_UP), MelodyOptions.ONCE)
        game.game_over()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    hero.set(LedSpriteProperty.DIRECTION, 90)
    hero.move(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def reset():
    create_enemies()
    start_game()

f: game.LedSprite = None
beam: game.LedSprite = None
enemies: List[game.LedSprite] = []
hero: game.LedSprite = None
hero = game.create_sprite(2, 4)
reset()