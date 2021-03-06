import { createElement } from 'react'
import { render } from 'react-dom'
import App from './app'

window.onload = () => {
  render(
    createElement(App),
    document.getElementById('root')
  )
}
