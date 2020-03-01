import ReloaderClient from "./map-loader-client.js";
const {Api} = window.ToolsApi.Communication;

export default class MapLoad extends Plugin {
	constructor(mod) {
		super();
		this.mod = mod;
		this.client = new ReloaderClient;
	}

	preload() {
		Api.subToTopic("map", this.client);
		window.addEventListener("beforeunload", () => {
			Api.unsubFromTopic("map", this.client);
		});
	}

	async prestart() {
		sc.CrossCode.inject({
			init: function(...args) {
				this.parent(...args);
				sc.mapLoader.setTitleGui(ig.gui.guiHooks.filter(e => e.gui instanceof sc.TitleScreenGui).pop().gui);
			}
		});
	}
}
