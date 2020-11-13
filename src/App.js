import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { message, Layout, Form, Input, Modal, Button } from 'antd';

import Home from './pages/Home';
import Admin from './pages/Admin';
import ArticleDetail from './pages/ArticleDetail';

import './App.sass';
import { httpPost } from './helper/request.js';
import { API } from './consts.js';

export const UserContext = createContext();

export default function App() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [user, setUser] = useState({})

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };

  async function onFinish(values) {
    const res = await httpPost(API.LOGIN, values)
    if (res !== undefined) {
      localStorage.setItem('userInfo', JSON.stringify(res.data.data));
      setVisible(false);
      setUser(res.data.data);
    }
    setConfirmLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const isLoggedIn = Object.keys(user).length > 0;

  function handleOk() {
    setConfirmLoading(true);
    form.submit();
  };

  function handleCancel() {
    setVisible(false)
  }

  useEffect(() => {
    let localUser = localStorage.getItem('userInfo');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [])

  const logOut = () => {
    localStorage.removeItem('userInfo');
    setUser({});
  }

  return (
    <Router>
    <Modal
      title="登录"
      cancelText="取消"
      okText="登录"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
    </Modal>
    <div className="App">
      <header id="header">
        <div className='container'>
          <ul>
            <li><Link to="/">首页</Link></li>
            {isLoggedIn && <li><Link to="/admin"></Link></li>}
            {isLoggedIn && <li><Link to="/admin/new/">新增</Link></li>}
          </ul>
          {isLoggedIn
            ? <Button className="login-btn" type="primary" onClick={() => logOut()}>退出</Button>
            : <Button className="login-btn" type="primary" onClick={() => {setVisible(true)}}>登录</Button>
          }
        </div>
      </header>
      <div className="content-wrapper">
        <UserContext.Provider value={user}>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/detail/:id">
            <ArticleDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </UserContext.Provider>
      </div>
      <div id="footer">footer</div>
    </div>
    </Router>
  );
}
