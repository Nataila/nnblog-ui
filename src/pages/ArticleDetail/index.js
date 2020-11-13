import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import { httpGet } from '../../helper/request.js';
import './index.sass';

export default function ArticleDetail() {
  const { id } = useParams();
  const [ article, setArticle ] = useState({});

  async function fetchData() {
    const res = await httpGet(`/article/detail/${id}/`);
    setArticle(res.data.article);
    document.querySelectorAll("pre code").forEach(block => {
      try{hljs.highlightBlock(block);}
      catch(e){console.log(e);}
    });
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="detail container">
      <div>{ article.title }</div>
      <div dangerouslySetInnerHTML = {{ __html:article.content }}></div>
    </div>
  )
}
