CLAZZ("cmp.Mouse", {
    INJECT:["entity", "mouseover", "mouseout", "click"],
    mouseover:null,
    mouseout:null,
    click:null,
    enabled:true,
    
    create:function(){
        this.entity.sprite.inputEnabled = true;

        var map = {
            click:"onInputUp",
            mouseover:"onInputOver",
            mouseout:"onInputOut",
            mousedown:"onInputDown",
            mouseup:"onInputUp"
        }

        for( var k in map ){
            if( !this[k] ) continue;
            this.entity.sprite.events[map[k]].add( cb.bind(this, k) );
        }

        function cb(k){
            if( this.enabled )
                this.entity.apply( this[k] )
        }
    }
});