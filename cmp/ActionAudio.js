CLAZZ("cmp.ActionAudio", {
    INJECT:["entity", "gameState", "game", "asset"],
    EXTENDS:Phaser.Sound,

    leftGain:null,
    rightGain:null,

    CONSTRUCTOR:function(){
        SUPER(this.game, this.asset, 1, true);

        this.entity.actionLevel = 1;

        var ac = this.context;
        
        var splitter = ac.createChannelSplitter(2);
        this.externalNode = splitter;

        var gainNode;
        
        gainNode = this.leftGain = ac.createGain();
        splitter.connect(gainNode, 0);
        gainNode.connect( this.gainNode);

        gainNode = this.rightGain = ac.createGain();
        splitter.connect(gainNode, 1);
        gainNode.connect( this.gainNode);
    },

    create:function(){
        this.play();
    },

    // i:0,
    update:function(){
        // this.i += 0.01;
        var actionLevel = Math.sin(this.i)*0.5 + 0.5; // this.entity.actionLevel;
        actionLevel = Math.min(1, Math.max(actionLevel, 0));
        this.leftGain.gain.value = actionLevel;
        this.rightGain.gain.value = 1-actionLevel;
    }
});