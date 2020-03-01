const {Client} = window.ToolsApi.Communication;

export default class ReloaderClient extends Client {
    onMessage(topic, msg) {
        if (topic === 'map' && msg.type === 'update') {
            window.LOAD_RAW_MAP = msg.data;
        }
    }
}
