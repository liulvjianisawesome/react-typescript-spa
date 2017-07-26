import * as React from 'react';
import { Card, Form, Input, DatePicker, Button, message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment';

interface Author {
  name: string;
  birthday: string;
  nationality: string;
}
interface Props extends RouteComponentProps<string> {
  form: any;
  data: Author;
}

class Edit extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handelCancel = this.handelCancel.bind(this);
  }

  handleSubmit() {
    message.info(this.props.form.getFieldsValue().birthday.format('YYYY-MM-DD'));
  }

  handelCancel() {
    this.props.history.goBack();
  }

  componentDidMount() {
    const data = this.props.data;
    this.props.form.setFieldsValue({
      name: data.name,
      birthday: moment(data.birthday),
      nationality: data.nationality
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: 1 },
        sm: { span: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
    };

    return (
      <Card title="作者编辑">
        <div style={{ padding: 20 }}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="姓名" {...formItemLayout} style={{ fontSize: 20 }}>
              {getFieldDecorator('name', { rules: [{ required: true }] })(<Input />)}
            </Form.Item>
            <Form.Item label="生日" {...formItemLayout} style={{ fontSize: 20 }}>
              {getFieldDecorator('birthday', { rules: [{ required: true }] })(<DatePicker />)}
            </Form.Item>
            <Form.Item label="国籍" {...formItemLayout} style={{ fontSize: 20 }}>
              {getFieldDecorator('nationality', { rules: [{ required: true }] })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 130 }}>提交</Button>
              <Button onClick={this.handelCancel} style={{ marginLeft: 10 }}>取消</Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }
}

interface FormProps extends RouteComponentProps<string> {
  data: Author;
}

export default Form.create<FormProps>()(Edit);