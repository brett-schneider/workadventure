<script lang="ts">
    import { highlightedEmbedScreen } from "../../../Stores/EmbedScreensStore";
    import CamerasContainer from "../CamerasContainer.svelte";
    import CoWebsitesContainer from "../CoWebsitesContainer.svelte";
    import MediaBox from "../../Video/MediaBox.svelte";
</script>

<div id="embed-left-block">
    <div id="main-embed-screen">
        {#if $highlightedEmbedScreen}
            {#if $highlightedEmbedScreen.type === "streamable"}
                {#key $highlightedEmbedScreen.embed.uniqueId}
                    <MediaBox streamable={$highlightedEmbedScreen.embed} />
                {/key}
            {:else if $highlightedEmbedScreen.type === "cowebsite"}
                {#key $highlightedEmbedScreen.embed.iframe.id}
                    <div id="highlighted-cowebsite">
                        <div class="actions">
                            <button type="button" class="nes-btn is-primary expand">></button>
                            <button type="button" class="nes-btn is-error close">&times;</button>
                        </div>
                    </div>
                {/key}
            {/if}
        {/if}
    </div>

    <CoWebsitesContainer highlightedEmbedScreen={$highlightedEmbedScreen} />
</div>

<CamerasContainer highlightedEmbedScreen={$highlightedEmbedScreen} />

<style lang="scss">
    #embed-left-block {
        display: flex;
        flex-direction: column;
        flex: 0 0 75%;
        height: 100%;
        //border: 1px purple solid;
        width: 75%;
    }
    #main-embed-screen {
        //border: 1px red solid;
        height: 70%;
        margin-bottom: 5%;
        max-height: 85%;

        & > div {
            margin-top: 2% !important;
            margin-bottom: 2% !important;
            padding-bottom: 56.25;
        }
    }
</style>
