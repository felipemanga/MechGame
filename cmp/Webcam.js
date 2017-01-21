CLAZZ("cmp.Webcam", {
    INJECT:["game"],
    webcam:null,
    bitmap:null,
    create:function(){
        var w=320, h=240;
        // var w=800, h=600;
        this.webcam = this.game.plugins.add(Phaser.Plugin.Webcam);
        this.bitmap = this.game.add.bitmapData(w,h);
        this.game.add.sprite(0,0,this.bitmap); // var sprite = this.bitmap.addToWorld();
        this.webcam.start({video:{width:w, height:h, facingMode:"user"}},this.bitmap.context);
    }
});