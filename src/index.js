import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'

import { generateUsers } from './data'
import './index.css'

const App = () => {
  const virtuoso = React.useRef(null);
  const height = React.useRef(window.innerHeight);

  const [text, setText] = React.useState("")
  const [messages, setMessages] = React.useState([
    {
    name: 'aaron',
    message: 'hello world'
  },
  {
    name: 'aaron',
    message: 'hello world'
  },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
  // {
  //   name: 'aaron',
  //   message: 'hello world'
  // },
])
  // const [firstItemIndex, setFirstItemIndex] = React.useState(messages.length - 1)
  // const [users, setUsers] = React.useState(() => generateUsers(INITIAL_ITEM_COUNT, START_INDEX))

  // const prependItems = React.useCallback(() => {
  //   const usersToPrepend = 20
  //   const nextFirstItemIndex = firstItemIndex - usersToPrepend

  //   setTimeout(() => {
  //     setFirstItemIndex(() => nextFirstItemIndex)
  //     setUsers(() => [...generateUsers(usersToPrepend, nextFirstItemIndex), ...users])
  //   }, 500)

  //   return false
  // }, [firstItemIndex, users, setUsers])

  const handleOnChange = React.useCallback((t) => {
    setText(t.target.value);
  }, [])

  const handleKeyDown = React.useCallback((e) => {
    console.log(e.key)
  }, [])

  const handleOnFocus = React.useCallback(() => {
    setTimeout(() => {
      virtuoso.current.scrollToIndex({
        index: messages.length - 1,
        align: 'center',
        behavior: 'smooth'
      })
    }, 400);
  }, [messages.length])

  const handleOnBlur = React.useCallback(() => {
    if (!text) {
      return;
    }

    setMessages(prev => [...prev, {
      name: Math.floor(Math.random() * 10) % 2 === 0 ? 'aaron' : 'allan',
      message: text,
    }])

    setText("");

    setTimeout(() => {
      virtuoso.current.scrollToIndex({
        index: messages.length - 1,
        align: 'center',
        behavior: 'smooth'
      })
    }, 0);
  }, [messages.length, text])

  return (
    <div style={{height: '100%', position: 'fixed', width: '100%'}}>
      <Virtuoso
        ref={virtuoso}
        style={{ height: height.current - 100, width: '100%', top: 0 }}
        // firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={messages.length - 1}
        data={messages}
        // startReached={prependItems}
        itemContent={(index, user) => {
          console.log({user})
          return (
            <div style={{ 
              display: 'flex',
              borderBottom: 'solid 1px #ccc',
              // alignItems: user?.name === 'aaron' ? 'flex-start' : 'flex-end',  
              flexDirection: user?.name === 'aaron' ? 'row-reverse' : 'row',  
              padding: '0.5rem' }}>
              <div>
                <h4 style={{ textAlign: user?.name === 'aaron' ? 'right' : 'left'}}>
                {user?.name}
              </h4>
              <span style={{ marginTop: '1rem' }}>{user?.message}</span>
              </div>
            </div>
          )
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, width: '100%'}}>
        <input type="text" style={{width: '100%', height: '50px'}} value={text} onChange={handleOnChange} onBlur={handleOnBlur} onKeyDownCapture={handleKeyDown} onFocus={handleOnFocus}/>
        <span style={{ position: 'absolute', right: 10, bottom: 20}} onClick={handleOnBlur}>submit</span>
      </div>  
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))