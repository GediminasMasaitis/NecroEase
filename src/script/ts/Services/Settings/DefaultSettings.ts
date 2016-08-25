﻿class DefaultSettings {
    public static get settings(): ISettings {
        return {
            mapProvider: MapProvider.GMaps,
            mapFolllowPlayer: true,
            mapClearing: 0,
            mapGoogleApiKey: "AIzaSyA6jYrlom7XqBW8FB_2uw2AJEOWP5fN6pg",
            mapOsmApiKey: "",

            clientAddress: "127.0.0.1",
            clientPort: 14252,
            clientUseSSL: false,
            notificationsJournal: {
                pokestopUsed: true,
                pokemonCapture: true,
                pokemonSnipe: true,
                pokemonEvolved: true,
                eggHatched: true,
                incubatorStatus: true,
                itemRecycle: true,
                pokemonTransfer: true,
            },
            notificationsDesktop: {
                pokestopUsed: false,
                pokemonCapture: false,
                pokemonSnipe: false,
                pokemonEvolved: false,
                eggHatched: false,
                incubatorStatus: false,
                itemRecycle: false,
                pokemonTransfer: false,
            },
            notificationsToast: {
                pokestopUsed: false,
                pokemonCapture: false,
                pokemonSnipe: false,
                pokemonEvolved: false,
                eggHatched: false,
                incubatorStatus: false,
                itemRecycle: false,
                pokemonTransfer: false,
            },
            notificationsJournalClearingAnimation: true
        }
    }
}