/* eslint-env browser */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const article = `

**Knowledge Institute: Dyslexia is not caused by poor education**

The idea that poor education is the cause of the problems that dyslexic children have with reading, spelling, and writing is nonsense. This is according to the Dutch Quality Institute for Dyslexia (NKD), which oversees the diagnosis and treatment of dyslexia. The institute calls the reports that link poor education to dyslexia harmful.

“For children who are severely dyslexic, even the highest quality education cannot offer a solution,” says Remco Reij of the NKD.

According to the NKD, children with dyslexia have a neurobiological disorder, where the language area in the brain is structured differently. These children find it difficult to make the connection between letters and sounds.

In the newspaper AD, three professors argue that too many children are unnecessarily diagnosed with dyslexia. Professor Anna Bosman from Radboud University in Nijmegen concludes that dyslexia is caused by poor education. “There is simply not enough practice,” she says.

**'No doubt'**

“There is no doubt among any self-respecting scientist that dyslexia exists,” says Reij from the Quality Institute. He believes that the article lumps dyslexia together with other reading problems.

Many people with dyslexia are responding on social media, expressing their confusion that the condition is being denied. Richard Kerkhof writes in a tweet to NOS: “As a dyslexic person, I find it simplistic. My parents and I have done everything we could, but I still have it. By saying that it doesn’t exist, you are dismissing a lot of people. I don’t need pity or anything, but this is too easy.”
`

const splitTextAtCharIndex = (text, charIndex) => {
  const before = text.slice(0, charIndex)
  let after = text.slice(charIndex, text.length).split(' ')
  let currentWord
  if (after.length && after[0] !== '') {
    currentWord = after.shift()
    after = after.join(' ')
  } else after = text
  return {
    before,
    currentWord,
    after
  }
}

/* create <br /> react nodes for new lines in string */
const renderText = (text) =>
  text.split('\n').map((item, index) =>
      index === 0 ? item : [<br />, item])

const renderHighlight = (before, currentWord, after) => {
  return <p className='App-intro'>
    <span>{renderText(before)}</span>
    <span style={{backgroundColor: 'yellow'}}>{renderText(currentWord + ' ')}</span>
    <span>{renderText(after)}</span>
  </p>
}

class App extends Component {

  constructor (props) {
    super(props)

    const u = new SpeechSynthesisUtterance()
    u.text = article
    u.lang = 'nl-nl'
    u.rate = 1.0

    u.onboundary = (e) => {
      this.setState(splitTextAtCharIndex(u.text, e.charIndex))
    }

    const synth = speechSynthesis
    synth.cancel()

    this.state = {
      u,
      synth,
      before: '',
      currentWord: '',
      after: u.text
    }
  }

  render () {
    const { before, currentWord, after, u, synth } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>dyslexia reader</h2>
        </div>
        <button onClick={() => synth.speak(u)}>
          Start
        </button>
        <button className='Stop' onClick={() => synth.cancel()}>
          Stop
      </button>
        { renderHighlight(before, currentWord, after) }
      </div>
    )
  }
}

export default App
