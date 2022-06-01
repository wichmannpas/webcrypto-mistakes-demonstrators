(async function () {
  const key = await crypto.subtle.generateKey({
    name: 'AES-GCM',
    length: 256
  }, true, ['encrypt', 'decrypt'])

  const encoder = new TextEncoder();

  async function encrypt (apiVersion, value) {
    if (apiVersion !== 2) {
      throw new Error('incompatible API version');
    }
    const encodedValue = encoder.encode(value);
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
    return result
  }

  window.encrypt = encrypt

  async function decrypt (apiVersion, value) {
    if (apiVersion !== 2) {
      throw new Error('incompatible API version');
    }

    const iv = value.slice(0, 16)
    const ciphertext = value.slice(16)
    return await crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: iv
    }, key, ciphertext)
  }

  window.decrypt = decrypt
})();
