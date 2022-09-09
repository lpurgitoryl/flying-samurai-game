//  JS refresher semi colons only go after statements not fucntions

// TODO: max double jump
// TODO: keep from going past screen
// TODO: random player names
// TODO: Controls Screen Before play start

// Event Listeners for player keypresses

// arrow function basis for function statement (action) vs function expession (produces value) 
// https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// When passing parameter values, use an "anonymous function" that calls the specified function with the parameters:
// element.addEventListener("click", function(){ myFunction(p1, p2); });
window.addEventListener('keydown', (event) => {
    if(!player1.isDead){
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
                player1.velocity.y = -vertical_vel; // negative to go up
            break;
            case ' ':
                player1.attack();
            break;
        }
    }
    
    if(!player2.isDead){
        switch(event.key){
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
            case 'ArrowDown':
                player2.attack();
            break;

            
        }
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
// End Event Listeners

// Recursive Animation Function

function animate(){
    c.fillStyle= 'black'
    window.requestAnimationFrame(animate);
    c.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    shop.update();


    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;



    // player 1 movement
    if(action_keys.a.pressed && player1.last_key === 'a'){
        player1.velocity.x =-horizontal_vel;
        player1.switchSprites('run_left');
        

    } else if (action_keys.d.pressed &&  player1.last_key === 'd'){
        player1.velocity.x = horizontal_vel;
        player1.switchSprites('run_right');
    } else {
        player1.switchSprites('idle');
    }

    // player 1 jumping
    if(player1.velocity.y < 0){
        player1.switchSprites('jump');
    } else if (player1.velocity.y > 0){
        player1.switchSprites('fall');
    }

    // player 2 movement
    if(action_keys.ArrowLeft.pressed && player2.last_key == 'ArrowLeft'){
        player2.velocity.x =-horizontal_vel;
       player2.switchSprites('run_left');
    }else if(action_keys.ArrowRight.pressed && player2.last_key == 'ArrowRight'){
        player2.velocity.x =horizontal_vel;
        player2.switchSprites('run_right');
    }else {
        player2.switchSprites('idle');
    }

    // player 2 jumping
    if(player2.velocity.y < 0){
        player2.switchSprites('jump');
    } else if (player2.velocity.y > 0){
        player2.switchSprites('fall');
    }

    // attack logging and health bar 
    if(player1.isAttacking && attackBoxCollision(player1, player2) && player1.currFrame>=3){
        console.log("player 1 attack landed");
        player2_healthbar -= 20;
        player2_hitbar = 100 - player2_healthbar;

        player2.switchSprites('hit');

        

        document.getElementById("player2-bar").style.width = player2_healthbar + '%';
        document.getElementById("player2-hit").style.width = player2_hitbar + '%';
        document.getElementById("player2-points").innerHTML = player2_healthbar * 10;

        player1.isAttacking = false;

    } else if (player2.isAttacking && attackBoxCollision(player2, player1)  && player2.currFrame>=2){
        console.log("player 2 attack landed");
        player1_healthbar -= 10;
        player1_hitbar = 100 - player1_healthbar;

        player1.switchSprites('hit');

        document.getElementById("player1-bar").style.width = player1_healthbar + '%';
        document.getElementById("player1-hit").style.width = player1_hitbar + '%';
        document.getElementById("player1-points").innerHTML = player1_healthbar * 10;

        player2.isAttacking = false;
    } else if ( player1.isAttacking && !attackBoxCollision(player1, player2) && player1.currFrame>=3){
        player1.isAttacking = false;
    } else if (player2.isAttacking && !attackBoxCollision(player2, player1) && player2.currFrame>=2){
        player2.isAttacking = false;
    }

    gameOver();

}


animate();
decreaseTimer();
// functions


function attackBoxCollision( Player1_attack, Player2_attack){
    var attacked = false;
    if(
        Player1_attack.attackBox.position.x + Player1_attack.attackBox.width >= Player2_attack.position.x 
        && Player1_attack.attackBox.position.x <= Player2_attack.position.x + Player2_attack.width
        && Player1_attack.attackBox.position.y + Player1_attack.attackBox.height >= Player2_attack.position.y 
        && Player1_attack.attackBox.position.y <= Player2_attack.position.y + Player2_attack.height
        ) {
            attacked = true;
        }
        
        return attacked;
}




// slider functionality used for testing health bars
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
//   document.getElementById("player1-bar").style.width = slider.value + '%';
//   document.getElementById("player1-hit").style.width = (100 - slider.value) + '%';

// //   document.getElementById("player2-bar").style.width = slider.value + '%';
// //   document.getElementById("player2-hit").style.width = (100-slider.value) + '%';
// }