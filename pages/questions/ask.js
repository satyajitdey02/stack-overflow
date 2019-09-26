import AppLayout from "./../../components/AppLayout";
import RichTextEditor from './../../components/RichTextEditor';
import { EditorState } from "draft-js";

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
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
            })(<RichTextEditor editorState={new EditorState.createEmpty()}/>)}
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
  