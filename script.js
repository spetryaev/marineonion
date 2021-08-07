var elements = ["lname", "fname", "dob", "loc1", "date1", "date2", "num1", "num2", "loc2"];

// Wrap each letter into a span
let textWrapper;
for (i = 0; i < elements.length; i++) {
    textWrapper = document.getElementById(elements[i]);
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
}

// Animate letters
var animation = anime.timeline({loop: false})
// for (i = 0; i < elements.length; i++) {
//     animation.add({
//         targets: `#${elements[i]} .letter`,
//         opacity: [0,1],
//         easing: "easeOutExpo",
//         duration: 50,
//         offset: '-=77',
//         delay: (el, i) => 140 * (i+1)
//     })
// }

//Add animation to elements
animation.add({
        targets: '#portrait',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 450,
    })
    .add({
        targets: '.main',
        top: ['50%', '22%']
    })
    .add({
        targets: '.diana-id',
        opacity: [0, 1]
    })
    .add({
        targets: '.di',
        top: ['-65%', '-6%'],
        easing: "easeOutExpo",
    })

// Ignite
setTimeout(initFireworks, 1000);

// -----------------------
/* Fireworks */
window.addEventListener("resize", resizeCanvas, false);

window.requestAnimationFrame = 
    window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };

var canvas, ctx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint;


function initFireworks() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    
    window.requestAnimationFrame(updateWorld);
} 

function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
} 

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
} 

function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i=0; i<particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
} 

function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    //ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i=0; i<particles.length; i++) {
        particles[i].draw(ctx);
    }
} 

function createFirework() {
    xPoint = Math.random()*(w-200)+100;
    yPoint = Math.random()*(h-200)+100;
    var nFire = Math.random()*50+100;
    var c = "rgb("+(~~(Math.random()*200+55))+","
            +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
    for (var i=0; i<nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(25-particle.vx*particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy>0 ? vy: -vy;
        }
        particles.push(particle);
    }
} 

function Particle() {
    this.w = this.h = Math.random()*4+1;
    
    this.x = xPoint-this.w/2;
    this.y = yPoint-this.h/2;
    
    this.vx = (Math.random()-0.5)*10;
    this.vy = (Math.random()-0.5)*10;
    
    this.alpha = Math.random()*.5+.5;
    
    this.color;
} 

Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
            this.y >= screen.height ||
            this.alpha <= 0) {
                return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();
        
        c.translate(this.x+this.w/2, this.y+this.h/2);
        c.arc(0, 0, this.w, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        
        c.closePath();
        c.fill();
        c.restore();
    }
} 