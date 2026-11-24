import fs from 'fs';
import {geoConicConformal, geoPath, geoGraticule} from 'd3-geo';
import {feature} from 'topojson-client';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));
const countries = feature(topo, topo.objects.countries).features;
const W=960,H=1000;
const box={type:'Feature',geometry:{type:'MultiPoint',coordinates:[[-10,36],[18,36],[-8,58.5],[16,58.5]]}};
const proj=geoConicConformal().parallels([40,56]).rotate([-5,0]).fitExtent([[20,20],[W-20,H-20]],box).clipExtent([[-5,-5],[W+5,H+5]]);
const path=geoPath(proj).digits(1);
const out={W,H,countries:[],grat:path(geoGraticule().step([5,5])()),cities:{}};
for(const c of countries){const d=path(c); if(c.properties.name==='Antarctica')continue; const b=path.bounds(c); if(d && b[1][0]>0 && b[0][0]<W && b[1][1]>0 && b[0][1]<H) out.countries.push({id:c.id,name:c.properties.name,d});}
const cities={Rome:[12.5,41.9],Paris:[2.35,48.86],London:[-0.13,51.5],Madrid:[-3.7,40.42],Berlin:[13.4,52.52],Lisbon:[-9.14,38.72],Winchester:[-1.31,51.06]};
for(const [k,v] of Object.entries(cities)) out.cities[k]=proj(v).map(n=>+n.toFixed(1));
fs.writeFileSync('map.json',JSON.stringify(out));
console.log(out.countries.length, JSON.stringify(out.cities), (fs.statSync('map.json').size/1024|0)+'KB');
