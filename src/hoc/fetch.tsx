import * as React from 'react';
import * as refetch from 'refetch';

const PENDING = 0;
const SUCCESS = 1;
const FAILURE = 2;

export default function (Origin: any) {
  interface Props {
    fetch: {
      url: string;
    };
  }

  interface Data {
    total: number;
    page: number;
    size: number;
    list: {
      id: number;
      name: string;
      birthday: string;
      nationality: string;
    }[];
  }

  interface State {
    data: Data;
    status: number;
    message?: string;
  }

  const defaultData = {
    total: 0,
    page: 0,
    size: 0,
    list: []
  };

  class Fetch extends React.Component<Props, State> {
    isUnmounted: boolean;

    constructor(props) {
      super(props);

      this.state = {
        data: defaultData,
        status: props.fetch ? PENDING : SUCCESS,
      };

      this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
      if (this.props.fetch) {
        this.fetchData();
      }
      this.isUnmounted = false;
    }

    componentWillUnmount() {
      this.isUnmounted = true;
    }

    fetchData() {
      let { fetch } = this.props;

      this.setState({ status: PENDING });
      refetch.get(fetch.url).then((res) => {
        if (this.isUnmounted) {
          return null;
        }
        if (res.data) {
          this.setState({ status: SUCCESS, data: res.data });
        } else {
          this.setState({ status: FAILURE, message: res.error });
        }
      }).catch((e) => {
        if (this.isUnmounted) {
          return null;
        }
        this.setState({ status: FAILURE, message: e.message });
      });
    }

    render() {
      const { status, data } = this.state;

      if (status === SUCCESS) {
        return <Origin {...this.props} data={data} fetchData={this.fetchData} />;
      }

      if (status === PENDING) {
        return (
          <div>
            loading...
          </div>
        );
      }

      if (status === FAILURE) {
        return <div>{this.state.message}</div>;
      }
      return null;
    }
  }

  return Fetch;
}
