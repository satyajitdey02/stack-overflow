import { Input } from "antd";
import Router from 'next/router';

const { Search } = Input;

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  doSearch = (value) => {
    Router.push({
      pathname: '/search',
      query: {q: value}
    });
  }

  render() {
    return (
      <Search
        size="large"
        placeholder="input search text"
        onSearch={this.doSearch}
        enterButton
      />
    );
  }
}
