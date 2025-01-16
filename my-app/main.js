import './style.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import {Circle, Fill, Style, Stroke} from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';

const hometowns = [
  {lat: -87.8289, lng : 42.1275, cnt: 5},
  {lat: -122.0188, lng: 37.5934, cnt: 3},
  {lat: -118.1445, lng : 34.1478, cnt: 1},
  {lat: -121.1761, lng:  38.6779, cnt: 1}
];




var vectorSource = new VectorSource({ 
  features: hometowns.map((hometown) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([hometown.lat, hometown.lng]))
    });
  
  
    const circleStyle = new Circle({
      radius: 5+ hometown.cnt ,
      fill: new Fill({ color: 'blue' }) 
    });
  
    feature.setStyle(
      new Style({
        image: circleStyle
      })
    );
  
    return feature;
  })
  });



const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorLayer({
      source: vectorSource
    })
  ],
  view: new View({
    //projection: 'EPSG:4326',
    center: fromLonLat([-120.660160, 35.300675]),
    zoom: 4.5
  })
});
