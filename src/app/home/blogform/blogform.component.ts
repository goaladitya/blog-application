import {Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {BlogService} from '../../blog.service';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
})

export class BlogformComponent implements OnInit, AfterViewChecked {

   @Input() userId;
   @Input() username;
   @Input() updateBlogId;
   @Input() updateBlogDataParam;
   updateBlogTitle: string;
   updateBlogCategory: string;
   updateBlogContent: string;
   isLoaded = false;

  constructor(private blogRequest: BlogService, private cd: ChangeDetectorRef) {
  }

  addBlog(title, content, category) {
    const newBlog = {
      title: title,
      category: category,
      content: content,
      author: this.username
    };
    (<HTMLInputElement>document.getElementById('title')).value = '';
    (<HTMLInputElement>document.getElementById('content')).value = '';
    this.blogRequest.postNewBlog(newBlog)
      .subscribe(data => {
      });
    window.location.reload();
  }

  updateBlog(title, content, category) {
    const newBlog = {
      title: title,
      category: category,
      content: content,
      author: this.username,
      id: this.updateBlogId
    };
    (<HTMLInputElement>document.getElementById('title')).value = '';
    (<HTMLInputElement>document.getElementById('content')).value = '';
    this.blogRequest.putBlog(newBlog, this.updateBlogId)
      .subscribe(data => {
      });
    window.location.reload();
  }


  ngOnInit() {
    if (this.updateBlogId) {
      this.updateBlogCategory = this.updateBlogDataParam['category'];
      this.updateBlogTitle = this.updateBlogDataParam['title'];
      this.updateBlogContent = this.updateBlogDataParam['content'];
      console.log('Check');
    }
    console.log(this.updateBlogId);
    console.log(this.updateBlogDataParam);
  }

  ngAfterViewChecked() {
    if (this.updateBlogId && !this.isLoaded) {
      this.updateBlogCategory = this.updateBlogDataParam['category'];
      this.updateBlogTitle = this.updateBlogDataParam['title'];
      this.updateBlogContent = this.updateBlogDataParam['content'];
      this.isLoaded = true;
      console.log('Check');
    }
    this.cd.detectChanges();
  }
}
