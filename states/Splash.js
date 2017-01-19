need("states.State", function(){
    
    CLAZZ("states.Splash", {
        EXTENDS:states.State,
        INJECT:{"resources":RESOLVE("resources.splash")},
        boot:function(){ this.activate(); },
        create:function(){
            this.addEntity("Logo");
        }
    });

})