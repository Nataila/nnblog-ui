import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import { httpGet } from '../../../helper/request.js';

function ArticleItems (props) {
  console.log(props.articles)
  const items = props.articles.map(item =>
    <div key={item._id.$oid}>
      <Link to={`/admin/update/${item._id.$oid}` }>{item.title}</Link>
      {/*<div dangerouslySetInnerHTML = {{ __html:item.content }}></div>*/}
    </div>
  )
  return (
    <div>{items}</div>
  )
}

export default function ArticleList() {
  const [articles, setArticle] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await httpGet('/article/list/');
      setArticle(res.data.articles);
      document.querySelectorAll("pre code").forEach(block => {
        try{hljs.highlightBlock(block);}
        catch(e){console.log(e);}
      });
    }
    fetchData();
  }, [])
  return (
    <div>
      <ArticleItems articles={articles} />
    </div>
  )
}
