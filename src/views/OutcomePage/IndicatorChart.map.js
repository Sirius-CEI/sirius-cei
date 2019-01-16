import React, { Component } from 'react';
import tract from './geography/tracts';
import county from './geography/counties';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux';
import { Map, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import './map.css';
// import MapLegend from './IndicatorChart.map.legend'
import chroma from 'chroma-js';

const accessToken = 'pk.eyJ1IjoibGV4Y2h1ZHppayIsImEiOiJjanBzaWx5dG8wdGppM3htaDhiZ3RwcXJ6In0.-gllVsZonwCccRMzb1DmYQ';
const stamenTonerTiles = `https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`;
const stamenTonerAttr = 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [45.2, -93.43];
const zoomLevel = 8;


class MapIndicator extends Component {

    state = {
        geo: '',
        grades: [],
        labels: [],
        data: []
    }

	color = (d) => {
		return d > this.state.grades[3] ? '#88419d' :
		d > this.state.grades[2] ? '#8c96c6' :
		d > this.state.grades[1] ? '#b3cde3' :
				   '#edf8fb';
    }
    
    componentWillMount = () => {
        let geo = '';
        switch (this.props.chart.map_level) {
            case 'county': geo = county; break;
            case 'tract': geo = tract; break;
        }
        
        let data = this.props.chartData.filter(item => (item.chart === this.props.chart._id));
        let values = data.map((item) => item.value);
        let grades = chroma.limits(values, 'q', 4);
        this.setState({
            ...this.state,
            grades: grades,
            data: data,
            geo: geo,
        })
    }

	choropleth = (feature) => {
        let id = feature.properties.GEOID;
        let dataPoint = this.state.data.find((x) => {return x.variable === id})
        if (dataPoint) {
            let color = this.color(dataPoint.value)
            return {
                fillColor: color,
                weight: 1,
                opacity: 0.5,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.8
            }
        } else {return {
            fillColor: 'grey',
            weight: 1,
            opacity: 0.5,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        }}
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
						{this.state.geo.features.map( (feature) =>
							(<GeoJSON
                            key={feature.properties.GEOID}
							data={feature}
							style={this.choropleth(feature)}
							/>)
						) }
					</FeatureGroup>
					{/* <MapLegend /> */}

                </Map>
            </div>
        );
    }
}

const mapStateToProps = state => ({
	chartData: state.chartData,
});

export default connect(mapStateToProps)(MapIndicator);