import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelect = new EventEmitter<string>();
  @Input() avatarActual: string = '';

  avatarSlide = {
    slidesPerView: 3.5,
  }

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  constructor() { }

  ngOnInit() {
    this.avatarUserSeleccionado();
  }

  avatarUserSeleccionado(){
    const index = this.avatars.findIndex(av =>  av.img === this.avatarActual);

    if(index !== -1){
      this.avatars.forEach(avatar => avatar.seleccionado = false);
      this.avatars[index].seleccionado = true;
    }
  }

  selectAvatar(avatar){
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    avatar.seleccionado = true;
    this.avatarSelect.emit(avatar.img);
  }

}
