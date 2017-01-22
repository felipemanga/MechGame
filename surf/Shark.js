CLAZZ("surf.Shark",{
    INJECT:["entity", "gameState", "game"],
    poll:null,
    create:function(){
        this.poll = {y:0, delta:0};
        this.entity.position.x = Math.random() * this.game.width;
        this.entity.position.y = - 100;
        
        var sprite = this.entity.sprite;
        sprite.tint = 0x7998a3;
        var swim = Phaser.Animation.generateFrameNames('', 1, 8, '.png', 0);
        var attack = Phaser.Animation.generateFrameNames('Shark Bite ', 1, 9, '.png', 0);

        sprite.animations.add('swim', swim, 7, true, false);
        sprite.animations.add('attack', attack, 7, false, false);
        sprite.animations.play('swim');
    },
    attacking:0,
    attack:function(){
        this.attacking = 60;
        var e = this.entity;
        e.sprite.animations.play("attack");
        e.inertia.enabled = false;
        e.flyAI.enabled = false;
    },
    update:function(){
        if(this.attacking){
            this.attacking--;
            if( !this.attacking ){
                var e = this.entity;
                e.sprite.animations.play("swim");
                e.inertia.enabled = true;
                e.flyAI.enabled = true;
            }
            return;
        }
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