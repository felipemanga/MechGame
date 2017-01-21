CLAZZ("surf.Ocean",{
    INJECT:["game", "gameState"],
    EXTENDS:cmp.Sprite,    
    bmd:null,
    asset:null,
    points:null,
    waterLevel:0.5,

    CONSTRUCTOR:function(){
        var bmd = this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
        this.asset = bmd;
        SUPER();
        this.gameState.entities.ocean = this;
        this.entity.sprite = this;
        this.waterLevel *= bmd.height;
    },

    getY:function(){

    },
    
    onUpdate:function(){
        var diff = this.diff;
        if( !diff ) return;

        var i, l, points, bmd=this.bmd, imgdata=bmd.imageData, p;

        if( !this.points ){
            points = this.points = [];
            for( i=0, l=diff.length; i<l; ++i ){
                points[i] = {
                    e:diff[i],
                    v:0
                }
            }
            maxV = 0;
        }else{
            points = this.points;
            for( i=0, l=diff.length; i<l; ++i ){
                p = points[i];
                p.e = (p.e*0.97 + (diff[i] * 0.01 - (p.v*0.05)));
                if( i>0 ) p.e = p.e*0.5 + points[i-1].e*0.5;
                p.v += p.e;
                maxV=Math.max(maxV, p.v);
            }
        }        

        var s = bmd.width / (points.length-1), sx, x, mx, sy, y, my, wl=this.waterLevel, h=bmd.height;
        bmd.cls();
        var ctx=bmd.context;

        ctx.beginPath();
        for( i=0, l=points.length; i<l; ++i ){
            y = wl - points[i].v;
            y = Math.round(Math.min(h, Math.max(y, 0)));
            if( !i ) ctx.moveTo(0, y);
            else ctx.lineTo( Math.floor(i*s), y );
        }

        ctx.lineTo(bmd.width,bmd.height);
        ctx.lineTo(0,bmd.height);

        ctx.lineWidth = 0;
        ctx.fillStyle = "#a3c1cc";
        ctx.fill();

        ctx.closePath();
    },

    diff:null,
    onDiff:function(diff){
        this.diff = diff;        
    }
});