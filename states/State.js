CLAZZ("states.State", {
    INJECT:["pool", "resources"],
    EXTENDS:Phaser.State,
    
    entities:null,
    entityDefinitions:null,

    CONSTRUCTOR:function(){
        SUPER();
        this.pool.add(this);

        if( !this.entities )
            this.entities = {};

        if( !this.entityDefinitions )
            this.entityDefinitions = {};
    },

    init:function(){
        this.game.stage.disableVisibilityChange = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minWidth = this.gameWidth / 10;
        this.game.scale.minHeight = this.gameHeight / 10;
        this.game.scale.maxWidth = this.gameWidth;
        this.game.scale.maxHeight = this.gameHeight;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.windowConstraints.bottom = "visual";
        this.game.scale.refresh();
    },

    shutdown:function(){
        this.pool.call("destroy");
        this.pool.remove(this);
    },

    preload:function(){
        if( !this.resources ) return;
        for( var method in this.resources ){
            var rec = this.resources[method];
            if( this.load[method] ){
                for( var i=0; i<rec.length; ++i )
                    this.load[method].apply( this.load, rec[i] );
            }else if( method == "class" ){
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

    create:function(){
        var dlist = this.resources.entity;
        if( dlist instanceof Array ){
            console.log("creating entities");
            for( var i=0, l=dlist.length; i<l; ++i )
                this.addEntity.apply(this, dlist[i]);
        }
    },

    addEntity:function(name, inject){
        var e = CLAZZ.get("Entity", DOC.mergeTo({
            gameState:this, 
            game:this.game,
            pool:this.pool,
            call:this.pool.call.bind(this.pool),
            descriptor:DOC.mergeTo({}, this.entityDefinitions[name], inject)
        }));
        return e;
    },

    isActive:function(){
        return this.game.state.states[this.game.state.current] == this;
    }
})
