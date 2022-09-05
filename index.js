//  JS refresher semi colons only go after statements not fucntions
// consts
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
        
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y =0;
        }   else {
            this.velocity.y += gravity;
        }
    }
}

const player1 = new Sprite(
    {position: {x:0 , y:0}, velocity:{x:0 , y:0}} 
);

const player2 = new Sprite(
    { position: {x:100 , y:0}, velocity:{x:0 , y:0}}
);




// intial sprite set up ^^
function animate(){
    c.fillStyle= 'black'
    window.requestAnimationFrame(animate);
    c.fillRect(0,0, canvas.width, canvas.height);
    player1.update();
    player2.update();
}

animate();