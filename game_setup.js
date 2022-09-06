// Game Setup

// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0,0, canvas.width, canvas.height);
// player movement settings
const gravity = 0.2; // pull on objects after jumping
const horizontal_vel = 7; // aka speed left/right
const vertical_vel = 3; // jumping 

// Key Flags 
const action_keys = {
    a: { pressed: false},
    d: { pressed: false},
    w: { pressed : false},
    ArrowRight: { pressed : false},
    ArrowLeft: { pressed : false},
    ArrowUp: { pressed : false}
};
// other spites
const background = new Sprite({
    position: {x: 0, y:0},
    imageSrc: "./assets/background.png"
})

const shop = new Sprite({
    position: {
        x: 660,
        y: 128
    },
    imageSrc: "./assets/shop_animated.png",
    scale: 2.75,
    frames: 6
});


//
// intial player spawn location
const player1 = new Player(
    {position: {x:0 , y:0}, velocity:{x:0 , y:0}} 
);

const player2 = new Player(
    { position: {x:100 , y:0}, velocity:{x:0 , y:0}}
);
// End Game Setup