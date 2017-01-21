CLAZZ("cmp.Webcam", {
    INJECT:["game"],
    webcam:null,
    bitmap:null,
    create:function(){
        this.webcam = this.game.plugins.add(Phaser.Plugin.Webcam);
        this.bitmap = this.game.make.bitmapData(320,240);
        var sprite = this.bitmap.addToWorld();
        this.webcam.start(320,240,this.bitmap.context);
    }
});