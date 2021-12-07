import { derived, get, writable } from "svelte/store";
import type { CoWebsite } from "../WebRtc/CoWebsiteManager";
import { LayoutMode } from "../WebRtc/LayoutManager";
import { coWebsites } from "./CoWebsiteStore";
import { Streamable, streamableCollectionStore } from "./StreamableCollectionStore";

export type EmbedScreen =
    | {
          type: "streamable";
          embed: Streamable;
      }
    | {
          type: "cowebsite";
          embed: CoWebsite;
      };

function createHighlightedEmbedScreenStore() {
    const { subscribe, set, update } = writable<EmbedScreen | null>(null);

    return {
        subscribe,
        highlight: (embedScreen: EmbedScreen) => {
            set(embedScreen);
        },
        removeHighlight: () => {
            set(null);
        },
        toggleHighlight: (embedScreen: EmbedScreen) => {
            update((currentEmbedScreen) => (embedScreen !== currentEmbedScreen ? embedScreen : null));
        },
    };
}

export const highlightedEmbedScreen = createHighlightedEmbedScreenStore();
export const embedScreenLayout = writable<LayoutMode>(LayoutMode.Presentation);

export const hasEmbedScreen = derived(
    [streamableCollectionStore, coWebsites],
    ($values) => get(streamableCollectionStore).size + get(coWebsites).length > 0
);
