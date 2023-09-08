const { useState } = React

export function Home() {
  const [isOn, setIsOn] = useState('btn1')
  const activeStyle = {
    backgroundColor: 'blue',
    color: 'white',
    margin: 20,
  }

  const inactiveStyle = {
    backgroundColor: 'grey',
    color: 'black',
  }

  return (
    <section className='home'>
      <h1>Welcome to home page!</h1>
      <button style={isOn === 'btn1' ? activeStyle : inactiveStyle} onClick={() => setIsOn('btn1')}>
        1
      </button>
      <button style={isOn === 'btn2' ? activeStyle : inactiveStyle} onClick={() => setIsOn('btn2')}>
        2
      </button>
      <button style={isOn === 'btn3' ? activeStyle : inactiveStyle} onClick={() => setIsOn('btn3')}>
        3
      </button>
      <button style={isOn === 'btn4' ? activeStyle : inactiveStyle} onClick={() => setIsOn('btn4')}>
        4
      </button>
    </section>
  )
}
