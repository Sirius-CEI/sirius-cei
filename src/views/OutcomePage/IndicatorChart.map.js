import React, { Component } from 'react';
import tracts from './tracts';
//import Choropleth from 'react-leaflet-choropleth';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import './map.css';
// import MapLegend from './IndicatorChart.map.legend'
import chroma from 'chroma-js';

const accessToken = 'pk.eyJ1IjoibGV4Y2h1ZHppayIsImEiOiJjanBzaWx5dG8wdGppM3htaDhiZ3RwcXJ6In0.-gllVsZonwCccRMzb1DmYQ';
const stamenTonerTiles = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`;
const stamenTonerAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [44.972, -93.1663];
const zoomLevel = 8;


class MapIndicator extends Component {

    state = {
        grades: [0, 10000, 20000, 50000, 100000, 200000, 500000, 1000000],
        labels: []
    }

	color = (d) => {
		return d > 1000000 ? '#810f7c' :
		d > 500000  ? '#8856a7' :
		d > 200000  ? '#8c96c6' :
		d > 100000  ? '#b3cde3' :
				   '#edf8fb';
	}

	choropleth = (feature) => {
        this.setState.grades = chroma.limits([1,3,4], )
		let color = this.color(feature.properties.ALAND)
		return {
			fillColor: color,
			weight: 1,
			opacity: 0.5,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.5
		}
	}

	render() {
        return (
            <div className="map">
                <Map
                    style={{ width: '100%', minHeight: '300px' }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
					<FeatureGroup>
						{tracts.features.map( (feature) =>
							(<GeoJSON
                            key={feature.id}
							data={feature}
							style={this.choropleth(feature)}
							/>)
						) }
					</FeatureGroup>
                    {/* <Choropleth
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
                    /> */}
					{/* <MapLegend /> */}

                </Map>
            </div>
        );
    }
}

export default MapIndicator;