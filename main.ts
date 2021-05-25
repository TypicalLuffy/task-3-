function MovePlayer (isXAxis: boolean, magnitude: number) {
    if (!(isPlayerDead)) {
        for (let index = 0; index < Math.abs(magnitude); index++) {
            basic.pause(tickSpeed)
            if (IsInMultiplayer) {
                radio.sendValue("MyLevel", levelNumber)
                radio.sendString("Unplot")
            }
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
                    isOnTopMap = true
                    if (isOnTallMap) {
                        if (playerY < 0) {
                            levelImageTop.showImage(levelOffsetX)
                        } else {
                            levelImage.showImage(levelOffsetX)
                        }
                    } else {
                        levelImage.showImage(levelOffsetX)
                    }
                    isOnTopMap = false
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
                    isOnTopMap = true
                    if (Math.constrain(magnitude, -1, 1) < 0) {
                        MapTopOrBottom(true)
                    } else {
                        MapTopOrBottom(false)
                    }
                    playerY += Math.constrain(magnitude, -1, 1)
                    isOnTopMap = false
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
            if (IsInMultiplayer) {
                if (isOnLongMap) {
                    radio.sendValue("OtherX", levelOffsetX)
                } else {
                    radio.sendValue("OtherX", playerX)
                }
                radio.sendValue("OtherY", playerY)
                if (TheirLevel == levelNumber) {
                    radio.sendString("Plot")
                    PlotUnplot_OtherPlayer(true)
                }
            }
            if (PlayerInWinPos() == true) {
                soundExpression.happy.play()
                levelNumber += 1
                isOnTopMap = false
                if (IsInMultiplayer) {
                    radio.sendString("Unplot")
                }
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
function OpenMultiPlayerServerSelect () {
    ScreenNumber = 2
    playerX = 0
    StartAnimation(false)
    radio.setGroup(33)
    playerX = 0
    WaitingForAnswer = 0
    basic.showNumber(playerX)
    while (!(input.logoIsPressed())) {
        basic.pause(1)
    }
    radio.setGroup(playerX * 26)
    levelNumber = 1
    IsInMultiplayer = true
    soundExpression.giggle.play()
    LevelStart()
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
        if (IsInMultiplayer) {
            IsInMultiplayer = false
            radio.setGroup(33)
        }
        StartAnimation(true)
    }
}
function RunMenu () {
    if (ScreenNumber == 1) {
        levelImage = images.createImage(`
            # # # # #
            # # # # #
            . . . . .
            # # # # #
            # # # # #
            `)
        levelImage.showImage(0)
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
function PlotUnplot_OtherPlayer (IsPlot: boolean) {
    if (levelNumber == TheirLevel) {
        if (IsPlot) {
            if (isOnLongMap) {
                if (playerY < 0) {
                    led.plotBrightness(Player2X - levelOffsetX + 2, Player2Y + 5, 150)
                } else {
                    led.plotBrightness(Player2X - levelOffsetX + 2, Player2Y, 150)
                }
            } else {
                led.plotBrightness(Player2X, Player2Y, 150)
            }
        } else {
            if (isOnLongMap) {
                if (playerY < 0) {
                    led.unplot(Player2X - levelOffsetX + 2, Player2Y + 5)
                } else {
                    led.unplot(Player2X - levelOffsetX + 2, Player2Y)
                }
            } else {
                led.unplot(Player2X, Player2Y)
            }
        }
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
    if (selectNumber == 1) {
        levelNumber = 1
        soundExpression.giggle.play()
        LevelStart()
    } else if (selectNumber == 3) {
        soundExpression.giggle.play()
        OpenMultiPlayerServerSelect()
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
        if (isOnTopMap) {
            led.plotBrightness(playerX, playerY, 175)
        }
    } else {
        if (playerY < 0) {
            if (isOnTopMap) {
                led.plotBrightness(playerX, playerY, 175)
            }
        } else {
            if (isOnTopMap) {
                led.plotBrightness(playerX, playerY + 5, 175)
            }
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
        playerX += -1
        playerX = Math.constrain(playerX, 0, 9)
        basic.showNumber(playerX)
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
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
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
    if (levelNumber == TheirLevel) {
        if (receivedString == "Plot" && levelNumber == TheirLevel) {
            PlotUnplot_OtherPlayer(true)
        }
        if (receivedString == "Unplot" && levelNumber == TheirLevel) {
            PlotUnplot_OtherPlayer(false)
        }
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
        playerX += 1
        playerX = Math.constrain(playerX, 0, 9)
        basic.showNumber(playerX)
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
    if (name == "OtherX") {
        Player2X = value
    } else if (name == "OtherY") {
        Player2Y = value
    }
    if (name == "MyLevel") {
        TheirLevel = value
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (ScreenNumber >= 2) {
        WaitingForAnswer = 1
    } else if (ScreenNumber == 0) {
        Jump()
    } else if (ScreenNumber == 1) {
        MenuSelect(playerX)
    }
})
let walkLock = false
let isJumpingUp = false
let Player2Y = 0
let Player2X = 0
let winPosY = 0
let winPosX = 0
let isInGame = false
let WaitingForAnswer = 0
let TheirLevel = 0
let levelImage: Image = null
let levelImageTop: Image = null
let levelOffsetX = 0
let playerY = 0
let playerX = 0
let levelNumber = 0
let IsInMultiplayer = false
let isPlayerDead = false
let jumpPower = 0
let ScreenNumber = 0
let tickSpeed = 0
let isOnLongMap = false
let isOnTallMap = false
let isOnTopMap = false
isOnTopMap = false
isOnTallMap = false
isOnLongMap = false
tickSpeed = 100
ScreenNumber = 1
jumpPower = 1
StartAnimation(true)
basic.forever(function () {
    Update()
})
