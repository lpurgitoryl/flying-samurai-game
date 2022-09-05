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
        this.position.x += this.velocity.x;
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

// arrow function basis for function statement (action) vs function expession (produces value) 
// https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// When passing parameter values, use an "anonymous function" that calls the specified function with the parameters:
// element.addEventListener("click", function(){ myFunction(p1, p2); });
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            player1.velocity.x +=1;
        break;
        case 'a':
            player1.velocity.x -=1;
        break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            player1.velocity.x =0;
        break;
        case 'a':
            player1.velocity.x =0;
        break;
    }
});