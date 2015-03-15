var enemyTrailStart = [310,230,150,70];
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.y = y;
    this.x = x;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
    } else {
        this.x = -150;
        this.speed = 100 + Math.floor(Math.random()*200);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x =  200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
};

var resetPlayer = function() {
    player.x = 200;
    player.y = 390;
};

Player.prototype.update = function() {
    for (i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].y === this.y && allEnemies[i].x < this.x + 45 && allEnemies[i].x + 45 > this.x) {
            resetPlayer();
        };
    };
};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.x = this.x - 101;
            if (this.x <= -2) {
                this.x = -2;
            };
            break;
        case 'up':
            this.y = this.y - 80;
            if (this.y < -10){
                this.y = -10;
            };
            break;
        case 'right':
            this.x = this.x + 101;
            if (this.x >= 402) {
                this.x = 407;
            };
           break;
        case 'down':
            this.y = this.y + 80;
            if (this.y >= 390) {
                this.y = 390;
            };
        default:
            break;
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player;
var allEnemies = [];

var createEnemies = function() {
    for (i = 0; i < enemyTrailStart.length; i++) {
            allEnemies.push(new Enemy(Math.floor(Math.random()*300),enemyTrailStart[i],100));
    };

};
createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
