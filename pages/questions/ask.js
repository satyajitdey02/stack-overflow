import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import AppLayout from './../../components/AppLayout';

import { TweenOneGroup } from 'rc-tween-one';

import fetch from 'isomorphic-unfetch';

import {
  Form,
  Input,
  Tag,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      editorState: null,
      showEditor: false,
      confirmDirty: false,
      autoCompleteResult: [],
      tags: [],
    };
    this.questionForm = React.createRef();
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);
  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );

    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  onChange = currentContent => {
    const blocks = currentContent.blocks;
    const value = blocks
      .map(block => (!block.text.trim() && '\n') || block.text)
      .join('\n');
    console.log(value);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    const plainText = editorState.getCurrentContent().getPlainText('\u0001');
    console.log('Plain Text: ', plainText);

    const html = stateToHTML(editorState.getCurrentContent());
    console.log(html);
  };

  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(stateFromHTML('')),
      showEditor: true,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values.tags = [...this.state.tags];
        this.postQuestions(values);
      }
    });
  };

  postQuestions = formValues => {
    const body = stateToHTML(this.state.editorState.getCurrentContent());
    formValues.body = body;
    formValues.user = 'Satyajit Dey';
    formValues.postDate = new Date();
    console.log('fv ', JSON.stringify(formValues));

    fetch(`http://localhost:3000/questions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <AppLayout>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          ref={this.questionForm}
        >
          <Form.Item
            labelCol={{ lg: 2 }}
            labelAlign="left"
            label="Question Title"
          >
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input title',
                },
              ],
            })(<Input size="large" />)}
          </Form.Item>
          <Form.Item
            labelCol={{ lg: 2 }}
            labelAlign="left"
            label="Question Body"
          >
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: 'Write question in details',
                },
              ],
            })(
              <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <div>
              <div style={{ marginBottom: 16 }}>
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                    onComplete: e => {
                      e.target.style = '';
                    },
                  }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
              </div>
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </div>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Post Question
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    );
  }
}

const WrappedQuestionForm = Form.create({ name: 'ask' })(QuestionForm);

export default WrappedQuestionForm;
