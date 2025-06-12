import * as ChannelService from '@channel.io/channel-web-sdk-loader';

function ChannelTalk() {
    ChannelService.loadScript()
    ChannelService.boot({
        pluginKey: process.env.REACT_APP_CHANNEL_TALK_PLUGIN_KEY ?? ''
    });
}

export default ChannelTalk;