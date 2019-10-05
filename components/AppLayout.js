import React from 'react';
import Head from './common/Head';
import SearchBox from './SearchBox';
import Link from 'next/link';

import './../assets/styles.less';

import { Layout, Menu, Icon, Row, Col, Affix } from 'antd';
import HeaderOptions from './HeaderOptions';

const { Header, Sider, Content } = Layout;

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
    const { children } = this.props;
    return (
      <>
        <Head />
        <Layout className="main-layout">
          <Layout>
            <Affix offsetTop={0}>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Row className="search-box-container">
                  <Col span={6}>
                    <HeaderOptions />
                  </Col>
                  <Col span={12}>
                    <SearchBox />
                  </Col>
                  <Col span={6}>
                    <Menu mode="horizontal">
                      <Menu.Item key="ask">
                        <Link href="/questions/ask" prefetch={true}>
                          <a>Ask</a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="login" prefetch={true}>
                        <Link href="/login">
                          <a>Login</a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="register" prefetch={true}>
                        <Link href="/register">
                          <a>Register</a>
                        </Link>
                      </Menu.Item>
                    </Menu>
                  </Col>
                </Row>
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
