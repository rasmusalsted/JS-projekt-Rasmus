import * as PIXI from 'pixi.js'
import { PixiPlugin } from "gsap/PixiPlugin";
import { Howl, Howler } from 'howler'
import gsap from 'gsap'
import { filters } from 'pixi.js';
import trip from './trip';



class Items {

    constructor(app) {



        // register the plugin
        gsap.registerPlugin(PixiPlugin);

        // give the plugin a reference to the PIXI object
        PixiPlugin.registerPIXI(PIXI);


        this.app = app;

        this.ready = false;

        this.state = {

            speakerReady: false,
            discoReady: false
        }


        //Speaker
        this.speaker = PIXI.Sprite.from("../assets/images/speaker.png");
        this.app.stage.addChild(this.speaker);

        this.speaker.scale.set(0.4);
        this.speaker.anchor.set(0.5);
        this.speaker.x = 110;
        this.speaker.y = 350;
        this.speaker.zIndex = 2;
        this.speaker.interactive = true;
        this.speaker.buttonMode = true;







        //Speaker GSAP
        this.speaker.on('pointerdown', (event) => {

            if (!this.state.speakerReady) {

                this.state.speakerReady = true;

                if(this.state.discoReady && this.state.speakerReady){
                    this.ready = true;
                }

                gsap.to(this.speaker, {

                    duration: .5,
                    delay: 1,
                    x: 111,
                    y: 341,
                    yoyoEase: "back",
                    repeat: -1,

                })

                let music = new Howl({

                    src: ['../assets/sound/bgmusic.mp3'],
                    volume: 0.4

                });

                music.play();

            }
        })




        //disco ball
        this.disco = PIXI.Sprite.from("../assets/images/discoball.png");
        this.app.stage.addChild(this.disco);

        this.disco.anchor.set(0.5);
        this.disco.scale.set(0.5);
        this.disco.x = 400;
        this.disco.y = -70;
        this.disco.zIndex = 2;
        this.disco.interactive = true;
        this.disco.buttonMode = true;

        //disco ball GSAP
        this.disco.on("pointerdown", (event) => {

            if (!this.state.discoReady) {
                this.state.discoReady = true;

                if(this.state.discoReady && this.state.speakerReady){
                    this.ready = true;
                }
                
                gsap.to(this.disco, {
                    duration: 2,
                    delay: 0.2,
                    x: 400,
                    y: 110,
                    ease: "Elastic.easeInOut",

                    onComplete: () => {
                        gsap.to(this.disco, {

                            duration: 100,
                            rotation: 200,
                            repeat: -1
                        })
                        const colorMatrix = new filters.ColorMatrixFilter();
                        this.app.stage.filters = [colorMatrix];
                        colorMatrix.saturate(1);
                    }
                })
            }

        })

        //LSD 
        this.lsd = new PIXI.Sprite.from("../assets/images/lsd.png");
        this.app.stage.addChild(this.lsd);

        this.lsd.scale.set(.8);
        this.lsd.anchor.set(0.5);
        this.lsd.x = 650;
        this.lsd.y = 200;
        this.lsd.buttonMode = true;

        this.lsd.interactive = true;
        this.lsd.dragging = false;
        this.app.stage.addChild(this.lsd);

        //lsd GSAP
        this.lsd.on("pointerdown", (event) => {
            if (this.ready) {
                gsap.to(this.lsd, {
                    duration: 2,
                    delay: 0.2,
                    x: 600,
                    y: 400,
                    ease: "power.easeInOut",

                    onComplete: () => {
                        gsap.to(this.lsd, {
                            delay: 1,
                            onComplete: () => {
                                let tonyTrip = new trip(this.app);
                            }
                        })

                    }
                })

            }

        })



        //poster
        this.poster = PIXI.Sprite.from("assets/images/pink.jpg");
        this.app.stage.addChild(this.poster);

        this.poster.scale.set(.25);
        this.poster.anchor.set(0.5);
        this.poster.x = 650;
        this.poster.y = 150;
        this.poster.interactive = true;
        this.poster.buttonMode = true;

        //Poster drag and drop
        this.poster.on('mousedown', (e) => {
            console.log('Picked up');

            this.poster.x = e.data.global.x;
            this.poster.y = e.data.global.y;
            this.poster.dragging = true;
        });

        this.poster.on('mousemove', (e) => {
            console.log('Dragging');

            if (this.poster.dragging) {
                this.poster.x = e.data.global.x;
                this.poster.y = e.data.global.y;
            }
        });

        this.poster.on('mouseup', (e) => {
            console.log('Moving');

            this.poster.x = e.data.global.x;
            this.poster.y = e.data.global.y;
            this.poster.dragging = false;
        });


    }//END con
}//END class

export default Items;