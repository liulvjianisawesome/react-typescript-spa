import * as React from 'react';
import { Modal, message } from 'antd';

interface Props {
  data: {
    name: string;
  };
}
interface State {
  visible: boolean;
}

class DelButton extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { visible: false };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.setState({
      visible: false,
    });
    message.success('删除成功');
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { data } = this.props;
    return (
      <span>
        <a href="javascript:;" onClick={this.showModal}>删除</a>
        <Modal
          title="Warning"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确定要删除{data.name}吗</p>
        </Modal>
      </span>
    );
  }
}

export default DelButton;
