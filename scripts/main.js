//fonction qui éxecute le jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // "nettoie" le canevas pour créer l'illusion du mouvement

    if (interrupteur === true) {
        drawBall()
    }
    else {
        drawBallBlue()
    }

    drawBricks()

    x += dx
    y += dy 

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            let pointImpact = (x - paddleX) / paddleWidth         // position de la balle sur la raquette
            let angle = (pointImpact - 0.5) * Math.PI / 2          // on défini notre nouvel angle entre -45 et 45 degré et on centre l'origine de notre angle au milieu avec -0,5

            let speed = Math.sqrt(dx * dx + dy * dy) * 1.05      // légère accélération

            dx = speed * Math.sin(angle)                        //on calcule l'angle par rapport à la verticale d'ou sin pour x et cos pour y
            dy = -speed * Math.cos(angle)
                            
            interrupteur = !interrupteur
        }
        else {
            vies --
            if (!vies) {
                alert("Game Over")
                document.location.reload()
            }
            else {
                x = canvas.width / 2
                y = canvas.height - 30
                dx = 3
                dy = -3
                paddleX = (canvas.width - paddleWidth) / 2
            }

        }
    }

    drawPaddle()

    drawScore()

    drawLives()

    collisionDetection()

    requestAnimationFrame(draw) //permet au navigateur de gérer la cadence d'appel à la fonction draw
                                //ça fluidifie l'animation plutôt que l'ancienne méthode setInterval qui
                                //fixait la cadence à une valeur fixe
}

draw()
