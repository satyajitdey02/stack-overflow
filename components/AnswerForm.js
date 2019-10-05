import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import { Form, Button } from 'antd';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showEditor: false,
      confirmDirty: false,
      autoCompleteResult: [],
    };

    this.answerForm = React.createRef();
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(stateFromHTML('')),
      showEditor: true,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        //values.tags  = [...this.state.tags];

        await this.postAnswer(values);
        this.props.refreshAnswerList();
      }
    });
  };

  postAnswer = formValues => {
    const { question } = this.props;
    const answers = question.answers ? [...question.answers] : [];
    const answer = stateToHTML(this.state.editorState.getCurrentContent());

    answers.push({
      userId: 1,
      answer: answer,
      answerDate: new Date(),
    });

    const updatedQuestion = {
      ...question,
      answers: answers,
    };

    console.log('fv ', JSON.stringify(updatedQuestion));

    return fetch(`http://localhost:3000/questions/${this.props.question.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuestion),
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    const plainText = editorState.getCurrentContent().getPlainText('\u0001');
    console.log('Plain Text: ', plainText);

    const html = stateToHTML(editorState.getCurrentContent());
    //  console.log(html);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        ref={this.answerForm}
      >
        <Form.Item label="Question Body">
          {getFieldDecorator('answer', {
            rules: [
              {
                required: true,
                message: 'Write answer',
              },
            ],
          })(
            this.state.showEditor ? (
              <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            ) : (
              <div />
            )
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Post Answer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAnswerForm = Form.create({ name: 'answer' })(AnswerForm);

export default WrappedAnswerForm;
