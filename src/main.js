// Name: Hitesh Ahuja, Game Name: Shark Attack, 04/17/22, Time Taken: 12 hours

/* Points Breakdown
    1. Redesign the game's artwork, UI, and sound to change its 
       theme/aesthetic (to something other than sci-fi) (60)
       (I have redesigned all of the assets in the game, changed the sounds,  and completely changed the theme
        to a beach theme by changing the game's artwork.)
    2. Implement a simultaneous two-player mode (30)
        (Player one is controlled with the keys A & D and fires with W, 
        while Player 2 is controlled with arrows and fires with the up arrow. Both
        players can play at the same time)
    3. Display the time remaining (in seconds) on the screen (10)
       (I have created a timer that counts down from 60 or 45 seconds depending on the game mode.)

    Total Points: 100
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play] 
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
