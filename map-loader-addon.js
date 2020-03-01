ig.module("map-loader").requires("impact.base.game").defines(function() {
    sc.MapLoader = ig.GameAddon.extend({
        rawMap: null,
        loadMap(map) {
            this.rawMap = map;
        },
        setTitleGui(titleGui) {
            this.titleGui = titleGui;
        },
    
        startGame() {
            const titleGui = this.titleGui;

            if (titleGui.startGui.isVisible()) {
                titleGui.startGui.hide();
                ig.interact.removeEntry(titleGui.screenInteract)
            }
            const buttons = titleGui.buttons;
            const isNewGamePlus = buttons._newGamePlus;
            buttons._newGamePlus = false;
            buttons.buttons[3].onButtonPress();
            buttons._newGamePlus = isNewGamePlus;
            ig.game._startMode = 60;
        },

        onPreUpdate() {
            if (ig.ready) {
                if (sc.model.isRunning() || sc.model.isGame()) {
                    if (this.rawMap) {
                        const map = this.rawMap;
                        const introGui = this.titleGui.introGui;
                        const bgGui = this.titleGui.bgGui;
                        
                        if (introGui.timer > -1) {
                            introGui.onInteraction();
                        } else if (!bgGui.isLabelReached("IDLE")) {
                            bgGui.skip();
                        } else if (sc.model.isTitle()) {
                            this.startGame();
                        }  else {
                            this.rawMap = null;
                            window.setAjaxOverride("data/maps/" + map.name + '.json', map);
                            ig.game.teleport(map.name.toKey("", ""), null, "NEW");       
                        }
                    }
                }

            }

            if (window.LOAD_RAW_MAP) {
                console.log('Received new map!');
                this.loadMap(window.LOAD_RAW_MAP);
                window.LOAD_RAW_MAP = null;
            }
        }
    });
    
    ig.addGameAddon(function() {
        return sc.mapLoader = new sc.MapLoader
    });
});
