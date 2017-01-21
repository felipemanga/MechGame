CLAZZ("cmp.ImgDiff", {
    INJECT:["entity"],
    rect:null,
    prev:null,
    diff:null,
    create:function(){
        setInterval(this.log.bind(this), 10000);
    },
    log:function(){
        var diff=this.diff, i=0, l=diff.length;
        console.log(diff);
    },
    update:function(){
        var rect = this.rect || new Phaser.Rectangle();
        var bmp = this.entity.webcam.bitmap;
        rect.setTo(0,0,bmp.width, bmp.height);
        var img = bmp.getPixels(rect);
        
        if( !this.prev ){
            this.prev = img;
            return;
        }
        
        var s = 4;
        if( !this.diff ) this.diff = new Float32Array(Math.floor(img.width/s));
        var diff = this.diff;
        diff.fill(0);

        var fd = img.data, pd=this.prev.data;

        var yw=0;
        for( var y=0; y<img.height; y+=s, yw+=img.width*s ){
            for( var x=0; x<img.width; x+=s){
                diff[Math.floor(x/s)] += Math.abs(fd[(yw+x)*4] - pd[(yw+x)*4]);
            }
        }
        this.prev = img;
    }
});