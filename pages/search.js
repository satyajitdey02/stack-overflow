import AppLayout from "../components/AppLayout";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Link from "next/link";

export default class Search extends React.Component {

  static async getInitialProps ({query}) {

    const json = await this.fetchSearchResult(query.q);

    return {searchResults:  json};
  }


  static async fetchSearchResult (q) {   
    const res = await fetch(`http://localhost:3000/questions/?q=${q}`);
    return await res.json();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    const {searchResults} = this.props;

    return (
      <AppLayout>
      {searchResults.map(q=> {
        return (
          <div key={q.id}>
            <p>Vote: {q.vote ? q.vote : 0}</p>
            <p>Answers: {q.answers ? q.answers.length : 0}</p>
            <Link href="/questions/[qid]" as={`/questions/${q.id}`}>
              <a>{q.title}</a>
            </Link>
            <p>Date: {q.postDate}</p>
          </div>
        );
      })}
      </AppLayout>
    );
  }
  
}