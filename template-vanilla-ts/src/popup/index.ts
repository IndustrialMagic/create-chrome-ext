import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app')!
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  // Create the main element
  const mainElement = document.createElement('main')

  // Create the title element
  const h3Element = document.createElement('h3')
  h3Element.textContent = 'Popup Page'

  // Create the counter element
  const divElement = document.createElement('div')
  divElement.className = 'calc'
  const minusButton = document.createElement('button')
  minusButton.textContent = '-'
  const countLabel = document.createElement('label')
  countLabel.textContent = '0'
  const addButton = document.createElement('button')
  addButton.textContent = '+'
  divElement.appendChild(minusButton)
  divElement.appendChild(countLabel)
  divElement.appendChild(addButton)

  // Create the link element
  const aElement = document.createElement('a')
  aElement.href = link
  aElement.target = '_blank'
  aElement.textContent = 'generated by create-chrome-ext'

  // Append all elements to the main element
  mainElement.appendChild(h3Element)
  mainElement.appendChild(divElement)
  mainElement.appendChild(aElement)

  // Append the main element to the page
  appElement.appendChild(mainElement)

  let count = 0

  // Get the count value from Chrome storage
  chrome.storage.sync.get(['count'], function (result) {
    count = result.count || 0
    countLabel.textContent = `${count}`
  })

  // Decrement the count
  minusButton.addEventListener('click', function () {
    if (count > 0) {
      count--
      countLabel.textContent = `${count}`
      chrome.storage.sync.set({ count })
      chrome.runtime.sendMessage({ type: 'COUNT', count })
    }
  })

  // Increment the count
  addButton.addEventListener('click', function () {
    count++
    countLabel.textContent = `${count}`
    chrome.storage.sync.set({ count })
    chrome.runtime.sendMessage({ type: 'COUNT', count })
  })

  // Listen for messages from the Popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'COUNT') {
      count = request.count || 0
      countLabel.textContent = `${count}`
    }
  })
})
