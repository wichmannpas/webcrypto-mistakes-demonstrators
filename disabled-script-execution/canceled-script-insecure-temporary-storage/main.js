(async function () {
  const key = await crypto.subtle.generateKey({
    name: 'AES-GCM',
    length: 256
  }, true, ['encrypt', 'decrypt'])

  const encoder = new TextEncoder();

  /**
   * Encrypt the value that is provided as `value` in localStorage, clearing that
   * item afterwards.
   *
   * @returns {Promise<Uint8Array>}
   */
  async function encrypt () {
    const encodedValue = encoder.encode(localStorage.getItem('value'));
    /*
     * if the script execution is canceled before the clearing of `value` from localStorage
     * at the end of this operation, the plaintext value remains in the localStorage.
     *
     * Instead, the value should be passed as a parameter to this function.
     */
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const ciphertext = await crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv: iv
    }, key, encodedValue)
    let ciphertextView = new Uint8Array(ciphertext);
    let resultBuffer = new ArrayBuffer(16 + ciphertext.byteLength);
    let result = new Uint8Array(resultBuffer);
    for (let i = 0; i < 16; i++) {
      result[i] = iv[i]
    }
    for (let i = 0; i < ciphertext.byteLength; i++) {
      result[16 + i] = ciphertextView[i]
    }
    localStorage.removeItem('value')
    return result
  }

  async function decrypt () {
    const value = Uint8Array.from(atob(localStorage.getItem('value')), c => c.charCodeAt(0))
    const iv = value.slice(0, 16)
    const ciphertext = value.slice(16)
    localStorage.removeItem('value')
    return await crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: iv
    }, key, ciphertext)
  }

  const input = document.getElementById('input');
  const result = document.getElementById('result');

  async function encryptValue () {
    localStorage.setItem('value', input.value)
    const encryptedValue = await encrypt()
    result.value = btoa(String.fromCharCode(...new Uint8Array(encryptedValue)))
  }

  async function decryptValue () {
    localStorage.setItem('value', input.value)
    const decryptedValue = await decrypt()
    result.value = String.fromCharCode(...new Uint8Array(decryptedValue))
  }

  document.getElementById('encrypt').onclick = event => {
    encryptValue().catch(error => {
      console.warn(error)
      alert('Error encrypting data!')
    })
  }

  document.getElementById('decrypt').onclick = event => {
    decryptValue().catch(error => {
      console.warn(error)
      alert('Error decrypting data!')
    })
  }
})();
