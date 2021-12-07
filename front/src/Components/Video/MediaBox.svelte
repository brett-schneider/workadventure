<script lang="ts">
    import { VideoPeer } from "../../WebRtc/VideoPeer";
    import VideoMediaBox from "./VideoMediaBox.svelte";
    import ScreenSharingMediaBox from "./ScreenSharingMediaBox.svelte";
    import { ScreenSharingPeer } from "../../WebRtc/ScreenSharingPeer";
    import LocalStreamMediaBox from "./LocalStreamMediaBox.svelte";
    import type { Streamable } from "../../Stores/StreamableCollectionStore";

    export let streamable: Streamable;
</script>

<div class="media-container nes-container is-rounded">
    {#if streamable instanceof VideoPeer}
        <VideoMediaBox peer={streamable} />
    {:else if streamable instanceof ScreenSharingPeer}
        <ScreenSharingMediaBox peer={streamable} />
    {:else}
        <LocalStreamMediaBox peer={streamable} cssClass="" />
    {/if}
</div>

<style lang="scss">
    .media-container {
        display: flex;
        margin-top: 4%;
        margin-bottom: 4%;
        margin-left: 2%;
        margin-right: 2%;
        transition: margin-left 0.2s, margin-right 0.2s, margin-bottom 0.2s, margin-top 0.2s, max-height 0.2s,
            max-width 0.2s;
        cursor: url("../../../style/images/cursor_pointer.png"), pointer;
        pointer-events: auto;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 0;
        max-height: 85%;
        max-width: 85%;
    }

    .media-container:hover {
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left: 1%;
        margin-right: 1%;
    }
</style>
