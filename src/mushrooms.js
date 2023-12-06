import * as PIXI from 'pixi.js'
import { Howler } from 'howler'
import gsap from 'gsap'


class shrooms{

constructor(app) {

    this.app = app;

    let myShroomsArray = [

        "../assets/images/shroom1.png",
        "../assets/images/shroom2.png",
        "../assets/images/shroom3.png"

    ];

    let posX = [
    
        100,150,200

    ]

    let posY = [

        500,500,470
    ]

 

    for (let i = 0; i < 3; i++) {

        let shroom = PIXI.Texture.from(myShroomsArray[i]);
        let _shroom = new PIXI.Sprite(shroom);
        _shroom.interactive = true;
        _shroom.isReady = true;
        _shroom.data = i;
        _shroom.x = posX[i];
        _shroom.y = posY[i];
        _shroom.scale.set(.4);
        _shroom.zIndex = 2;
        
        this.app.stage.addChild(_shroom);

    } // END shroom loop



} //END con
} //END class

export default shrooms

