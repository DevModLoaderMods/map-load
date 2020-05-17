const { Client } = window.Tool.Communication;

export default class ReloaderClient extends Client {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.subscribeTo("map");
        window.addEventListener("beforeunload", () => {
            this.unsubscribeFrom("map");
        });
    }

    onMessage(topic, msg) {
        if (topic === 'map' && msg.type === 'update') {
            window.LOAD_RAW_MAP = msg.data;
        }
    }
}
