import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import AppLayout from './../../components/AppLayout';

import fetch from 'isomorphic-unfetch';

import {
    Form,
    Input,
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
          autoCompleteResult: []
        };
        this.questionForm = React.createRef();
      }
    
      onChange = (currentContent) => {
        const blocks = currentContent.blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        console.log(value);
      }
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState
        });
        const plainText = editorState.getCurrentContent().getPlainText('\u0001');
        console.log('Plain Text: ', plainText);

        const html = stateToHTML(editorState.getCurrentContent());
        console.log(html);
      }
      componentDidMount() {
        this.setState({
          editorState: EditorState.createWithContent(stateFromHTML("<strong>Hello</strong> Guys")),
          showEditor: true,
        })
      }

  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
         // console.log('Received values of form: ', values);
          this.postQuestions(values);
        }
      });
    };

    postQuestions = (formValues) => {
        
        const body = stateToHTML(this.state.editorState.getCurrentContent());
        formValues.body = body;
        formValues.user = 'Satyajit Dey';
        console.log('fv ', JSON.stringify(formValues));
        
        fetch(`http://localhost:3000/questions`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
          })
    }
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit} ref={this.questionForm}>
          <Form.Item label="Question Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input title',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Question Body">
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: 'Write question in details',
                },
              ],
            })(<Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                />)}
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
  