import * as React from 'react';
import * as H from 'history';
import * as Redux from 'redux';
import { connect, RouteComponentProps } from 'react-redux';
import { Card, Form, Button, Input } from 'antd';
// import { saveGenre } from '../../action/genre';
import { Genre } from '../../action/genre';

interface Props extends RouteComponentProps {
  dispatch: Redux.Dispatch<void>;
  data: Genre;
  form: any;
  history: H.History;
}

class Edit extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit() {
    const data = this.props.form.getFieldsValue();
    this.props.dispatch({ type: 'saveGenre', body: data, onSuccess: this.props.history.goBack });
  }

  handleCancel() {
    this.props.history.goBack();
  }

  componentDidMount() {
    const { data } = this.props;
    this.props.form.setFieldsValue({
      name: data.name,
      desc: data.desc,
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
      <Card title="类型编辑">
        <div style={{ padding: 20 }}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="名称" {...formItemLayout} style={{ fontSize: 20 }}>
              {getFieldDecorator('name', { rules: [{ required: true }] })(<Input />)}
            </Form.Item>
            <Form.Item label="简介" {...formItemLayout} style={{ fontSize: 20 }}>
              {getFieldDecorator('desc', { rules: [{ required: true }] })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 130 }}>提交</Button>
              <Button onClick={this.handleCancel} style={{ marginLeft: 10 }}>取消</Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }
}

interface FormProps extends RouteComponentProps<string> {
  data: Genre;
}

export default connect()(Form.create<FormProps>()(Edit));
