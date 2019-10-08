import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tag } from 'antd';
import Link from 'next/link';

export default class SearchResultItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      tags: PropTypes.array,
      postDate: PropTypes.string,
    }),
  };

  renderTags = () => {
    const {
      item: { tags },
    } = this.props;

    return tags.map(tag => (
      <Tag key={tag} closable={false}>
        {tag}
      </Tag>
    ));
  };

  renderPostDate = () => {
    const {
      item: { postDate },
    } = this.props;
    const processedDate = new Date(postDate).toGMTString();

    return <span>{`Posted on ${processedDate}`}</span>;
  };

  render() {
    const {
      item: { id, title },
    } = this.props;

    return (
      <div className="search-result-item">
        <Fragment>
          <Row>
            <Col span={24} className="question">
              <Link href="/questions/[qid]" as={`/questions/${id}`}>
                <a>{title}</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={16} className="tag-container">
              {this.renderTags()}
            </Col>
            <Col span={8}>{this.renderPostDate()}</Col>
          </Row>
        </Fragment>
      </div>
    );
  }
}
