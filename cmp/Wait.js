CLAZZ("cmp.Wait", {
    INJECT:["entity", "gameState"],
    wait:function(o, time){
        console.log("Waiting");
        return setTimeout( cb.bind(this), time);

        function cb(){
            console.log("done waiting");
            if( this.gameState.isActive() )
                this.entity.apply(o);
        }
    }
});