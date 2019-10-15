import AppLayout from './../../components/AppLayout';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import AnswerForm from '../../components/AnswerForm';
import { Tag } from 'antd';

export default class Question extends React.Component {
  static async getInitialProps({ query }) {
    const json = await this.fetchQuestion(query.qid);

    return { question: json };
  }

  static async fetchQuestion(qid) {
    const res = await fetch(`http://localhost:3000/questions/${qid}`);
    return await res.json();
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshCount: 0,
      question: this.props.question,
    };

    this.answerForm = React.createRef();
  }

  upVote = async index => {
    const answers = [...this.state.question.answers];
    const currentAnswer = { ...answers[index] };
    currentAnswer.vote = currentAnswer.vote ? currentAnswer.vote + 1 : 1;

    let modifiedQuestion = { ...this.state.question };
    modifiedQuestion.answers[index] = currentAnswer;

    await this.updateQuestion(modifiedQuestion);
    this.refreshAnswerList();
  };

  updateQuestion = modifiedQuestion => {
    return fetch(`http://localhost:3000/questions/${this.state.question.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedQuestion),
    });
  };

  downVote = async index => {
    const answers = [...this.state.question.answers];
    const currentAnswer = { ...answers[index] };
    currentAnswer.vote = currentAnswer.vote ? currentAnswer.vote - 1 : -1;

    let modifiedQuestion = { ...this.state.question };
    modifiedQuestion.answers[index] = currentAnswer;

    await this.updateQuestion(modifiedQuestion);
    this.refreshAnswerList();
  };

  refreshAnswerList = async () => {
    const json = await Question.fetchQuestion(this.props.question.id);
    this.setState(prev => {
      return {
        refreshCount: prev.refreshCount + 1,
        question: json,
      };
    });
  };

  renderTags = () => {
    const { question } = this.state;

    if (!question && !question.tags) {
      return null;
    }

    return question.tags.map(tag => (
      <Tag key={tag} closable={false}>
        {tag}
      </Tag>
    ));
  };

  render() {
    const { question } = this.state;
    return (
      <AppLayout>
        <h1 className={'title'}>{question.title}</h1>

        <div
          className={'body'}
          dangerouslySetInnerHTML={{ __html: question.body }}
        />

        {this.renderTags()}

        {question.answers &&
          question.answers.map((a, i) => {
            return (
              <div key={i}>
                <div
                  className={'answer'}
                  dangerouslySetInnerHTML={{ __html: a.answer }}
                />
                <div>Total Vote: {a.vote ? a.vote : 0}</div>
                <div>
                  <button
                    onClick={() => {
                      this.upVote(i);
                    }}
                  >
                    Up
                  </button>
                  <button
                    onClick={() => {
                      this.downVote(i);
                    }}
                  >
                    Down
                  </button>
                </div>
                <div>Date: {a.answerDate}</div>
              </div>
            );
          })}
        <AnswerForm
          question={{ ...question }}
          refreshAnswerList={this.refreshAnswerList}
        />
      </AppLayout>
    );
  }
}
