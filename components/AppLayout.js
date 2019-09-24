import React from 'react';
import Head from "./common/Head";
import SearchBox from './SearchBox';
import Link from 'next/link'

import './../assets/styles.less';

import { Layout, Menu, Icon,Row, Col, Affix } from 'antd';

const { Header, Sider, Content,  } = Layout;

export default class AppLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {children} = this.props;
    return (
        <>
          <Head/>
          <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Satyajit Dey</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>
              <Link href="/questions/ask">
                
                <a>Ask Question</a>
              
            </Link>
              </span>
              
              
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
         <Affix offsetTop={0}>
          <Header style={{ background: '#fff', padding: 0 }}>
           <Row>
             <Col span={6}>
             
             </Col>
             <Col span={12}>
              <SearchBox />
             </Col>
             <Col span={6}>
             
             </Col>
           </Row>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}

            />

            
          </Header>
          </Affix>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
        </>
    );
  }

}
