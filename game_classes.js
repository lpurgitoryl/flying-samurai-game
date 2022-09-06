// uses global canvas context of c in game_setup.js
class Sprite{
    constructor({position, imageSrc, scale = 1, frames = 1,}){
        this.position = position; // x and y properties
        // gen ratios
        this.width = 50;
        this.height = 150;

        //image setup
        this.image = new Image();
        this.image.src = imageSrc; // string aka file path
        this.scale = scale;

        // animation frames
        this.frames = frames;
        this.currFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;

    }
    
    draw(){ 
        c.drawImage(this.image, 
           this.currFrame * (this.image.width / this.frames), 0, this.image.width / this.frames, this.image.height,

            this.position.x, this.position.y, 
            (this.image.width / this.frames) * this.scale , this.image.height * this.scale);
    }

    update(){
        this.draw();

        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.currFrame < this.frames - 1){
                this.currFrame++;
            } else {
                this.currFrame = 0;
            }
        }
        // frame handler for croping and moving image up to next frame
        
    }
}

class Player extends Sprite {
    constructor({position, velocity}){
        super({position});
        this.velocity = velocity;
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

// slider functionality
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  document.getElementById("player1-bar").style.width = slider.value + '%';
  document.getElementById("player1-hit").style.width = (100 - slider.value) + '%';

//   document.getElementById("player2-bar").style.width = slider.value + '%';
//   document.getElementById("player2-hit").style.width = (100-slider.value) + '%';
}