import AppLayout from "../components/AppLayout";
import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import buildFAIcons from "../utils/fontAwesome";

buildFAIcons();

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch("http://localhost:3000/questions");
    const json = await res.json();

    return { questions: json };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { questions } = this.props;

    return (
      <AppLayout>
        {questions.map(q => {
          return (
            <div key={q.id}>
              <Link href="/questions/[qid]" as={`/questions/${q.id}`}>
                <a>{q.title}</a>
              </Link>
            </div>
          );
        })}
      </AppLayout>
    );
  }
}
