CLAZZ("surf.Shark",{
    INJECT:["entity", "gameState", "game"],
    poll:null,
    create:function(){
        this.poll = {y:0, delta:0};
        this.entity.position.x = Math.random() * this.game.width;
        this.entity.position.y = - 100;
        
        var sprite = this.entity.sprite;
        sprite.tint = 0;
        var swim = Phaser.Animation.generateFrameNames('', 1, 8, '.png', 0);

        sprite.animations.add('swim', swim, 7, true, false);
        sprite.animations.play('swim');
    },
    update:function(){
        var pos = this.entity.position, 
            poll = this.poll, 
            inertia = this.entity.inertia, 
            flyAI = this.entity.flyAI;
        
        this.gameState.entities.ocean.getY( pos.x, poll );

        if( poll.y>pos.y ){
            inertia.gravity = 5;
            inertia.friction = 0.985;
            flyAI.enabled = false;
        }else{
            inertia.gravity = 0;
            inertia.friction = 0.85;
            flyAI.enabled = true;
            if( flyAI.targetY < poll.y )
                flyAI.targetY = poll.y;
        }

        pos.x += this.vx || 0;
        pos.y += this.vy || 0;
    }
});