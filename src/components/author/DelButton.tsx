import * as React from 'react';
import { Modal } from 'antd';

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
    this.handleClick = this.handleClick.bind(this);
    this.state = { visible: false };
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
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleClick() {
    // const { data, onSuccess } = this.props;
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <a href="javascript:;" onClick={this.handleClick}>删除</a>
        <Modal
          title="Warning"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确定要删除{data.name}吗</p>
        </Modal>
      </div>
    );
  }
}

export default DelButton;
