class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;

        this.last_key;// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
    }


}

class Player extends Sprite {
    constructor({position, velocity}){
        super({position, velocity})
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

//
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  document.getElementById("player1-bar").style.width = slider.value + '%';
  document.getElementById("player1-hit").style.width = (100-slider.value) + '%';

//   document.getElementById("player2-bar").style.width = slider.value + '%';
//   document.getElementById("player2-hit").style.width = (100-slider.value) + '%';
}