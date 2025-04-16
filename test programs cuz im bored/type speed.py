import pygame

pygame.init()
font = pygame.font.Font("freesansbold.ttf", 24)
screen = pygame.display.set_mode([800, 500])
timer = pygame.time.Clock()
message = "Check out this sweet message!"
snip = font.render("", True, "white")
counter = 0
speed = 3
done = False

run = True
while run:
    screen.fill("dark gray")
    timer.tick(60)
    pygame.draw.rect(screen, "black", [0, 300, 800, 200])
    if counter < speed * len(message):
        counter += 1
    elif counter >= speed * len(message):
        done = True

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False

    snip = font.render(message[0:counter//speed], True, "white")
    screen.blit(snip, (10, 310))

    pygame.display.flip()
pygame.quit()