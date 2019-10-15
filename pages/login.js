import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AppLayout from '../components/AppLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withAuthContext from '../components/hoc/withAuthContext';
import Router from 'next/router';
import { setCookie } from '../utils/cookieUtils';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = await this.authenticate(values);
        this.setState({ submitting: false });
        if (user.length) {
          this.saveUser(user[0]);
          Router.push('/');
        }
      }
    });
  };

  saveUser = user => {
    const detailsToSave = JSON.stringify({
      name: user.name,
      email: user.email,
      id: user.id,
    });
    setCookie('appUser', detailsToSave, 7);
    this.props.onLogin(detailsToSave);
  };

  authenticate = async values => {
    const { email, password } = values;
    const res = await fetch(
      `http://localhost:3000/users/?email=${email}&password=${password}`
    );
    return await res.json();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.state;

    return (
      <AppLayout>
        <Form
          wrapperCol={{ lg: { span: 6, offset: 9 } }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                size="large"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                size="large"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
              disabled={submitting}
            >
              Log in
            </Button>
            {submitting && <FontAwesomeIcon icon="spinner" spin />}
          </Form.Item>
        </Form>
      </AppLayout>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default withAuthContext(WrappedNormalLoginForm);
