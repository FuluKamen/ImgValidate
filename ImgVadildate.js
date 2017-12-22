import React, { Component } from 'react'
import { Button ,Input  } from 'antd';
import GUID from '../helper/guid'
import '../less/imgvalidata.less'

export default class ImgValidate extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || '';
    this.state = {
      verifycodeUrl:'',
      postId:'',
      value: value,
    };
  }
   componentWillMount() {
    this.verifycodeChange();
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { value } = nextProps;
    if (props.value !== value) {
      this.setState({
         value,
      });
    }
  }
  handleChange = (e,callback) => {
    const value = e.target.value.trim();
    this.setState({ value });
    if (callback) {
      callback( e.target.value.trim())
    }
    this.triggerChange(value);
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
   verifycodeChange = () => {
    const guid = new GUID();
    const postId = guid.newGUID();
    const codeurl = this.props.url
    this.setState({ postId ,verifycodeUrl: `${unescape(codeurl)}?PostId=${postId}&aa=${Date.parse(new Date())}}`});
  }
  render() {
    const { placeholder } = this.props;
    return (
       <div className='imgvalidate'>
         <Input
            value={this.state.value}
            onChange={(e) => { this.handleChange(e, this.props.onChange)}}
            {...this.props}
            addonBefore={
              <div className="lable" style={{'width':'80px'}}>验证码</div>
            }
             addonAfter={
               <img className='img' style={{ cursor: 'pointer' }} src={this.state.verifycodeUrl} title="点击刷新验证码" onClick={this.verifycodeChange} />
            }
            style={{ width: '100%' }}
          />
       </div>
    );
  }
}
