import { Input } from "antd";
import Router, { withRouter } from 'next/router';

const { Search } = Input;

class SearchBox extends React.Component {
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

    const {pathname, query} =  this.props.router;
    const value = pathname === '/search' ? query.q : '';

    return (
      <Search
       defaultValue={value}
        size="large"
        placeholder="input search text"
        onSearch={this.doSearch}
        enterButton
      />
    );
  }
}

export default withRouter(SearchBox);
