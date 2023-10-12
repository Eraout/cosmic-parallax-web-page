let canvas = document.getElementsByClassName('cosmic-rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
    return Math.floor(Math.random() * max) + min;
}

function RainDrops(x, y, endx, velocity, opacity) {

    this.x = x;
    this.y = y;
    this.endx = endx;  // changed to endx for horizontal movement
    this.velocity = velocity;
    this.opacity = opacity;

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x - this.endx, this.y);  // changed y to x for horizontal movement
        c.lineWidth = 1;
        c.strokeStyle= "rgba(255, 255, 255, " + this.opacity + ")";
        c.stroke();
    }

    this.update = function() {
        let rainEnd = window.innerWidth + 100;  // changed to innerWidth for horizontal boundary
        if (this.x >= rainEnd) {
            this.x = this.endx - 100;
        } else {
            this.x = this.x + this.velocity;  // update x position for horizontal movement
        }
        this.draw();
    }

}

let rainArray = [];

for (let i = 0; i < 140; i++) {
    let rainYLocation = Math.floor(Math.random() * window.innerHeight) + 1; // this will be our fixed y position
    let rainXLocation = Math.random() * -500;  // starting x will be off-screen to the left
    let randomRainWidth = randomNum(10, 2);  // changed height to width
    let randomSpeed = randomNum(5, 0.1);  // reduced speed range to slow down the animation
    let randomOpacity = Math.random() * .55;
    rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainWidth, randomSpeed, randomOpacity));
}

function animateRain() {

    requestAnimationFrame(animateRain);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < rainArray.length; i++) {
        rainArray[i].update();
    }

}

animateRain();
