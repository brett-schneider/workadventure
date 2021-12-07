import { writable } from "svelte/store";
import type { CoWebsite } from "../WebRtc/CoWebsiteManager";

function createCoWebsiteStore() {
    const { subscribe, set, update } = writable(Array<CoWebsite>());

    return {
        subscribe,
        add: (coWebsite: CoWebsite, position?: number) => {
            if (position || position === 0) {
                update((currentArray) => {
                    if (currentArray.length > position) {
                        return [...currentArray.splice(position, 0, coWebsite)];
                    }

                    return [...currentArray, coWebsite];
                });
                return;
            }

            update((currentArray) => [...currentArray, coWebsite]);
        },
        remove: (coWebsite: CoWebsite) => {
            update((currentArray) => [
                ...currentArray.filter((currentCoWebsite) => currentCoWebsite.iframe.id !== coWebsite.iframe.id),
            ]);
        },
        empty: () => {
            set(Array<CoWebsite>());
        },
    };
}

export const coWebsites = createCoWebsiteStore();
