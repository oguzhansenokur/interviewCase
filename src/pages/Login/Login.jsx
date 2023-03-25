import React from 'react';
import './style.scss'
import { VisibleChanger } from '../../components';
import {LoginFunc} from '../../utils/utils'

export default function Login() {
  const [isVisiblePassword, setVisiblePassword] = React.useState(false)
  const [username,setUserName] = React.useState('')
  const [password,setPassword] = React.useState('')
  const re = RegExp('(?=.*?[0-9])(?=.*?[A-Za-z]).+')
  const conditionStatement = username.length >=3 && re.test(password)


  return (
    <div className={conditionStatement ? "login button-display" : 'login'}>
      <div className="container">
        <div className="form-group">
          <input value={username} onChange={(e) => {setUserName(e.target.value)}}  placeholder='Username' type='text' className='text'/>
          <div className="password-container">
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type={isVisiblePassword ? 'text' : 'password'} className='text password'/>
            <VisibleChanger isVisiblePassword={isVisiblePassword} setVisiblePassword={setVisiblePassword} />
          </div>
        </div>
        <button onClick={LoginFunc} id="opacity-animation" className={conditionStatement ? "login-button display" : 'login-button '}>Login</button>
      </div>
    </div>
  );
}
