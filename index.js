//  JS refresher semi colons only go after statements not fucntions
// consts
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
const gravity = 0.2;
const horizontal_vel = 7;
const vertical_vel = 3;


const action_keys = {
    a: { pressed: false},
    d: { pressed: false},
    w: { pressed : false},
    ArrowRight: { pressed : false},
    ArrowLeft: { pressed : false},
    ArrowUp: { pressed : false}
};
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;

        this.last_key;// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
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


// arrow function basis for function statement (action) vs function expession (produces value) 
// https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// When passing parameter values, use an "anonymous function" that calls the specified function with the parameters:
// element.addEventListener("click", function(){ myFunction(p1, p2); });
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
           action_keys.d.pressed = true;
           player1.last_key ='d';
        break;
        case 'a':
            action_keys.a.pressed = true;
            player1.last_key = 'a';
        break;
        case 'w': 
           // action_keys.w.pressed = true;
            //player1_last_key = 'w';
            player1.velocity.y = -vertical_vel; // negative to go up
        break;

        //
        case 'ArrowRight':
            action_keys.ArrowRight.pressed = true;
            player2.last_key = 'ArrowRight';
        break;
        case 'ArrowLeft':
            action_keys.ArrowLeft.pressed = true;
            player2.last_key = 'ArrowLeft';
        break;
        case 'ArrowUp':
            player2.velocity.y = -vertical_vel;
        break;

            
    }
    console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            action_keys.d.pressed = false;
        break;
        case 'a':
            action_keys.a.pressed = false;
        break;

        //
        case 'ArrowRight':
            action_keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            action_keys.ArrowLeft.pressed = false;
        break;

    }
});

// intial sprite set up ^^
function animate(){
    c.fillStyle= 'black'
    window.requestAnimationFrame(animate);
    c.fillRect(0,0, canvas.width, canvas.height);
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    // player 1 movement
    if(action_keys.a.pressed && player1.last_key == 'a'){
        player1.velocity.x =-horizontal_vel;
    } else if (action_keys.d.pressed &&  player1.last_key == 'd'){
        player1.velocity.x = horizontal_vel;
    }
    //
    if(action_keys.ArrowLeft.pressed && player2.last_key == 'ArrowLeft'){
        player2.velocity.x =-horizontal_vel;
    }else if(action_keys.ArrowRight.pressed && player2.last_key == 'ArrowRight'){
        player2.velocity.x =horizontal_vel;
    }

}

animate();