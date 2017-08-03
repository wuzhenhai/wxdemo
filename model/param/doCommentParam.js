function doCommentParamSet(article_id,contents,comment_id){
 this.article_id = article_id;
 this.contents = contents;
 this.comment_id = comment_id;
}

module.exports = {
  doCommentParamSet:doCommentParamSet
}