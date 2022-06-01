(async function () {
  async function deriveKey () {
    const password = document.getElementById('password').value
    if (password.length < 0) {
      alert('Password too short! Use at least 3 characters.')
      return
    }
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      (new TextEncoder()).encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    )

    return await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        // mistake: this uses a static salt!
        salt: bufferFromBase64('aGk0ZWVwaG9OYWhwaGVlYzRxdXV1YjZvb25naTVnaTYK'),
        iterations: 100000,
        hash: 'SHA-512'
      },
      passwordKey,
      {
        name: 'AES-GCM',
        length: 256
      },
      false,
      ['encrypt', 'decrypt']
    )
  }

  document.getElementById('encrypt').onclick = async () => {
    const key = await deriveKey()
    const value = document.getElementById('message').value
    const result = await encryptAESGCM256(key, value)
    const resultDisplay = document.getElementById('result')
    resultDisplay.classList.remove('hidden')
    resultDisplay.innerText = bufferToBase64(result)
  }

  document.getElementById('decrypt').onclick = async () => {
    const key = await deriveKey()
    let value
    try {
      value = bufferFromBase64(document.getElementById('message').value)
    } catch (e) {
      return
    }
    let result
    try {
      result = await decryptAESGCM256(key, value)
    } catch (e) {
      console.error(e)
      alert('Error! Wrong password?')
      return
    }
    const resultDisplay = document.getElementById('result')
    resultDisplay.classList.remove('hidden')
    resultDisplay.innerText = result
  }
})();