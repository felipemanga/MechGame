"use strict";

CLAZZ("Main", {
    INJECT:{states:"state.GameState"},
    DOM:null,
    game:null,
    pool:null,

    CONSTRUCTOR:function(){
        this.pool = new DOC.Pool();
        this.DOM = DOC.index(document.body, null, this);
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, this.DOM.container);

        for(var i=0, l=this.states.length; i<l; ++i ){
            var C=this.states[i];
            console.log("creating state ", C);
            this.pool.add( CLAZZ.get(C.fullName, { game:this.game, pool:this.pool.call.bind(this.pool) }) );
        }
        
        this.pool.call("boot");
    }
});