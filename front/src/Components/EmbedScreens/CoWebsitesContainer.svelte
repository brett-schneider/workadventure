<script lang="typescript">
    import { coWebsites } from "../../Stores/CoWebsiteStore";
    import type { EmbedScreen } from "../../Stores/EmbedScreensStore";
    import type { CoWebsite } from "../../WebRtc/CoWebsiteManager";
    import CoWebsiteThumbnail from "./CoWebsiteThumbnailSlot.svelte";

    export let highlightedEmbedScreen: EmbedScreen | null;

    function isThumbnail(coWebsite: CoWebsite, index: number) {
        if (index === 0) {
            return false;
        }

        return (
            !highlightedEmbedScreen ||
            (highlightedEmbedScreen.type === "cowebsite" &&
                highlightedEmbedScreen.embed.iframe.id !== coWebsite.iframe.id)
        );
    }
</script>

{#if $coWebsites.length > 0}
    <div id="cowebsite-thumbnail-container">
        {#each [...$coWebsites.values()] as coWebsite, index}
            {#if isThumbnail(coWebsite, index)}
                <CoWebsiteThumbnail {index} {coWebsite} />
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
    #cowebsite-thumbnail-container {
        pointer-events: all;
        height: 25%;
        border: 1px green solid;
        overflow-x: auto;
        display: flex;
    }
</style>
