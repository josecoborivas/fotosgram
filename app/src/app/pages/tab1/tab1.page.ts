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
  constructor(private postService: PostsService) {}

  ngOnInit(){
    this.postService.getPosts().subscribe(result => {
      console.log(result);
      this.posts.push(...result.posts);
    });
  }

}
