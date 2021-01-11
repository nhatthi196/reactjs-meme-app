import { useEffect } from 'react';

function Title() {

  useEffect(() => {
    console.log('title useEffect hiển thị sau lần render đầu tiên');

    return function() {
      console.log('componentWillUnmount')
    }
  }, [])

  return (
    <h1>Hien thi</h1>
  )
}

export default Title;