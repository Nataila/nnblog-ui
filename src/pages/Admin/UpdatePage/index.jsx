import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { Input, Button } from 'antd';
// import Editor from 'react-editor-md';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

import { API } from '../../../consts.js';
import { httpPost, httpGet } from '../../../helper/request.js';

import { useState } from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const NewBlog = () => {
  let history = useHistory();
  const [editorState, setEditor] = useState()
  const [form, setForm] = useState({})
  const [data, setData] = useState({title: ''})
  const { id } = useParams()

  function titleChange(e) {
    setForm({...form, title: e.target.value})
  }
  function tagsChange(e) {
    setForm({...form, tags: e.target.value.split(',')})
  }

  async function submit() {
    const content = editorState.toHTML();
    const postData = {...data};
    postData.content = content
    const res = await httpPost(`/article/update/${id}`, postData);
    if (res.code === 200) {
      history.push(`/admin`);
    }
  }

  async function upload(editor, func) {
  }

  const fetchData = async () => {
    const res = await httpGet(`/article/detail/${id}/`);
    setData(res.data.article)
    setEditor(BraftEditor.createEditorState(res.data.article.content))
  }

  function handleChange(editorState) {
    setEditor(editorState)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
      <div className="form-wrapper">
        <div className="new-form">
          <Input className='title' value={ data.title } placeholder="文章标题" onChange={ titleChange } />
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
