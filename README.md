# 360-Imaging-task

- A simple blog Restful API using Node.js 


## Its available here, enjoy  :heart:
https://blog-simple-api.herokuapp.com :tada:

## Endpoints

### For Post CRUD operations:

- New post : '/api/post' <br> method -> post <br> body -> {<br>author : (required),<br> title : (required),<br> post : (required - maxlength : 200)<br>}
- Delete post : '/api/post/postID' <br> method -> delete
- Edit post : '/api/post/postID' <br> method -> patch <br> body -> {title, post}
- Show all posts : '/api/post' <br> method -> get
- Show a posts : '/api/post/postID' <br> method -> get

### For Comment CRUD operations:

- New comment : '/api/comment' <br> method -> post <br> body -> {<br>commenter : (required),<br> comment : (required - maxlength : 100)<br>}
- Delete comment : '/api/comment/postID/commentID' <br> method -> delete
- Edit comment : '/api/commentcomment/postID/commentID' <br> method -> patch <br> body -> {comment}
- Show all comments of a post : '/api/comment/postID' <br> method -> get

## :mega: There is 16-unit test

 Post a new post :heavy_check_mark:   <br>
 Post a new post with missing attributes :heavy_check_mark:  <br>
 Should Fetch all the Posts :heavy_check_mark: <br>
 Should Fetch specific post :heavy_check_mark:<br>
 ID doesn't exist to fetch :heavy_check_mark: <br>
 Update post :heavy_check_mark: <br>
 Delete Post :heavy_check_mark: <br>
 Delete Post doesn't exist :heavy_check_mark: <br>
 Update post doesn't exist :heavy_check_mark: <br>
 <br> 
 Add new comment :heavy_check_mark: <br>
 Add new comment to a deleted post :heavy_check_mark: <br>
 Should Fetch all the comments of a post :heavy_check_mark: <br>
 Update comment :heavy_check_mark: <br>
 Delete comment :heavy_check_mark: <br>
 Delete comment on deleted post :heavy_check_mark: <br>
 Update comment doesn't exist :heavy_check_mark: <br>
