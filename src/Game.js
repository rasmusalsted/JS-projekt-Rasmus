import * as PIXI from 'pixi.js'
import { Sprite } from 'pixi.js';
import Stage from './Stage';
import gsap from 'gsap';
import { Howler } from 'howler';
import shrooms from './mushrooms';
import Items from './items';
import { filters } from 'pixi.js';
import trip from './trip';


class Game {

    constructor() {

        // PIXI
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);

        this.bg = PIXI.Sprite.from('../assets/images/247154.jpg');

        this.bg.width = this.app.screen.width;
        this.bg.height = this.app.screen.height;

        this.bg.x = 0
        this.bg.y = 0

        this.app.stage.addChild(this.bg);

        this.myShrooms = new shrooms(this.app);
        this.myItems = new Items(this.app);
        //this.tonyTrip = new trip(this.app);




        this.fartArray = [

            'fart',
            'fart2',
            'fart3',
            'fart4',
            'fart5',
            'fart6',
            'fart7'
        ]


        let assets = [

            '../assets/spritesheet/tony-sprite.json'
        ];


        const loader = PIXI.Loader.shared

            .add(assets)

            .load((loader, res) => {





                // Play
                this.play = PIXI.Sprite.from("../assets/images/original.png");
                this.app.stage.addChild(this.play);

                this.play.scale.set(.5);
                this.play.anchor.set(0.5);
                this.play.x = 400;
                this.play.y = 300;
                this.play.zIndex = 5;
                this.play.interactive = true;
                this.play.buttonMode = true;


                this.play.on("pointerdown", () => {

                    gsap.to(this.play, {
                        duration: 3,
                        x: 1500,
                        ease: "Elastic.easeInOut"
                    })

                })





                // Tony
                let sheet = PIXI.Loader.shared.resources["../assets/spritesheet/tony-sprite.json"].spritesheet;
                this.tony = new PIXI.AnimatedSprite(sheet.animations["tony"]);

                this.tony.anchor.set(0.5);
                this.tony.scale.set(1);
                this.tony.x = 600;
                this.tony.y = 400;

                this.tonyReady = false;

                this.tony.interactive = true;
                this.tony.buttonMode = true;
                this.tony.zIndex = 2;
                this.tony.animationSpeed = .3;
                this.tony.play();
                this.app.stage.addChild(this.tony);




                // GSAP Tony float
                gsap.to(this.tony, {

                    duration: 3,
                    y: 450,
                    x: 620,
                    yoyoEase: "back",
                    repeat: -1,
                })



                // GSAP Tony Swim click
                this.tony.on("pointerdown", (event) => {

                    if (!this.tonyReady) {
                        this.tonyReady = true;


                        gsap.timeline()

                            .to(this.tony, {
                                duration: 5,
                                rotation: 8,
                                ease: "Elastic.easeInOut",
                            })

                            .to(this.tony, {
                                duration: 3,
                                y: -500,
                            })

                            .from(this.tony, {
                                duration: 3,
                                x: 1500,
                                rotation: 0,
                            })

                            .to(this.tony, {
                                duration: 2,
                                x: 600,
                                y: 400,

                            })

                    }

                    let getFromFartArray = this.fartArray[Math.floor(Math.random() * this.fartArray.length)]

                    this.fart = new Howl({
                        src: ["../assets/sound/" + getFromFartArray + ".mp3"],
                        volume: .9

                    })

                    this.fart.play();


                });// END eventListner

            }) //END load

    } //END con
} //END class

export default Game;

