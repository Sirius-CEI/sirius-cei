import React, { Component } from 'react';
import tracts from './tracts';
import Choropleth from 'react-leaflet-choropleth';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import './map.css';

const accessToken = process.env.MAPBOX_API_KEY;
const stamenTonerTiles = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${process.env.MAPBOX_API_KEY}`;
const stamenTonerAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [44.972, -93.1663];
const zoomLevel = 10;

class MapIndicator extends Component {

	render() {
        return (
            <div className="map">
                <Map
                    style={{ width: '100%', height: '500px' }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Choropleth
                      data={{type: 'FeatureCollection', features: tracts.features}}
                      valueProperty={(feature) => feature.properties.ALAND}
                      // visible={(feature) => feature.id !== active.id}
                      scale={['#ffffb2', '#bd0026']}
                      steps={5}
                      mode='k'
                      style={{
                        fillColor: '#F28F3B',
                        weight: 1,
                        opacity: 0.5,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.5
                    }}
                      //onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.ALAND)}
                      //ref={(el) => this.choropleth = el.leafletElement}
                    />

                </Map>
            </div>
        );
    }
}

export default MapIndicator;