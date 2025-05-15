/**
 * But de simuler un mouvement qui techniquement est une alternance d'affichage/suppression
 */

// fonction qui dessine les briques
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (tabBricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop
                tabBricks[c][r].x = brickX
                tabBricks[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "red"
                ctx.fill()
                ctx.closePath
            }
        }
    }
}

//fonction qui dessine la raquette
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
    if (rightPressed) {
        paddleX += 6
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
        }
    } else if(leftPressed) {
        paddleX -= 6
        if (paddleX < 0) {
            paddleX = 0
        }
    }
}

//fonctions qui dessinent la balle
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function drawBallBlue() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "blue"
    ctx.fill()
    ctx.closePath()
}

// fonctions qui gérent l'événement d'appui sur une touche fléchée
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
    }
}

// fonction qui met à jour la position de la raquette en fonction de la position de la souris
function mouseMoveHandler(e) {
    relativeX = e.clientX - canvas.offsetLeft
    if (relativeX >= paddleWidth/2 && relativeX <= canvas.width - paddleWidth/2) {
        paddleX = relativeX - paddleWidth/2
    } else if (relativeX < paddleWidth/2) {
        paddleX = 0
    } else {
        paddleX = canvas.width - paddleWidth
    }
}

// fonction qui detecte les collisions
// qui parcoure chaque brique et compare sa position avec
// les coordonnées de la balle à chaque image dessinée
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = tabBricks[c][r]
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    score ++
                    interrupteur = !interrupteur //pour faire changer la balle de couleur
                    if (score === brickRowCount * brickColumnCount) {
                        alert("Bravo ! Si vous êtes un recruteur contactez-moi !")
                        document.location.reload()
                    }
                }
            }
        }
    }
}

//Nos écouteurs pour être informé de l'appui sur les touches : une pour appui une quand relache
 let keyDownEvent = document.addEventListener("keydown", (event)=> {
    keyDownHandler(event)
})
let keyUpEvent = document.addEventListener("keyup", (event)=> {
    keyUpHandler(event)
})

// écouteur pour gérer le contrôle du paddle à la souris
let mouseMoveEvent = document.addEventListener("mousemove", (event)=> {
    mouseMoveHandler(event)
})
// fonction qui dessine le score sur le canevas
function drawScore() {
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("Score: "+ score, 10, 23)
}

//fonction vie
function drawLives() {
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("Vies: "+ vies, canvas.width - 58, 23)
}