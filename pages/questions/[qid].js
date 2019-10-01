import AppLayout from "./../../components/AppLayout";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import AnswerForm from "../../components/AnswerForm";

export default class Question extends React.Component {

  static async getInitialProps ({query}) {

    const json = await this.fetchQuestion(query.qid);

    return {question:  json};
  }

  static async fetchQuestion (qid) {   
    const res = await fetch(`http://localhost:3000/questions/${qid}`);
    return await res.json();
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshCount: 0,
      question: this.props.question
    };

    this.answerForm = React.createRef();
  }

  refreshAnswerList = async () => {
    console.log('Refresh triggering');
    const json = await Question.fetchQuestion(this.props.question.id);
    this.setState((prev)=> {
      return {
        refreshCount: prev.refreshCount + 1,
        question: json,
      };
    });
  }

  render() {
    const {question} = this.state;
    return (
      <AppLayout>
          <h1 className={'title'}>{question.title}</h1>
          
          <div className={'body'} dangerouslySetInnerHTML={{__html: question.body}} />
            
          <div className={'tags'}> {question.tags}</div>
          {question.answers.map((a,i)=> {
            return (<div key={i} className={'answer'} dangerouslySetInnerHTML={{__html: a.answer}} />);
          })}
          <AnswerForm question={{...question}} refreshAnswerList={this.refreshAnswerList}/>
          
      </AppLayout>
    );
  }
  
}