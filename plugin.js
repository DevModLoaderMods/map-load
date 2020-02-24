import ReloaderClient from "./map-loader-client.js";
const {Api} = window.ToolsApi.Communication;

export default class MapLoad extends Plugin {
	constructor(mod) {
		super();
		this.mod = mod;
		
	}

	async preload() {

	}

	async postload() {
		// ig.game.teleportFromMap

		this.client = new ReloaderClient(ig);
	}

	async prestart() {
		const client = this.client;
		ig.Game.inject({
			init: function(...args) {
				this.parent(...args);
				Api.subscribeToTopic("map", client);
			},
			teleportFromMap: function(rawMapData, teleportPosition, teleportName = "NEW") {
				this.previousMap = this.mapName;
				this.mapName = rawMapData.name.toKey("","");
				this.marker = null;
				// experiment with this ig.TeleportPosition.createFromJson
				/*if (teleportPosition.marker) {
					this.marker = teleportPosition.marker;
				}*/
				
				this.teleporting.position = null;
				this.teleporting.active = true;
				this.teleporting.timer = 0;
				this.teleporting.clearCache = true;
				this.teleporting.reloadCache = true;
				this.events.clearQueue();
				for (c = 0; c < this.addons.teleport.length; ++c) {
					this.addons.teleport[c].onTeleport(mapName, teleportPosition, teleportName);
				}
				this.teleporting.levelData = rawMapData;
			}
		});
	}
}
