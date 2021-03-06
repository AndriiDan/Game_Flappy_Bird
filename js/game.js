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

// створення змінних для звуків
var fly = new Audio();
var score_audio = new Audio();

// завантаження звуків
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// відстань по висоті між трубами
var gap = 90; // 90px

// при натисканні на будь-яку клавішу, буде викликатися ф-ція moveUp, яка підіймає пташку по осі у на 20 вверх
document.addEventListener("keydown", moveUp);

// підіймає пташку по осі у на 30 вверх
function moveUp() {
    yPos -= 30; // підіймає пташку
    fly.play(); // відтворити звук
}

// створення труб (блоків)
var pipe = [];
pipe[0] = {
    x: canvas.width, // по осі х першй блок буде знаходитися за межами екрану
    y: 0
}

var score = 0; // рахунок

// позиція пташки
var xPos = 10;
var yPos = 200;

var grav = 1.5; // позиція пташки по осі у буде змінюватися на 1

// малюю зображення в canvas
function draw() {
    // в canvas зображення bg(background) з координатами х:0, у:0
    context.drawImage(bg, 0, 0);

    // труби будуть з'являтися в циклі 
    for (var i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y); // труба зверху
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); // розміщення відносно висоти pipeUp і змінної "gap" (відступ між блоками)

        // щоб блоки переміщувалися
        pipe[i].x--;

        // щоб створювалися нові блоки
        if (pipe[i].x == 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // перевірка зіткнення пташки та блока
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= canvas.height - fg.height) {
            location.reload(); // перезапустити гру заново
        }

        // зарахування балів після проходження блоків
        if (pipe[i].x == 5) {
            score++; // рахунок збільшується на 1
            score_audio.play(); // відторити звук рахунку
        }
    }

    context.drawImage(fg, 0, canvas.height - fg.height); // по "у": опустити fg(forground) вниз

    context.drawImage(bird, xPos, yPos);

    // позиція пташки під дією гравітації
    yPos += grav;

    // відобразити результати рахунку
    context.fillStule = "#000"; // колір
    context.font = "24px Verdana"; // шрифт
    context.fillText("Рахунок: " + score, 10, canvas.height - 20); // відобразити результати рахунку змінної score, по осі х 10px, по осі у "canvas.height - 20"

    // постійний виклик ф-ції (метода)
    requestAnimationFrame(draw);
}

// Необхідно викликати ф-цію draw() тільки після завантаження всіх картинок. Тому, коли завантахеться остання картинка (в моєму випадку pipeBottom) - викликаю ф-цію draw()
pipeBottom.onload = draw;
