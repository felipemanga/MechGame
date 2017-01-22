CLAZZ("surf.Surfer", {
    INJECT:["entity", "gameState", "game", "call"],
    ocean:null,
    vx:0, vy:0,
    poll:{y:0, delta:0},
    animations:null,

    CONSTRUCTOR:function(){
        this.ocean = this.gameState.entities.ocean;
        this.entity.anchor.setTo(0.3,0.8);
    },

    create:function(){
        var die = Phaser.Animation.generateFrameNames('Surfer Dying ', 1, 4, '.png', 0);
        var sit = Phaser.Animation.generateFrameNames('Surfer Sitting ', 1, 3, '.png', 0);
        var stand = Phaser.Animation.generateFrameNames('Surfer Standing ', 1, 2, '.png', 0);
        var surf = Phaser.Animation.generateFrameNames('Surfer Surfing ', 1, 3, '.png', 0);
        var sprite = this.entity.sprite;
        this.animations = sprite.animations;

        this.animations.add('die', die, 7, false, false);
        this.animations.add('sit', sit, 7, true, false);
        this.animations.add('stand', stand, 7, false, false);
        this.animations.add('surf', surf, 7, true, false);

        sprite.animations.play('surf');

        this.entity.position.x = this.game.width * 0.5;
    },

    surferDied:function( ){
        this.isDead = 60;
        this.entity.collision.enabled = false;
        this.animations.play("die");
        this.entity.collision.hit.attack();
    },

    isDead:0,

    update:function(){
        this.ocean.onUpdate();
        if( this.isDead ){
            this.isDead--;
            if( !this.isDead ){
                this.entity.collision.enabled = true;
                this.entity.position.y = -1000;
                this.entity.position.x = Math.random() * this.game.width;
            }
            return;
        }
        var position = this.entity.position;
        position.x += (this.vx *= 0.98);
        this.ocean.getY(position.x, this.poll);
        if( position.y > this.poll.y ){
            position.y = this.poll.y;
            this.vy = 0;
        }else
            position.y += (this.vy++);
        this.vx += this.poll.delta * 0.1;
        if( Math.abs(this.vx) < 2 ) this.animations.play("sit");
        else this.animations.play("surf");
    }
})