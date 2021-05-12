function MenuSelect (selectNumber: number) {
    if (selectNumber == 2) {
        soundExpression.giggle.play()
        GameStart()
    }
}
function RunNextScreen () {
    if (ScreenNumber == 1) {
        levelImage = images.createImage(`
            # # # # #
            # . # . #
            . . . . .
            . # . # .
            # # # # #
            `)
        levelImage.showImage(0)
        led.plotBrightness(0, 3, 50)
        led.plotBrightness(2, 3, 50)
        led.plotBrightness(4, 3, 50)
        led.plotBrightness(3, 1, 50)
        led.plotBrightness(1, 1, 50)
        playerX = 2
        playerY = 2
        led.plot(playerX, playerY)
    }
}
input.onButtonPressed(Button.A, function () {
    if (ScreenNumber <= 1) {
        if (!(isPlayerDead)) {
            if (playerX > 0) {
                if (led.point(playerX - 1, playerY) == false) {
                    led.unplot(playerX, playerY)
                    playerX += -1
                    led.plot(playerX, playerY)
                }
            }
        }
    }
})
function PlayerGhostAnimation () {
    soundExpression.mysterious.play()
    while (playerY >= 1) {
        led.unplot(playerX, playerY)
        playerY += -1
        levelImage.showImage(levelOffsetX)
        led.plotBrightness(playerX, playerY, 50)
        basic.pause(tickSpeed * 4)
    }
    GameStart()
}
function GameStart () {
    ScreenNumber = -1
    StartAnimation()
    basic.pause(tickSpeed * 4)
    playerX = 0
    playerY = 3
    ScreenNumber = 0
    levelImage = images.createImage(`
        . . . . .
        # # . . .
        . . . # #
        . . . . .
        # # # . .
        `)
    levelImage.showImage(0)
    levelOffsetX = 0
    isInGame = true
    basic.pause(tickSpeed)
    soundExpression.slide.play()
    basic.pause(tickSpeed * 2)
    isPlayerDead = false
    playerX = 0
    playerY = 3
    led.plot(playerX, playerY)
}
input.onButtonPressed(Button.AB, function () {
    if (ScreenNumber == 1) {
        MenuSelect(playerX)
    } else if (ScreenNumber == 0) {
        if (!(isPlayerDead)) {
            if (led.point(playerX, playerY + 1) && led.point(playerX, playerY - 1) == false) {
                isJumpingUp = true
                led.unplot(playerX, playerY)
                playerY += -1
                led.plot(playerX, playerY)
                basic.pause(tickSpeed)
                if (led.point(playerX, playerY - 1) == false) {
                    led.unplot(playerX, playerY)
                    playerY += -1
                    led.plot(playerX, playerY)
                }
                basic.pause(tickSpeed * 3)
                isJumpingUp = false
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (ScreenNumber <= 1) {
        if (!(isPlayerDead)) {
            if (playerX < 4) {
                if (led.point(playerX + 1, playerY) == false) {
                    led.unplot(playerX, playerY)
                    playerX += 1
                    led.plot(playerX, playerY)
                }
            }
        }
    }
})
function StartAnimation () {
    if (input.runningTime() < 100) {
        soundExpression.yawn.play()
    }
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(tickSpeed)
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(tickSpeed)
    basic.showIcon(IconNames.Diamond)
    basic.pause(tickSpeed)
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
        `)
    if (ScreenNumber != 0) {
        RunNextScreen()
    }
}
let isJumpingUp = false
let isInGame = false
let levelOffsetX = 0
let isPlayerDead = false
let playerY = 0
let playerX = 0
let levelImage: Image = null
let ScreenNumber = 0
let tickSpeed = 0
tickSpeed = 100
ScreenNumber = 1
StartAnimation()
basic.forever(function () {
    if (ScreenNumber == 0) {
        if (!(isPlayerDead)) {
            if (isJumpingUp == false) {
                if (!(led.point(playerX, playerY + 1))) {
                    led.unplot(playerX, playerY)
                    playerY += 1
                    led.plot(playerX, playerY)
                    basic.pause(tickSpeed)
                }
            }
        }
        if (isPlayerDead) {
            PlayerGhostAnimation()
        }
        if (playerY > 4) {
            isPlayerDead = true
        }
    }
})
