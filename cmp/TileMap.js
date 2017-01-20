CLAZZ("cmp.TileMap", {
    INJECT:["gameState", "game", "asset"],
    map:null,

    CONSTRUCTOR:function(){
        var json = this.game.cache.getTilemapData(this.asset);
        var mat = new PIXI.Matrix(), edef = this.gameState.entityDefinitions;

        for( var layerId=0; layerId<json.data.layers.length; ++layerId ){
            var layer = json.data.layers[layerId];
            if( layer.type == "objectgroup" )
                addObjectGroup.call(this, layer);
        }

        function addObjectGroup(layer){
            for( var objectId=0; objectId<layer.objects.length; ++objectId ){
                var obj = layer.objects[objectId], DO;
                var rotation = obj.rotation * (1 / 180) * Math.PI;
                if( obj.type in edef ){
                    var entity = this.gameState.addEntity( obj.name, {
                        asset:resolveGID(obj.gid)
                    });
                    DO = DO.sprite;
                }else{
                    DO = this.game.add.sprite(0,0,resolveGID(obj.gid));
                }
                DO.rotation = rotation;
                mat.identity().translate( DO.width * DO.anchor.x, DO.height * DO.anchor.y - DO.height).rotate(rotation || 0).translate( obj.x || 0, obj.y || 0 );
                DO.position.x = mat.tx;
                DO.position.y = mat.ty;
            }
        }

        function resolveGID(gid){
            var sets = json.data.tilesets;
            for( var i=0, l=sets.length; i<l; ++i ){
                var tileset = sets[i];
                if( tileset.firstgid + tileset.tilecount < gid )
                    continue;
                return tileset.tiles[ gid - tileset.firstgid ].image;
            }
        }
    }
});
