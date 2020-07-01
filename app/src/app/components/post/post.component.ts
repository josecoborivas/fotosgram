import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  img1 = './assets/gato-4.jpg';
  img2 = './assets/gato-5.jpg';
  img3 = './assets/gato-9.jpg';
  img4 = './assets/gato-3.jpg';
  img5 = './assets/gato-2.jpg';
  img6 = './assets/gato-10.jpg';
  constructor() { }

  ngOnInit() {}

}
