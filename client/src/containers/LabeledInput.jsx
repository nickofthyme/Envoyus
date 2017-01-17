import React from 'react';

export class LabeledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }
  render() {
    const {inputStyle, activeStyle, labelStyle, label, width, ...props} = this.props;
    const currentStyle = this.state.focused ? Object.assign(inputStyle || {}, activeStyle) : inputStyle;
    const dwidth = width || 400;
    console.log(this.state.focused)
    return (
      <div style={{
        width: dwidth,
      }}>
        <span style={{
          fontSize: 14,
          color: '#666',
          ...labelStyle
        }}>
          {label}
        </span>
        <br/>
        <div style={{
          ...currentStyle
        }}>
          <input {...props} type='text' style={{
              border: 0,
              fontSize: 18,
              color: '#666',
              outline: 'none',
              paddingLeft: 0,
              paddingRight: 0,
              width: '100%',
            }}
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})} />
        </div>
      </div>
    )
  }
}