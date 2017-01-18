CLAZZ("states.State", {
    INJECT:["game", "pool"],
    EXTENDS:Phaser.State,
    
    entities:null,

    CONSTRUCTOR:function(){
        // silly Phaser.State sets game to null
        var game = this.game;
        SUPER();
        this.game = game;
        game.state.add( this.constructor.fullName, this );

        if( !this.entities )
            this.entities = [];
    },

    activate:function(){
        this.game.state.start( this.constructor.fullName );
    }
})
