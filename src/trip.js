import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { Howler } from 'howler';

class trip {

    constructor(app) {


        this.app = app;

        
        document.body.appendChild(this.app.view);



        // create a new background sprite
        const background = PIXI.Sprite.from('../assets/images/endbg.png');
        background.width = this.app.screen.width;
        background.height = this.app.screen.height;
        this.app.stage.addChild(background);

        // create an array to store a reference to the dudes
        const dudeArray = [];

        const totaldudes = 10;

        for (let i = 0; i < totaldudes; i++) {
            // create a new Sprite that uses the image name that we just generated as its source
            const dude = PIXI.Sprite.from('../assets/images/tonyhigh.png');

            dude.anchor.set(0.5);

            // set a random scale for the dude
            dude.scale.set(0.8 + Math.random() * 0.3);

            // finally let's set the dude to be at a random position...
            dude.x = Math.floor(Math.random() * this.app.screen.width);
            dude.y = Math.floor(Math.random() * this.app.screen.height);

            // The important bit of this example, this is how you change the default blend mode of the sprite
            dude.blendMode = PIXI.BLEND_MODES.ADD;

            // create some extra properties that will control movement
            dude.direction = Math.random() * Math.PI * 2;

            // this number will be used to modify the direction of the dude over time
            dude.turningSpeed = Math.random() - 0.8;

            // create a random speed for the dude between 0 - 2
            dude.speed = 2 + Math.random() * 2;

            // finally we push the dude into the dudeArray so it it can be easily accessed later
            dudeArray.push(dude);

            this.app.stage.addChild(dude);
        }

        // create a bounding box for the little dudes
        const dudeBoundsPadding = 100;

        const dudeBounds = new PIXI.Rectangle(
            -dudeBoundsPadding,
            -dudeBoundsPadding,
            this.app.screen.width + dudeBoundsPadding * 2,
            this.app.screen.height + dudeBoundsPadding * 2,
        );

        this.app.ticker.add(() => {
            // iterate through the dudes and update the positions
            for (let i = 0; i < dudeArray.length; i++) {
                const dude = dudeArray[i];
                dude.direction += dude.turningSpeed * 0.01;
                dude.x += Math.sin(dude.direction) * dude.speed;
                dude.y += Math.cos(dude.direction) * dude.speed;
                dude.rotation = -dude.direction - Math.PI / 2;

                // wrap the dudes by testing their bounds...
                if (dude.x < dudeBounds.x) {
                    dude.x += dudeBounds.width;
                } else if (dude.x > dudeBounds.x + dudeBounds.width) {
                    dude.x -= dudeBounds.width;
                }

                if (dude.y < dudeBounds.y) {
                    dude.y += dudeBounds.height;
                } else if (dude.y > dudeBounds.y + dudeBounds.height) {
                    dude.y -= dudeBounds.height;
                }
            }
        });

    }//END con
}//END class

export default trip