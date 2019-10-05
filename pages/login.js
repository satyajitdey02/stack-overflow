import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AppLayout from '../components/AppLayout';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = await this.authenticate(values);
        console.log(user.length && user[0].name);
        //this.props.onLogin(user);
      }
    });
  };

  authenticate = async values => {
    const { email, password } = values;
    console.log('email: ', email, ' password: ', password);
    const res = await fetch(
      `http://localhost:3000/users/?email=${email}&password=${password}`
    );
    //console.log('user loaded: ', await res.json());
    return await res.json();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AppLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
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
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
