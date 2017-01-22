CLAZZ("surf.Surfer", {
    INJECT:["entity", "gameState", "game"],
    ocean:null,
    vx:0,
    poll:{y:0, delta:0},
    CONSTRUCTOR:function(){
        this.ocean = this.gameState.entities.ocean;
        this.entity.anchor.setTo(0.3,0.8);
    },
    create:function(){
        this.entity.position.x = this.game.width * 0.5;
    },
    update:function(){
        this.ocean.onUpdate();
        this.entity.position.x += (this.vx *= 0.98);
        this.ocean.getY(this.entity.position.x, this.poll);
        this.entity.position.y = this.poll.y;
        this.vx += this.poll.delta * 0.1;
    }
})