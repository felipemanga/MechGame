CLAZZ("states.State", {
    INJECT:["game", "pool"],
    EXTENDS:Phaser.State,
    
    resources:null,
    entities:null,
    entityDefinitions:null,

    CONSTRUCTOR:function(){
        // silly Phaser.State sets game to null
        var game = this.game;
        SUPER();
        this.game = game;
        game.state.add( this.constructor.fullName, this );

        if( !this.entities )
            this.entities = {};

        if( !this.entityDefinitions )
            this.entityDefinitions = {};
    },

    preload:function(){
        console.log("Preloading " + this);
        if( !this.resources ) return;
        for( var method in this.resources ){
            var rec = this.resources[method];
            if( this.load[method] ){
                for( var i=0; i<rec.length; ++i )
                    this.load[method].apply( this.load, rec[i] );
            }else if( method == "entity" ){
                for( var k in rec ){
                    var def = this.entityDefinitions[k] = rec[k];
                    if( def.components ){
                        for( var j in def.components ){
                            if( !DOC.resolve(j) )
                                this.load.script( j, j.replace(/\./g, "/") + ".js" )
                        }
                    }
                }
            }
        }
    },

    addEntity:function(name, inject){
        return CLAZZ.get("Entity", DOC.mergeTo({
            gameState:this, 
            descriptor:this.entityDefinitions[name]
        }, inject));
    },

    activate:function(){
        this.game.state.start( this.constructor.fullName );
    }
})
