import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[]=[];
  habilitado = true;

  constructor(private postService: PostsService) {}

  ngOnInit(){
    this.siguientes();
    this.postService.nuevoPost.subscribe(post => {
      this.posts.unshift(post);
    })
  }

  recargar(event){
    this.siguientes(event, true);
  }

  siguientes(event?, pull: boolean = false){

    if(pull) {
      this.posts = [];
      this.habilitado = true;
    }
    setTimeout(() => {
      this.postService.getPosts(pull).subscribe(result => {
        console.log(result);
        this.posts.push(...result.posts);
        if(event){
          event.target.complete();
          if(result.posts.length === 0) {
            this.habilitado = false;
          }
        }
      });
    }, 500);
  }

}
