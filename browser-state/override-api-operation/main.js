(async function () {
  // mistake: this overrides the generateKey operation and hard-codes specific parameters.
  window.crypto.subtle.originalGenerateKey = window.crypto.subtle.generateKey
  window.crypto.subtle.generateKey = () => {
    return window.crypto.subtle.originalGenerateKey({
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt'])
  }

  // mistake: this overrides the encrypt operation and hard-codes specific parameters and changes the return value.
  window.crypto.subtle.originalEncrypt = window.crypto.subtle.encrypt
  const encoder = new TextEncoder()
  window.crypto.subtle.encrypt = (key, value) => {
    const encodedValue = encoder.encode(value);
    const iv = window.crypto.getRandomValues(new Uint8Array(16))
    return window.crypto.subtle.originalEncrypt({
      name: 'AES-GCM',
      length: 256,
      iv: iv
    }, key, encodedValue)
  }

  document.getElementById('submit').onclick = async () => {
    const key = await window.crypto.subtle.generateKey()
    const value = document.getElementById('creditCardNumber').value
    const encryptedValue = await window.crypto.subtle.encrypt(key, value)
    document.getElementById('dataDisplay').innerText = bufferToBase64(encryptedValue)
  }
})();