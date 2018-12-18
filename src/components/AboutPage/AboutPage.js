import React, { Component } from 'react';
import tracts from './mnct';
import Choropleth from 'react-leaflet-choropleth';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './map.css'
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

const accessToken = 'pk.eyJ1IjoibGV4Y2h1ZHppayIsImEiOiJjanBzaWx5dG8wdGppM3htaDhiZ3RwcXJ6In0.-gllVsZonwCccRMzb1DmYQ';
const stamenTonerTiles = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`;
const stamenTonerAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [44.972, -93.1663];
const zoomLevel = 12;

class AboutPage extends Component {

    render() {
        return (
            <div className="map">
                <Map
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
                        fillOpacity: 0.8
                    }}
                      onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.AWATER)}
                      ref={(el) => this.choropleth = el.leafletElement}
                    />
                    {/* <GeoJSON data={tracts} style={this.getStyle} /> */}
                </Map>
            </div>
        );
    }
}

export default AboutPage;
