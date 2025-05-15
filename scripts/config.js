// Enregistrement de la référence à l'élément canvas dans une variable :
let canvas = document.getElementById("myCanvas")
//Stockage du contexte de rendu 2D ou outil réel que nous pouvons utiliser pour peindre sur Canvas
let ctx = canvas.getContext("2d")


let score = 0
let vies = 2

//variables utiles pour créer la balle et gérer son déplacement
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 3 
let dy = -3

let ballRadius = 10
let interrupteur = true

//variables pour créer la raquette et stocker l'état des touches "gauche" et "droite"
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed =  false

//variables pour créer les briques
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 84
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 10
let brickOffsetLeft = 10

let tabBricks = [] //stockage des briques dans un tableau à 2 dimensions avec
                   //les colonnes qui contiennent les lignes qui elle même contiennent un objet avec une position x et y
for(let c = 0; c < brickColumnCount; c++) {
    tabBricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
        tabBricks[c][r] = { x: 0 , y: 0, status: 1} //propriété status pour gérer la disparition des briques
    }
}
