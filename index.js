const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
const gravity = 0.2;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw(){ // draw out sprite
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        this.draw();
        this.position.y += 10
    }
}

const player1 = new Sprite(
    {position: {x:0 , y:0}, velocity:{x:0 , y:0}} 
);

const player2 = new Sprite(
    { position: {x:800 , y:0}, velocity:{x:0 , y:0}}
);




// intial sprite set up ^^
function animate(){
    window.requestAnimationFrame(animate);
    player1.update();
    player2.update();
};

animate();