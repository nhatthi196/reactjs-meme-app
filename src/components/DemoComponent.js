// import Button from '../common/AppButton/AppButton';
import { useEffect, useState } from 'react';
import Button from '../common/AppButton';
import AppInput from '../common/AppInput';

function DemoComponent() {
  const [loading, setLoading] = useState(true);
  const [, setInputValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setInputValue('Tran Van A');
    }, 5000);
  }, [])

  return (
    <>
      <Button>Btn default</Button>
      <Button btnType="category" >Btn category</Button>
      <Button btnType="primary">Btn category</Button>

      <Button isSizeLarge>Btn default</Button>
      <Button btnType="category" isSizeLarge type="submit">Btn category</Button>
      <Button 
        btnType="primary" 
        isSizeLarge 
        isLoading={loading}
        onClick={() => {
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
        // loadingPosition="after"
      >Btn category</Button>

      <hr></hr>

      <Button 
        htmlType="a" 
        href="#" 
        isSizeLarge 
        title="Hello world"
      >Btn default</Button>
      <Button htmlType="a" href="https://google.com.vn" btnType="category" isSizeLarge>Btn category</Button>

      <hr></hr>

      <div style={{ width: 300 }}>
        <input />
        <AppInput 
          labelText="Username" 
          placeholder="Enter username ..." 
          // value={inputValue}
          // onChange={(evt) => {
          //   setInputValue(evt.target.value);
          // }}
        />
        {/* <AppInput labelText="Password" placeholder="Enter password ..." type="password" /> */}
      </div>
    </>
  )
}

export default DemoComponent;