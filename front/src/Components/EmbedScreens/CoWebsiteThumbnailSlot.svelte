<script lang="typescript">
    import { onMount } from "svelte";

    import { ICON_URL } from "../../Enum/EnvironmentVariable";
    import type { CoWebsite } from "../../WebRtc/CoWebsiteManager";

    export let index: number;
    export let coWebsite: CoWebsite;

    let icon: HTMLImageElement;

    onMount(() => {
        if (coWebsite) {
            const coWebsiteUrl = coWebsite.iframe.src;
            const urlObject = new URL(coWebsiteUrl);
            icon.src = `${ICON_URL}/icon?url=${coWebsiteUrl}&size=16..30..256`;
            icon.alt = urlObject.hostname;
        }
    });
</script>

<div id={"cowebsite-slot-" + index} class="cowebsite-thumbnail nes-container is-rounded">
    <img class="cowebsite-icon" bind:this={icon} alt="" />
    <div class="overlay">
        <div class="actions">
            <button type="button" title="Close" class="nes-btn is-error close">&times;</button>
        </div>
        <div class="actions-move">
            <button type="button" title="Expand" class="nes-btn is-primary expand">></button>
            <button type="button" title="Hightlight" class="nes-btn is-secondary hightlight">&Xi;</button>
        </div>
    </div>
</div>

<style lang="scss">
    .cowebsite-thumbnail {
        padding: 0;

        // & > .cowebsite-icon {

        // }

        & > .overlay {
            display: none;
        }
    }
</style>
