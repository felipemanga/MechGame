CLAZZ("surf.Surfer", {
    INJECT:["entity", "gameState"],
    ocean:null,
    poll:{y:0, delta:0},
    CONSTRUCTOR:function(){
        this.ocean = this.gameState.entities.ocean;
        this.entity.anchor.setTo(0.3,0.8);
    },
    update:function(){
        this.ocean.onUpdate();
        this.ocean.getY(this.entity.position.x, this.poll);

    }
})