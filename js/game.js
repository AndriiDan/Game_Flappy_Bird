// об'єкт з html
var canvas = document.getElementById("canvas");

// вказую 2d - вид гри
var context = canvas.getContext("2d");

// створення зображень
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// завантаження зображень
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// відстань по висоті між трубами
var gap = 90; // 90px

// при натисканні на будь-яку клавішу, буде викликатися ф-ція moveUp, яка підіймає пташку по осі у на 20 вверх
document.addEventListener("keydown", moveUp);

// підіймає пташку по осі у на 20 вверх
function moveUp() {
    yPos -= 20;
}

// позиція пташки
var xPos = 10;
var yPos = 200;
var grav = 1; // позиція пташки по осі у буде змінюватися на 1

// малюю зображення в canvas
function draw() {
    // в canvas зображення bg(background) з координатами х:0, у:0
    context.drawImage(bg, 0, 0);

    context.drawImage(pipeUp, 100, 0); // труба зверху
    context.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap); // розміщення відносно висоти pipeUp і змінної "gap" (відступ між блоками)

    context.drawImage(fg, 0, canvas.height - fg.height); // по "у": опустити fg(forground) вниз

    context.drawImage(bird, xPos, yPos);

    yPos += grav;
    // постійний виклик ф-ції (метода)
    requestAnimationFrame(draw);
}

// Необхідно викликати ф-цію draw() тільки після завантаження всіх картинок. Тому, коли завантахеться остання картинка (в моєму випадку pipeBottom) - викликаю ф-цію draw()
pipeBottom.onload = draw;
