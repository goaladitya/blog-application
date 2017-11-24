import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/blogs/';
const header = {headers: new Headers({'content-type': 'application/json'})}

@Injectable()
export class BlogService {

  constructor(private http: Http) { }

  postNewBlog(userInfo) {
    return this.http.post(BASE_URL, userInfo, header)
      .map(res => res.json());
  }

  putBlog(userInfo , id) {
    return this.http.put(BASE_URL + id, userInfo, header)
      .map(res => res.json());
  }

  getAllBlogs() {
    return this.http.get(BASE_URL)
      .map(res => res.json());
  }

  getBlogById(id) {
    return this.http.get(BASE_URL + id)
      .map(res => res.json());
  }

  deleteBlog(blogId) {
    return this.http.delete(BASE_URL + blogId)
      .map(res => res.json());
  }

}
