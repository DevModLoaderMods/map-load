const {Client} = window.ToolsApi.Communication;

export default class ReloaderClient extends Client {
    constructor(ig) {
		super();
        this.ig = ig;
    }

    onMessage(topic, msg) {
        if (topic === 'map' && msg.type === 'update') {
            this.ig.game.teleportFromMap(msg.data);
        }
    }
}
