(async function () {
  function setLoggedIn () {
    document.getElementById('register').classList.add('hidden')
    document.getElementById('displayKey').innerText = localStorage.getItem('loggedInSecretKey')
    document.getElementById('loggedIn').classList.remove('hidden')
  }

  if (localStorage.getItem('loggedInSecretKey') !== null) {
    setLoggedIn()
  }

  document.getElementById('register').onclick = async () => {
    const key = await window.crypto.subtle.generateKey({
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt'])
    const rawKey = await window.crypto.subtle.exportKey('raw', key)
    const encodedKey = bufferToBase64(rawKey)
    localStorage.setItem('loggedInSecretKey', encodedKey)
    setLoggedIn()
  }
})();