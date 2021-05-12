function MovePlayer (isXAxis: boolean, magnitude: number) {
    if (!(isPlayerDead)) {
        for (let index = 0; index < Math.abs(magnitude); index++) {
            basic.pause(tickSpeed)
            if (isXAxis) {
                if (isOnLongMap) {
                    if (!(isOnTallMap)) {
                        if (led.point(playerX + Math.constrain(magnitude, -1, 1), playerY) == false) {
                            levelOffsetX += Math.constrain(magnitude, -1, 1)
                        }
                    } else {
                        if (playerY < 0) {
                            if (led.point(playerX + Math.constrain(magnitude, -1, 1), playerY + 5) == false) {
                                levelOffsetX += Math.constrain(magnitude, -1, 1)
                            }
                        } else {
                            if (led.point(playerX + Math.constrain(magnitude, -1, 1), playerY) == false) {
                                levelOffsetX += Math.constrain(magnitude, -1, 1)
                            }
                        }
                    }
                    i0 = true
                    if (isOnTallMap) {
                        if (playerY < 0) {
                            levelImageTop.showImage(levelOffsetX)
                        } else {
                            levelImage.showImage(levelOffsetX)
                        }
                    } else {
                        levelImage.showImage(levelOffsetX)
                    }
                    i0 = false
                    if (!(isOnTallMap)) {
                        led.plotBrightness(playerX, playerY, 175)
                    } else {
                        if (playerY < 0) {
                            led.plotBrightness(playerX, playerY + 5, 175)
                        } else {
                            led.plotBrightness(playerX, playerY, 175)
                        }
                    }
                } else {
                    if (!(led.point(playerX + Math.constrain(magnitude, -1, 1), playerY)) && (playerX + Math.constrain(magnitude, -1, 1) <= 4 && playerX + Math.constrain(magnitude, -1, 1) >= 0)) {
                        led.unplot(Math.constrain(playerX, 0, 4), playerY)
                        playerX += Math.constrain(magnitude, -1, 1)
                        led.plotBrightness(Math.constrain(playerX, 0, 4), playerY, 175)
                    }
                }
            } else {
                if (isOnTallMap) {
                    if (playerY < 0) {
                        led.unplot(playerX, playerY + 5)
                    } else {
                        led.unplot(playerX, playerY)
                    }
                    i0 = true
                    if (Math.constrain(magnitude, -1, 1) < 0) {
                        MapTopOrBottom(true)
                    } else {
                        MapTopOrBottom(false)
                    }
                    playerY += Math.constrain(magnitude, -1, 1)
                    i0 = false
                    if (!(isOnTallMap)) {
                        led.plotBrightness(playerX, playerY, 175)
                    } else {
                        if (playerY < 0) {
                            led.plotBrightness(playerX, playerY + 5, 175)
                        } else {
                            led.plotBrightness(playerX, playerY, 175)
                        }
                    }
                    if (playerY > 4) {
                        isPlayerDead = true
                    }
                    if (isPlayerDead) {
                        PlayerGhostAnimation()
                    }
                } else {
                    led.unplot(playerX, playerY)
                    playerY += Math.constrain(magnitude, -1, 1)
                    led.plotBrightness(playerX, playerY, 175)
                    if (playerY > 4) {
                        isPlayerDead = true
                    }
                    if (isPlayerDead) {
                        PlayerGhostAnimation()
                    }
                }
            }
            if (PlayerInWinPos() == true) {
                soundExpression.happy.play()
                levelNumber += 1
                i0 = false
                LevelStart()
            }
        }
    }
    if (ScreenNumber == 1) {
        led.unplot(Math.constrain(playerX, 0, 4), playerY)
        playerX += Math.constrain(magnitude, -1, 1)
        led.plotBrightness(Math.constrain(playerX, 0, 4), playerY, 175)
    }
}
function LevelStart () {
    if (levelNumber == 1) {
        StartLevel(0, 3, images.createImage(`
            # # . . .
            . . . . .
            . . . # #
            . . . # #
            # # # # #
            `), 4, 1, false, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 2) {
        StartLevel(0, 3, images.createImage(`
            . . . . .
            . . . . .
            . . . # .
            . . . # .
            # # # # #
            `), 4, 3, false, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 3) {
        StartLevel(0, 3, images.createImage(`
            . . . . .
            # # . . .
            . . . # #
            . . . # #
            # # # # #
            `), 0, 0, false, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 4) {
        StartLevel(0, 3, images.createImage(`
            . . . . .
            # # . . .
            . . . # #
            . . . . .
            # # # . .
            `), 0, 0, false, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 5) {
        StartLevel(0, 3, images.createImage(`
            . . . . .
            # # # . .
            . . . . .
            . . . # .
            # # # # .
            `), 0, 0, false, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 6) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . . . . . . .
            . . . . . . . . . .
            . # # . . . # # # #
            . # . . . . . # # #
            # # . . # # . # # #
            `), 9, 1, true, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 7) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . . . . # . .
            . . . # # # . # # .
            . # # # # . . . . .
            . . . # # . # # # #
            # # . # # . # # # #
            `), 8, 0, true, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 8) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . . . . # . .
            . . . . . . . # # .
            . . # # . . . . . .
            . . # # . # # # # #
            # # # # . # # # # #
            `), 8, 0, true, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 9) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . . . . . . .
            . . . . . . . . . .
            . # # . # # . # # #
            . # # . # # . # # #
            # # # . # # . # # #
            `), 9, 1, true, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 10) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . . . . . . .
            . . . . # # . . . .
            . . # . # # . # # #
            . . # . # # . # # #
            # # # . # # . # # #
            `), 9, 1, true, false, images.iconImage(IconNames.Scissors))
    } else if (levelNumber == 11) {
        StartLevel(0, 3, images.createBigImage(`
            . . . . # # # # # .
            . . . # # # # # # .
            . . # # # # # # # .
            . . # # # # # . . .
            # # # # # # # # # #
            `), 7, 3, true, true, images.createBigImage(`
            . . . . . # # # . .
            . . . . . # # # . .
            . . . . . # # # . .
            . . . . . . . . . .
            . . . . # # # # # .
            `))
    } else if (levelNumber == 12) {
        StartLevel(0, 2, images.createBigImage(`
            # . . # # # . . . .
            . . # # # # . . . .
            . . # # # # . . . .
            # # # # # # . . . .
            # # # # # # . . . .
            `), 9, -5, true, true, images.createBigImage(`
            . . . . . . . . . .
            . . . . . . # # # #
            . . . . . . . . . .
            . . . # # # . . . .
            # # . # # # . . . .
            `))
    } else if (levelNumber == 13) {
        StartLevel(0, 3, images.createBigImage(`
            . . # . . . . . . .
            # . # . . . # # . .
            . . . . . . . . . .
            . . . . # # . . . .
            # # # # . . . . . .
            `), 0, 0, true, true, images.createBigImage(`
            . . . . . . . . . .
            . . . . . . . . . .
            . . # # # # # # . .
            . . # . . . . . . .
            . . # . . . . . # #
            `))
    } else if (levelNumber == 14) {
        StartLevel(0, 0, images.createBigImage(`
            . . # # # # # # # #
            # # # . . . . . . #
            # # # . # # # . . .
            . . . . # # # . . .
            # # # # # # # # # #
            `), 0, 3, true, true, images.createBigImage(`
            . . . . . . . . . .
            . . . # # # . . . .
            # # . # # # . . . .
            . . . . # # # # # #
            . . # # # # # # # #
            `))
    } else if (levelNumber == 15) {
        StartLevel(0, 0, images.createBigImage(`
            . . # # . . . . # #
            # # # # . . . # # #
            # # # # . . . # # #
            # # # # . # # # # #
            # # # # . # # # # #
            `), 0, -4, true, true, images.createBigImage(`
            . . . . . . . . . .
            . # # # # . . . . .
            # # # # # . # # . .
            . . . . . . . . . .
            . . # # . . . . # #
            `))
    } else {
        soundExpression.twinkle.play()
        ScreenNumber = -1
        isOnLongMap = false
        isOnTallMap = false
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(tickSpeed)
        basic.showIcon(IconNames.Heart)
        basic.pause(tickSpeed)
        basic.showIcon(IconNames.Cow)
        basic.pause(tickSpeed)
        basic.showIcon(IconNames.Happy)
        basic.pause(tickSpeed)
        StartAnimation(true)
    }
}
function RunMenu () {
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
        basic.pause(tickSpeed)
        playerY = 2
        led.plotBrightness(playerX, playerY, 175)
    }
}
function StartLevel (spawnX: number, spawnY: number, levelPicture: Image, goalX: number, goalY: number, isMediumMap: boolean, isLargeMap: boolean, mapTopHalf: Image) {
    if (isMediumMap) {
        isOnLongMap = true
    } else {
        isOnLongMap = false
    }
    if (isLargeMap) {
        isOnTallMap = true
    } else {
        isOnTallMap = false
    }
    ScreenNumber = -1
    StartAnimation(false)
    basic.pause(tickSpeed * 4)
    if (isMediumMap || isLargeMap) {
        playerX = spawnX + 2
        playerY = spawnY
    } else {
        playerX = spawnX
        playerY = spawnY
    }
    ScreenNumber = 0
    levelImage = levelPicture
    levelImageTop = mapTopHalf
    if (isMediumMap || isLargeMap) {
        levelOffsetX = -2
        levelImage.showImage(levelOffsetX)
    } else {
        levelOffsetX = 0
        levelImage.showImage(0)
    }
    isInGame = true
    basic.pause(tickSpeed)
    soundExpression.slide.play()
    basic.pause(tickSpeed * 2)
    if (isMediumMap) {
        winPosX = goalX - 2
    } else {
        winPosX = goalX
    }
    winPosY = goalY
    isPlayerDead = false
    if (isMediumMap || isLargeMap) {
        playerX = spawnX + 2
        playerY = spawnY
        led.plotBrightness(spawnX + 2, spawnY, 175)
    } else {
        playerX = spawnX
        playerY = spawnY
        led.plotBrightness(spawnX, spawnY, 175)
    }
}
function MapTopOrBottom (willMoveUp: boolean) {
    if (willMoveUp) {
        if (playerY == 0) {
            levelImageTop.showImage(levelOffsetX)
        }
    } else {
        if (playerY == -1) {
            levelImage.showImage(levelOffsetX)
        }
    }
}
function MenuSelect (selectNumber: number) {
    if (selectNumber == 2) {
        levelNumber = 1
        soundExpression.giggle.play()
        LevelStart()
    } else if (selectNumber == 3) {
        soundExpression.giggle.play()
        OpenMultiPlayerSearch()
    }
}
function Update () {
    if (ScreenNumber == 0) {
        if (!(isPlayerDead)) {
            if (isJumpingUp == false) {
                if (isOnTallMap == false) {
                    if (!(led.point(playerX, playerY + 1))) {
                        MovePlayer(false, 1)
                        basic.pause(tickSpeed)
                    }
                } else {
                    if (playerY < 0) {
                        if (!(led.point(playerX, playerY + 6))) {
                            MovePlayer(false, 1)
                            basic.pause(tickSpeed)
                        }
                    } else {
                        if (!(led.point(playerX, playerY + 1))) {
                            MovePlayer(false, 1)
                            basic.pause(tickSpeed)
                        }
                    }
                }
            }
        }
    }
    if (isOnTallMap == false) {
        if (i0) {
            led.plotBrightness(playerX, playerY, 175)
        }
    } else {
        if (playerY < 0) {
            if (i0) {
                led.plotBrightness(playerX, playerY, 175)
            }
        } else {
            if (i0) {
                led.plotBrightness(playerX, playerY + 5, 175)
            }
        }
    }
}
function CheckAnswerPicture () {
    if (ScreenNumber == 2) {
        if (playerX == 0) {
            AnswerPicture = images.iconImage(IconNames.Yes)
        } else if (playerX == 1) {
            AnswerPicture = images.iconImage(IconNames.No)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (ScreenNumber <= 1) {
        if (!(walkLock)) {
            if (ScreenNumber <= 1) {
                MovePlayer(true, -1)
            }
        }
    } else if (ScreenNumber >= 2) {
        if (waitingForAnswer) {
            playerX += -1
            playerX = Math.constrain(playerX, 0, 1)
            CheckAnswerPicture()
        }
    }
})
function Jump () {
    if (!(isPlayerDead)) {
        if (!(isOnTallMap)) {
            if (led.point(playerX, playerY + 1) && led.point(playerX, playerY - 1) == false) {
                isJumpingUp = true
                MovePlayer(false, -1)
                for (let index = 0; index < jumpPower; index++) {
                    if (led.point(playerX, playerY - 1) == false) {
                        basic.pause(tickSpeed)
                        MovePlayer(false, -1)
                    }
                }
                basic.pause(tickSpeed * 3)
                walkLock = true
                basic.pause(tickSpeed)
                isJumpingUp = false
                walkLock = false
            }
        } else {
            if (playerY >= 0) {
                if (led.point(playerX, playerY + 1) && led.point(playerX, playerY + -1) == false) {
                    isJumpingUp = true
                    MovePlayer(false, -1)
                    for (let index = 0; index < jumpPower; index++) {
                        if (led.point(playerX, playerY - 1) == false) {
                            basic.pause(tickSpeed)
                            MovePlayer(false, -1)
                        }
                    }
                    basic.pause(tickSpeed * 3)
                    walkLock = true
                    basic.pause(tickSpeed)
                    isJumpingUp = false
                    walkLock = false
                }
            } else {
                if (led.point(playerX, playerY + 6) && led.point(playerX, playerY + 4) == false) {
                    isJumpingUp = true
                    MovePlayer(false, -1)
                    for (let index = 0; index < jumpPower; index++) {
                        if (led.point(playerX, playerY + 4) == false) {
                            basic.pause(tickSpeed)
                            MovePlayer(false, -1)
                        }
                    }
                    basic.pause(tickSpeed * 3)
                    walkLock = true
                    basic.pause(tickSpeed)
                    isJumpingUp = false
                    walkLock = false
                }
            }
        }
    }
}
function PlayerGhostAnimation () {
    soundExpression.mysterious.play()
    while (playerY >= 1) {
        led.unplot(playerX, playerY)
        playerY += -1
        levelImage.showImage(levelOffsetX)
        led.plotBrightness(playerX, playerY, 25)
        basic.pause(tickSpeed * 4)
    }
    LevelStart()
}
function PlayerInWinPos () {
    if (isPlayerDead) {
        return false
    } else {
        if (isOnLongMap) {
            if (levelOffsetX == winPosX && playerY == winPosY) {
                return true
            } else {
                return false
            }
        } else {
            if (playerX == winPosX && playerY == winPosY) {
                return true
            } else {
                return false
            }
        }
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "FindingPlayers") {
        waitingForSignal = false
    }
    if (receivedString == "yes") {
        WaitingForOthersAnswer = false
    }
})
input.onButtonPressed(Button.B, function () {
    if (ScreenNumber <= 1) {
        if (!(walkLock)) {
            if (ScreenNumber <= 1) {
                MovePlayer(true, 1)
            }
        }
    } else if (ScreenNumber >= 2) {
        if (waitingForAnswer) {
            playerX += 1
            playerX = Math.constrain(playerX, 0, 1)
            CheckAnswerPicture()
        }
    }
})
function StartAnimation (doGoToMenu: boolean) {
    if (doGoToMenu) {
        soundExpression.yawn.play()
    }
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(tickSpeed)
    basic.showIcon(IconNames.Diamond)
    basic.pause(tickSpeed)
    basic.showLeds(`
        . # . # .
        # . . . #
        . . . . .
        # . . . #
        . # . # .
        `)
    isPlayerDead = true
    if (doGoToMenu) {
        ScreenNumber = 1
        RunMenu()
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "yes") {
        if (!(waitingForAnswer)) {
            if (playerX == 0) {
                radio.setGroup(value)
                basic.clearScreen()
            }
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (ScreenNumber >= 2) {
        waitingForAnswer = false
    } else if (ScreenNumber == 0) {
        Jump()
    } else if (ScreenNumber == 1) {
        MenuSelect(playerX)
    }
})
function OpenMultiPlayerSearch () {
    ScreenNumber = 2
    playerX = 0
    StartAnimation(false)
    radio.setGroup(1)
    radio.sendString("FindingPlayers")
    waitingForSignal = true
    while (waitingForSignal) {
        StartAnimation(false)
    }
    radio.sendString("FindingPlayers")
    basic.showIcon(IconNames.StickFigure)
    basic.pause(tickSpeed)
    basic.showIcon(IconNames.Yes)
    waitingForAnswer = true
    playerX = 0
    while (waitingForAnswer) {
        AnswerPicture.showImage(0)
        basic.pause(tickSpeed)
    }
    _1on1Channel = randint(1, 255)
    if (playerX == 0) {
        radio.sendValue("yes", _1on1Channel)
        WaitingForOthersAnswer = true
        basic.showIcon(IconNames.Asleep)
        while (WaitingForOthersAnswer) {
            basic.pause(tickSpeed)
        }
    } else {
        radio.sendString("no")
        StartAnimation(true)
    }
}
let _1on1Channel = 0
let WaitingForOthersAnswer = false
let waitingForSignal = false
let waitingForAnswer = false
let walkLock = false
let isJumpingUp = false
let winPosY = 0
let winPosX = 0
let isInGame = false
let levelNumber = 0
let levelImage: Image = null
let levelImageTop: Image = null
let levelOffsetX = 0
let playerY = 0
let playerX = 0
let isPlayerDead = false
let jumpPower = 0
let ScreenNumber = 0
let tickSpeed = 0
let AnswerPicture: Image = null
let isOnLongMap = false
let isOnTallMap = false
let i0 = false
i0 = false
isOnTallMap = false
isOnLongMap = false
AnswerPicture = images.iconImage(IconNames.Yes)
tickSpeed = 100
ScreenNumber = 1
jumpPower = 1
StartAnimation(true)
basic.forever(function () {
    Update()
})
