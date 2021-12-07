<script lang="typescript">
    import { obtainedMediaConstraintStore } from "../Stores/MediaStore";
    import { localStreamStore, isSilentStore } from "../Stores/MediaStore";
    import SoundMeterWidget from "./SoundMeterWidget.svelte";
    import { onDestroy } from "svelte";
    import { srcObject } from "./Video/utils";

    let stream: MediaStream | null;

    const unsubscribe = localStreamStore.subscribe((value) => {
        if (value.type === "success") {
            stream = value.stream;
        } else {
            stream = null;
        }
    });

    onDestroy(unsubscribe);

    let isSilent: boolean;
    const unsubscribeIsSilent = isSilentStore.subscribe((value) => {
        isSilent = value;
    });

    onDestroy(unsubscribeIsSilent);
</script>

<div>
    <div
        class="nes-container is-rounded my-cam-video-container"
        class:hide={!$obtainedMediaConstraintStore.video || isSilent}
    >
        {#if $localStreamStore.type === "success" && $localStreamStore.stream}
            <video class="my-cam-video" use:srcObject={stream} autoplay muted playsinline />
            <SoundMeterWidget {stream} />
        {/if}
    </div>
    {#if isSilent}
        <div class="is-silent">Silent zone</div>
    {/if}
</div>

<style lang="scss">
    .my-cam-video-container {
        position: absolute;
        right: 15px;
        bottom: 30px;
        max-height: 20%;
        transition: right 350ms;
        padding: 0;
        background-color: #00000099;
        overflow: hidden;
    }

    .my-cam-video-container.hide {
        right: -20vw;
    }

    .my-cam-video {
        background-color: #00000099;
        max-height: 20vh;
        width: 100%;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }
</style>
