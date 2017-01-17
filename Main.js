"use strict";

CLAZZ("Main", {
    DOM:null,
    game:null,

    CONSTRUCTOR:function(){
        this.DOM = DOC.index(document.body, null, this);
        this.game = new Phaser.Game(1080, 720, Phaser.AUTO, this.DOM.CANVAS);
    }
});