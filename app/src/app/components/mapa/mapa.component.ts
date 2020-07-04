import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coord: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngAfterViewInit(){
    console.log(this.coord);
  
    const latLng = this.coord.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
  
  
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWNvYm9yaXZhcyIsImEiOiJja2J2MjlqdXUwMXdxMzVudHBmYW5uaHpkIn0.ak4oCM8o4L6jDMhKU09eVg';
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });
  
    const marker = new mapboxgl.Marker({
      draggable: false
      })
    .setLngLat([lng, lat])
    .addTo(map);
  }

  ngOnInit() {
  }

}
