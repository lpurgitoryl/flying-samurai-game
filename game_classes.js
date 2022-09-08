// uses global canvas context of c in game_setup.js
class Sprite{
    constructor({position, imageSrc, scale = 1, frames = 1, imageOffSet = { x: 0, y: 0}}){
        this.position = position; // x and y properties
        // gen ratios


        //image setup
        this.image = new Image();
        this.image.src = imageSrc; // string aka file path
        this.scale = scale;

        // animation frames
        this.frames = frames;
        this.currFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.imageOffSet = imageOffSet;

    }
    
    draw(){ 
        c.drawImage(this.image, 
           this.currFrame * (this.image.width / this.frames), 0, this.image.width / this.frames, this.image.height,

            this.position.x - this.imageOffSet.x , this.position.y - this.imageOffSet.y, 
            (this.image.width / this.frames) * this.scale , this.image.height * this.scale);

        // c.image.style.border = '10px solid blue';
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
    constructor({position, velocity , imageSrc, scale = 1, frames = 1, imageOffSet = { x: 0, y: 0}, color , sprites}){
        super({position, imageSrc, scale, frames, imageOffSet });
        // rectangle collison vars
        this.width = 50;
        this.height = 150;

        //
        this.velocity = velocity;
        this.last_key; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

        this.currFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;

        // attack box
        this.color = color;
        this.attackBox = {
            position: {x: this.position.x , y: this.position.y},
            width: 150,
            height: 50,
        }
        this.isAttacking = false;

        this.sprites = sprites;

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src =  sprites[sprite].imageSrc;
        }
       

    }

    // this is for rectangle collision
    draw(){ // draw out sprite
        
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);


    }

    update(){
        super.draw()
        // attack box
        this.attackBox.position.x = this.position.x ;
        this.attackBox.position.y =  this.position.y + (50); // additon  moves down

        if(this.isAttacking){


        if(this.last_key === 'a'  || this.last_key === 'ArrowLeft'  ){
            this.attackBox.position.x =  this.position.x - this.attackBox.width + this.width; // subtraction moves left
            console.log("FLIPPING");
        }

        console.log( 'last key! =>' + this.last_key);

        c.fillStyle = this.color;
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
        //
        
        super.update();


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity function
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 90){
            this.velocity.y =0;
            this.position.y = 336;
        }   else {
            this.velocity.y += gravity;
        }
        // console.log(this.position.y);
    }   

    attack(){
        this.switchSprites('attack1');
        this.isAttacking = true;
        setTimeout(() => {this.isAttacking = false;}, 100 )

    }
    
    switchSprites(sprite){

    if (this.image === this.sprites.attack1.image &&
        this.currFrame < this.sprites.attack1.frames - 1
        ) return
        switch (sprite) {
            case 'idle':
              if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.frames = this.sprites.idle.frames
                this.currFrame = 0
              }
            break
            case 'run_left':
              if (this.image !== this.sprites.run_left.image) {
                this.image = this.sprites.run_left.image
                this.frames = this.sprites.run_left.frames
                this.currFrame = 0
              }
            break
            case 'run_right':
                if (this.image !== this.sprites.run_right.image) {
                  this.image = this.sprites.run_right.image
                  this.frames = this.sprites.run_right.frames
                  this.currFrame = 0
                } 
            break
            case 'jump':
              if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.frames = this.sprites.jump.frames
                this.currFrame = 0
              } 
            break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.frames = this.sprites.fall.frames
                    this.currFrame = 0
                  } 
            break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.frames = this.sprites.attack1.frames
                    this.currFrame = 0
                  } 
            break
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