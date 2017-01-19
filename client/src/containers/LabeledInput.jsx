import React from 'react';

export class LabeledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  render() {
    const {inputClass, activeClass, showIcon, labelStyle, label, width, ...props} = this.props;
    const currentClass = this.state.focused ? activeClass : inputClass || 'input-ctn-style';
    const dwidth = width || 400;
    const icon = showIcon ? <i className="fa fa-search" /> : null;
    return (
      <div style={{ width: dwidth }}>
        {
          label !== undefined &&
          <span className='input-label' style={labelStyle}>
            {label}
          </span>
        }
        { label !== undefined && <br />}
        <div className={currentClass}>
          <div><input {...props} type='text' className='input-default'
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})} /></div>
        </div>
      </div>
    )
  }
}