import React from 'react';
import Placeholder from './user.jpg';

export class Avatar extends React.PureComponent {
  props: {
    url: string
  };
  state = {
    loaded: false
  };
  handleImageLoaded() {
    this.setState({ loaded: true });
  }
  handleImageErrored() {
    this.setState({ loaded: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        loaded: false
      });
    }
  }
  render() {
    let url: string = Placeholder;
    if (this.props.url) {
      url = this.props.url;
      if (url.indexOf('http://') > -1) {
        url = 'https://' + url.slice(5);
      }
    }
    return (
      <div className="p6 flex-parent flex-parent--center-main">
        <span
          style={{
            background: `url(${
              this.state.loaded ? this.props.url : Placeholder
            }) center center / ${this.props.size}px no-repeat`
          }}
          className={`flex-child flex-child--no-shrink border border--2 border--gray h${
            this.props.size
          } w${this.props.size} bg-darken25 clip round-full`}
        />
        <img
          alt=""
          className="none"
          src={this.props.url}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
      </div>
    );
  }
}
