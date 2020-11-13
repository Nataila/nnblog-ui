import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons';

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import { httpGet, httpDelete } from '../../helper/request.js';
import { API } from '../../consts.js';

import { UserContext } from '../../App.js';

import './index.sass';

// function ArticleItems (props) {
//   const items = props.articles.map(item =>
//   )
//   return (
//     <div>{items}</div>
//   )
// }


export default function Home(props) {
  const [articles, setArticle] = useState([]);

  const user = useContext(UserContext);

  async function fetchData() {
    const res = await httpGet(API.ARTICLE.LIST);
    setArticle(res.data.articles);
    document.querySelectorAll("pre code").forEach(block => {
      try{hljs.highlightBlock(block);}
      catch(e){console.log(e);}
    });
  }
  useEffect(() => {
    fetchData();
  }, [])

  async function delArticle(id) {
    const res = await httpDelete(`${API.ARTICLE.DEL}${id}/`);
    fetchData();
  }

  const items = articles.map(item =>
    <div className="article-item" key={item._id.$oid}>
      <Link className='article-title' to={`/detail/${item._id.$oid}` }>{item.title}</Link>
      <div className='article-content' dangerouslySetInnerHTML = {{ __html:item.content }}></div>
      <div className="op">
        <div className="article-info">
          <FieldTimeOutlined /> 2020-09-11
        </div>
        {Object.keys(user).length > 0 &&
          <Popconfirm
            placement="topRight"
            title='确定删除此文章吗?'
            onConfirm={() => delArticle(item._id.$oid)}
            okText="确定"
            cancelText="再想想"
          >
              <Button type="primary" shape="circle" size="small" icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        }
      </div>
    </div>
  )

  return (
    <div className="container">
    <div className="home">
      <aside className="aside">
      </aside>
      <div id="content">{ items }</div>
      <aside className="aside">
      </aside>
    </div>
    </div>
  );
}
