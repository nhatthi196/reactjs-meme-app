import './AppInput.css';
import cls from 'classnames';
import { useState, useEffect } from 'react';

function AppInput({
  labelText,
  placeholder,
  onChange,
  value,
  type = 'text',
  errorText,
  isShowErrorText
}) {
  const [localType, setLocalType] = useState(type);
  const [localValue, setLocalValue] = useState('');
  useEffect(() => {
    setLocalType(type);
  }, [type])
  
  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value])

  function localOnChange(evt) {
    onChange && onChange(evt);
    setLocalValue(evt.target.value);
  }

  function handleChangeType() {
    if (localType === 'password') {
      setLocalType('text');
    } else {
      setLocalType('password');
    }
  }

  return (
    <div className={cls('form-control', {
      'form-control__has-error': errorText,
      'form-control__show-error': isShowErrorText && errorText,
    })}>
      { labelText && <label htmlFor="">{labelText}</label> }
      { 
        type === 'password' && 
        <i 
          className={cls('toggle-password', {
            'ion-eye': localType === 'password',
            'ion-eye-disabled': localType !== 'password',
          })} 
          onClick={handleChangeType}></i> 
      }
      <input 
        type={localType}
        value={localValue}
        onChange={localOnChange}
        placeholder={placeholder}
        autoCorrect="off"
        autoComplete="off"
      />
      {
        isShowErrorText && errorText &&
        <span className="error-text">{errorText}</span>
      }
    </div>
  )
}

// AppInput.defaultProps = {
//   type: 'text'
// }

export default AppInput;