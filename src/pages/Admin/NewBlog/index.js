/**
* @description
*   + description
# cc @ 2020-08-18 22:13:39
*/

import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import { Input, Button } from 'antd';
import axios from 'axios';
// import Editor from 'react-editor-md';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

import { API } from '../../../consts.js';
import { httpPost } from '../../../helper/request.js';

import './index.sass';

const NewBlog = () => {
  let history = useHistory();
  const [editorState, setEditor] = useState()
  const [form, setForm] = useState({})

  function titleChange(e) {
    setForm({...form, title: e.target.value})
  }
  function tagsChange(e) {
    setForm({...form, tags: e.target.value.split(',')})
  }

  async function submit() {
    const content = editorState.toHTML();
    const postData = {...form, content};
    console.log(postData)
    const res = await httpPost(API.ARTICLE.NEW, postData);
    if (res.code === 200) {
      history.push(`/detail/${res.data.id}`);
    }
  }

  async function upload(editor, func) {
  }

  function handleChange(editorState) {
    setEditor(editorState)
  }

  return (
      <div className="form-wrapper">
        <div className="new-form">
          <Input className='title' placeholder="文章标题" onChange={ titleChange } />
          <BraftEditor
            className='braft-editor'
            value={editorState}
            onChange={ handleChange }
          />
          <Input className='tags' placeholder="标签" onChange={ tagsChange } />
          <Button onClick={ submit } type="primary" htmlType="submit">确定</Button>
        </div>
      </div>
  )
};

export default NewBlog;
