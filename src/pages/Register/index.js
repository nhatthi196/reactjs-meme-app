import AppInput from '../../common/AppInput';
import AppButton from '../../common/AppButton';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotAuthenticated } from "../../hooks/useNotAuthenticated";

import { validate, checkExistError } from '../../helpers';
import { actRegisterAsync } from '../../store/auth/actions';
import AppForm from '../../common/AppForm';
import AppCol from '../../common/AppCol';
import AppRow from '../../common/AppRow';
import AppContainer from '../../common/AppContainer';

function Register() {
  useNotAuthenticated();

  const dispatch = useDispatch();
  const isEnterData = useRef(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: {
      value: 'dinhnhatthi1996@gmail.com',
      error: '',
    },
    password: {
      value: '123123',
      error: ''
    },
    repassword: {
      value: '',
      error: ''
    }
  })
   //useNotAuthenticated();

  function handleOnChange(key) {
    return (evt) => {
      isEnterData.current = true;
      const value = evt.target.value;
      setFormData({
        ...formData,
        [key]: {
          value,
          error: validate(key, value)
        }
      })
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isEnterData.current === false) {
      Object.keys(formData).forEach(key => {
        setFormData((prevData) => ({
          ...prevData,
          [key]: {
            value: prevData[key].value,
            error: validate(key, prevData[key].value)
          }
        }))
      })
    }
    if (!checkExistError(formData)) {
      handleRegister();
    }
  }

  async function handleRegister() {
    if (loading) {
      return;
    }

    const email = formData.email.value;
    const password = formData.password.value;
    const repassword = formData.nickname.value;
    setError('');
    setLoading(true);
    const res = await dispatch(actRegisterAsync({
      email,
      password,
      repassword
    }))
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
    }
  }

  return (
    <main className="login">
      <div className="spacing" />
      <AppContainer>
        <AppRow>
          <AppCol className="block-center" col={12} col_sm={6}>
            <h1 className="form-title text-center">Đăng ký</h1>
            <AppForm onSubmit={handleSubmit}>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              <AppInput
                // type="email"
                labelText="Email"
                placeholder="Enter your email ..."
                onChange={handleOnChange('email')}
                value={formData.email.value}
                errorText={formData.email.error}
              />
              <AppInput
                type="password"
                labelText="Mật khẩu"
                placeholder="Enter Password ..."
                onChange={handleOnChange('password')}
                value={formData.password.value}
                errorText={formData.password.error}
                isShowErrorText
              />
              <AppInput
                type="password"
                labelText="Nhập lại mật khẩu"
                placeholder="Enter Re-Password ..."
                onChange={handleOnChange('repassword')}
                value={formData.repassword.value}
                errorText={formData.repassword.error}
                isShowErrorText
              />
              <div className="d-flex tcl-jc-between tcl-ais-center">
                <AppButton
                  isLoading={loading}
                  isSizeLarge
                  btnType="primary"
                >Đăng ký</AppButton>
                <Link to="/login">Đã có tài khoản?</Link>
              </div>
            </AppForm>
          </AppCol>
        </AppRow>
      </AppContainer>
      <div className="spacing" />
    </main>

  )
}

export default Register;