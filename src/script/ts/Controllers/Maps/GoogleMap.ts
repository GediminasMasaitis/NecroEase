class GoogleMap implements IMap {
    public config: IMapConfig;

    private map: google.maps.Map;
    private playerMarker: google.maps.Marker;
    private locationHistory: Array<any> = [];
    private locationLine: google.maps.Polyline;

    private pokestopMarkers: { [id: string]: google.maps.Marker } = {};
    private pokestopEvents: { [id: string]: IPokeStopEvent } = {};
    private gymMarkers: { [id: string]: google.maps.Marker } = {};
    private gymEvents: { [id: string]: IGymEvent } = {};
    private capMarkers: Array<CaptureMarker> = [];

    constructor(config: IMapConfig) {
        this.config = config;

        //var mapStyleOld = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
        //var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
        //var mapStyle = [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}];
        /* var mapStyle: any = [{ "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#262c33" }] },
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "gamma": 0.01 }, { "lightness": 20 }, { "color": "#949aa6" }] },
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -31 }, { "lightness": -33 }, { "weight": 2 }, { "gamma": "0.00" }, { "visibility": "off" }] },
        { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
        { "featureType": "administrative.locality", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "administrative.land_parcel", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": 30 }, { "saturation": 30 }, { "color": "#323c47" }, { "visibility": "on" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "saturation": "0" }, { "lightness": "0" }, { "gamma": "0.30" }, { "weight": "0.01" }, { "visibility": "off" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "lightness": "100" }, { "saturation": -20 }, { "visibility": "simplified" }, { "color": "#303a45" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 10 }, { "saturation": -30 }, { "color": "#282e36" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "saturation": "-100" }, { "lightness": "-100" }, { "gamma": "0.00" }, { "color": "#2a3037" }] },
        { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "color": "#575e6b" }] },
        { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#424f61" }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] },
        { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }, { "color": "#2c3440" }] },
        { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "lightness": -20 }, { "color": "#252a31" }] }]; */

        var mapStyle: any =[
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#293037"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "color": "#949aa6"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": "0.00"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            },
            {
                "color": "#344150"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "0.30"
            },
            {
                "weight": "0.01"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "100"
            },
            {
                "saturation": -20
            },
            {
                "visibility": "simplified"
            },
            {
                "color": "#344150"
            },
            {
                "gamma": "0.92"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            },
            {
                "color": "#28323f"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "-100"
            },
            {
                "gamma": "0.00"
            },
            {
                "color": "#282f38"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#575e6b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#232c37"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#222935"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            },
            {
                "color": "#212a35"
            }
        ]
    }
]



        // Initialize the map.
        var mapOptions: google.maps.MapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(0,0),
            //center: new google.maps.LatLng(51.5073509,-0.12775829999998223),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyle,
            mapTypeControl: false,
            scaleControl: false,
            zoomControl: false,
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.playerMarker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(51.5073509,-0.12775829999998223),
            icon: {
                url: "images/markers/location.png",
                scaledSize: new google.maps.Size(50, 55)
            },
            zIndex: 300
        });

        /*setTimeout(() => {
            console.log("setting new map style");
            mapOptions.styles = mapStyleOld;
            this.map.setOptions(mapOptions);
        }, 10000);*/

    }

    public movePlayer = (position: IUpdatePositionEvent): void => {
        const posArr = [position.Latitude, position.Longitude];
        const pos = new google.maps.LatLng(posArr[0], posArr[1]);

        this.playerMarker.setPosition(pos);

        if(this.config.followPlayer) {
            // Animate the map centering.
            var from    = {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()};
            var to      = {lat: posArr[0], lng: posArr[1]};
            var currentMap: google.maps.Map = this.map;
            $(from).animate(to, {
                duration: 200,
                step(cs, t) {
                    let newPos: any;

                    if(t.prop === "lat")
                        newPos = new google.maps.LatLng(cs, currentMap.getCenter().lng());
                    if(t.prop === "lng")
                        newPos = new google.maps.LatLng(currentMap.getCenter().lat(), cs);

                    currentMap.setCenter(newPos);
                }
            });
        }
        // Setup the location history line.
        this.locationHistory.push({ lat: posArr[0], lng: posArr[1] });

        // Cap the amount of location points.
        /*while(this.locationHistory.length > 300) {
            this.locationHistory.splice(0, 1);
        }*/

        this.locationLine = new google.maps.Polyline({
            path: this.locationHistory,
            geodesic: true,
            strokeColor: '#00FFFF',
            strokeOpacity: 0.7,
            strokeWeight: 4
        });
        this.locationLine.setMap(this.map);
    }

    public setPokeStops = (pokeStops: IPokeStopEvent[]): void => {
        // Translate list of incoming pokestops into id -> event dictionary.
        var incomingPokestops: { [id: string]: IPokeStopEvent } = {};
        _.each(pokeStops, stop => { incomingPokestops[stop.Id] = stop; });

        // Check for any markers that need to be removed.
        _.each(this.pokestopEvents, stop => {
            if (!(stop.Id in incomingPokestops)) {
                this.pokestopMarkers[stop.Id].setMap(null);
                delete this.pokestopMarkers[stop.Id];
                delete this.pokestopEvents[stop.Id];
            }
        });

        // Check for any markers that need to be added.
        _.each(incomingPokestops, stop => {
            if (!(stop.Id in this.pokestopEvents)) {
                this.pokestopEvents[stop.Id] = stop;
                this.pokestopMarkers[stop.Id] = this.createStopMarker(stop);
            }
        });

        // Check for any markers that need to be updated.
        _.each(pokeStops, pstop => {
            if (pstop.LastModifiedTimestampMs > this.pokestopEvents[pstop.Id].LastModifiedTimestampMs) {
                this.pokestopMarkers[pstop.Id].setIcon(this.getStopIconData(pstop.Status));
                this.pokestopEvents[pstop.Id] = pstop;
            }
        });
    }

    public setGyms = (gyms: IGymEvent[]) => {
        // Translate list of incoming pokestops into id -> event dictionary.
        var incomingGyms: { [id: string]: IGymEvent } = {};
        _.each(gyms, g => { incomingGyms[g.Id] = g; });

        // Check for any markers that need to be removed.
        _.each(this.gymEvents, g => {
            if (!(g.Id in incomingGyms)) {
                this.pokestopMarkers[g.Id].setMap(null);
                delete this.gymMarkers[g.Id];
                delete this.gymEvents[g.Id];
            }
        });

        // Check for any markers that need to be added.
        _.each(incomingGyms, g => {
            if (!(g.Id in this.gymEvents)) {
                this.gymEvents[g.Id] = g;
                this.gymMarkers[g.Id] = this.createGymMarker(g);
            }
        });
    }

    public usePokeStop(pokeStopUsed: IFortUsedEvent): void {
        var setStatus: PokeStopStatus = PokeStopStatus.Visited;
        if (this.pokestopEvents[pokeStopUsed.Id].Status === PokeStopStatus.Lure)
            setStatus = PokeStopStatus.VisitedLure;

        this.pokestopMarkers[pokeStopUsed.Id].setIcon(this.getStopIconData(setStatus));
        this.pokestopEvents[pokeStopUsed.Id].Status = setStatus;
    }

    public onPokemonCapture(pokemonCapture: IPokemonCaptureEvent): void {
        console.log(pokemonCapture);

        var captureMarker: CaptureMarker = new CaptureMarker(
            new google.maps.LatLng(pokemonCapture.Latitude, pokemonCapture.Longitude),
            this.map,
            {
                PokemonId: pokemonCapture.Id
            }
        );
        this.capMarkers.push(captureMarker);
    }

    private createStopMarker(pstop: IPokeStopEvent): google.maps.Marker {
        var psMarker: google.maps.Marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(pstop.Latitude, pstop.Longitude),
            icon: this.getStopIconData(pstop.Status),
            zIndex: 100
        });

        return psMarker;
    }

    private getStopIconData(status: PokeStopStatus): any {
        var stopImage = "images/markers/";

        switch (status) {
            case PokeStopStatus.Normal: stopImage += "Normal.png"; break;
            case PokeStopStatus.Lure: stopImage += "Lured.png"; break;
            case PokeStopStatus.Visited: stopImage += "Visited.png"; break;
            case PokeStopStatus.VisitedLure: stopImage += "VisitedLure.png"; break;
            default:
                stopImage += "Normal.png";
                break;
        }

        return {
            url: stopImage,
            scaledSize: new google.maps.Size(50, 50)
        };
    }

    private createGymMarker(gym: IGymEvent): google.maps.Marker {
        var gMarker: google.maps.Marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(gym.Latitude, gym.Longitude),
            icon: this.getGymIconData(gym),
            zIndex: 100
        });

        return gMarker;
    }

    private getGymIconData(gym: IGymEvent) {
        var stopImage = "images/markers/";

        switch (gym.OwnedByTeam) {
            case PlayerTeam.Instinct: stopImage += "instinct.png"; break;
            case PlayerTeam.Mystic: stopImage += "mystic.png"; break;
            case PlayerTeam.Valor: stopImage += "valor.png"; break;
            case PlayerTeam.Neutral: stopImage += "unoccupied.png"; break;
            default:
                stopImage += "unoccupied.png";
                break;
        }

        return {
            url: stopImage,
            scaledSize: new google.maps.Size(50, 50)
        };
    }

}
