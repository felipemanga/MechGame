need("states.State", function(){
    
    
    CLAZZ("states.Splash", {
        EXTENDS:states.State,
        boot:function(){ this.activate(); },

        init:function(){
            console.log(678)
        },
        
        preload:function(){
            console.log(238746)
        }
    });

})