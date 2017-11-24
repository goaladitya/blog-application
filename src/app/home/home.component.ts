import {Component, Input, OnInit} from '@angular/core';
import { LoginService} from '../login.service';
import {BlogService} from '../blog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object;
  username;
  blogs: object;
  isDataLoaded = false;
  updateBlogId = null;
  updateBlogData = null;
  filterCriteria = 1;
  @Input() userId;
  constructor(private request: LoginService , private blogRequest: BlogService) {
  }
  ngOnInit() {
    this.request.getUserById(sessionStorage.getItem('key'))
      .subscribe(data => {
        this.user = data;
        this.username = this.user['username'];
      });
    this.blogRequest.getAllBlogs()
      .subscribe(data => {
        this.blogs = data;
        this.isDataLoaded = true;
      });
  }
  logout() {
    sessionStorage.removeItem('key');
    window.location.reload();
  }
  like(blogId) {
    console.log(blogId);
    this.user['likes'].push(blogId)
    const updatedUser = {
      id: this.user['id'],
      username: this.user['username'],
      password: this.user['password'],
      likes: this.user['likes']
    };
    this.request.putLike(updatedUser, this.user['id'])
      .subscribe(data => {
      });
  }

  dislike(blogId) {
    console.log(blogId);
    this.user['likes'].splice(this.user['likes'].indexOf(blogId), 1);
    const updatedUser = {
      id: this.user['id'],
      username: this.user['username'],
      password: this.user['password'],
      likes: this.user['likes']
    };
    this.request.putLike(updatedUser, this.user['id'])
      .subscribe(data => {
      });
  }

  filter(filterCriteriaParam) {
    this.filterCriteria = filterCriteriaParam;
  }

  showOrNot(blogIdParam, blogAuthorParam, blogCategotyParam) {
    if (this.filterCriteria === 1) {
      return true;
    }
    if (this.filterCriteria === 2 && blogAuthorParam === this.username) {
      return true;
    }
    if (this.filterCriteria === 3 && (this.user['likes'].indexOf(blogIdParam) + 1)) {
      return true;
    }
    if (this.filterCriteria === 4 && blogCategotyParam === 'writing') {
      return true;
    }
    if (this.filterCriteria === 5 && blogCategotyParam === 'Marketing') {
      return true;
    }
    if (this.filterCriteria === 6 && blogCategotyParam === 'News') {
      return true;
    }
    if (this.filterCriteria === 7 && blogCategotyParam === 'Social') {
      return true;
    }
    return false;
  }


  deleteBlog(blogId) {
    console.log(blogId);
    this.blogRequest.deleteBlog(blogId)
      .subscribe(data => {
        window.location.reload();
      });
  }

  updateBlogPre(blogId) {
      this.blogRequest.getBlogById(blogId)
        .subscribe(data => {
          this.updateBlogId = blogId;
          this.updateBlogData = data;
        });
  }
}
