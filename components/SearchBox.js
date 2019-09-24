import { Input } from 'antd';

const { Search } = Input;


export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        );
    }
}