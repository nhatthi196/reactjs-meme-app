import AppInput from '../../common/AppInput';
import AppButton from '../../common/AppButton';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actLoginAsync } from '../../store/auth/actions';
import { useNotAuthenticated } from "../../hooks/useNotAuthenticated";

import { validate, checkExistError } from '../../helpers';
import AppForm from '../../common/AppForm';
import AppContainer from '../../common/AppContainer';
import AppRow from '../../common/AppRow';
import AppCol from '../../common/AppCol';

function Login() {
    useNotAuthenticated();

    const dispatch = useDispatch();
    const isEnterData = useRef(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: {
            value: 'dinhnhatthi1996@gmail.com',
            error: ''
        },
        password: {
            value: '123123',
            error: ''
        }
    })
    
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
            handleLogin();
        }
    }

    async function handleLogin() {
        if (loading) {
            return;
        }

        const email = formData.email.value;
        const password = formData.password.value;
        setError('');
        setLoading(true);
        const res = await dispatch(actLoginAsync({
            email,
            password
        }))
        setLoading(false);

        if (!res.ok) {
            setError(res.error);
        } else {
            // TODO: Success
        }
    }

    return (
        <main className="login">
            <div className="spacing" />
            <AppContainer>
                <AppRow>
                    <AppCol className="block-center" col={12} col_sm={6}>
                        <h1 className="form-title text-center">Login</h1>
                        <AppForm onSubmit={handleSubmit}>
                            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                            <AppInput
                                labelText="email"
                                placeholder="Enter email ..."
                                onChange={handleOnChange('email')}
                                value={formData.email.value}
                                errorText={formData.email.error}
                                isShowErrorText
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
                            <div className="d-flex tcl-jc-between tcl-ais-center">
                                <AppButton
                                    isLoading={loading}
                                    isSizeLarge
                                    btnType="primary"
                                >Đăng nhập</AppButton>
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        </AppForm>
                    </AppCol>

                </AppRow>
            </AppContainer>
            <div className="spacing" />
        </main>

    )
}

export default Login

// HOF -> Higher order function
// HOC -> Higher order component
// Closure
// Scope chain
// Pattern Custom Hooks -> Navigation Guard