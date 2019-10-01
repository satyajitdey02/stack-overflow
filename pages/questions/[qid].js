import AppLayout from "./../../components/AppLayout";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Link from "next/link";

export default class Question extends React.Component {

  static async getInitialProps ({query}) {
    const qid = query.qid;  
    const res = await fetch(`http://localhost:3000/questions/${qid}`);
    const json = await res.json();

    return {question:  json};
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {question} = this.props;
    return (
      <AppLayout>
          <h1>{question.title}</h1>
          
          <div dangerouslySetInnerHTML={{__html: question.body}} />
            
          
          <div>
          {question.tags}
          </div>
      </AppLayout>
    );
  }
  
}