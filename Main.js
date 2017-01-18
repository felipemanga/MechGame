"use strict";

CLAZZ("Main", {
    INJECT:["GameState"],
    DOM:null,
    game:null,

    CONSTRUCTOR:function(){
        this.DOM = DOC.index(document.body, null, this);
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, this.DOM.container);

        for(var i=0, l=this.GameState.length; i<l; ++i ){
            var C=this.GameState[i];
            if(C == states.State) continue;
            this.game.states.add(C.NAME, CLAZZ.get(C.fullName, {game:this.game}));
        }
        this.game.state.start("Initial");
    },

    setState:function(name){
        this.game.state.add(name, CLAZZ.get("states." + name, {game:this.game}), true);
    }
});