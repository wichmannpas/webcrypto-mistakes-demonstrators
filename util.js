(function () {
  function bufferToBase64 (value) {
    let binary = '';
    let bytes = new Uint8Array(value);
    for (let i = 0; i < value.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  window.bufferToBase64 = bufferToBase64

  function bufferFromBase64 (value) {
    const decodedValue = window.atob(value)
    const buffer = new ArrayBuffer(decodedValue.length)
    const arr = new Uint8Array(buffer)
    for (let i = 0; i < decodedValue.length; i++) {
      arr[i] = decodedValue.charCodeAt(i)
    }
    return arr
  }

  window.bufferFromBase64 = bufferFromBase64

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function encryptAESGCM256 (key, value) {
    const encodedValue = encoder.encode(value);
    const iv = window.crypto.getRandomValues(new Uint8Array(16))
    const ciphertext = await crypto.subtle.encrypt({
      name: 'AES-GCM',
      length: 256,
      iv: iv
    }, key, encodedValue)
    const ct = new Uint8Array(ciphertext)
    const result = new Uint8Array(iv.byteLength + ciphertext.byteLength)
    for (let i = 0; i < iv.byteLength; i++) {
      result[i] = iv[i]
    }
    for (let i = 0; i < ciphertext.byteLength; i++) {
      result[iv.byteLength + i] = ct[i]
    }
    return result.buffer
  }

  window.encryptAESGCM256 = encryptAESGCM256

  async function decryptAESGCM256 (key, value) {
    const iv = new Uint8Array(16)
    const ciphertext = new Uint8Array(value.byteLength - 16)
    for (let i = 0; i < 16; i++) {
      iv[i] = value[i]
    }
    for (let i = 0; i < ciphertext.byteLength; i++) {
      ciphertext[i] = value[16 + i]
    }
    return decoder.decode(await crypto.subtle.decrypt({
      name: 'AES-GCM',
      length: 256,
      iv: iv
    }, key, ciphertext))
  }

  window.decryptAESGCM256 = decryptAESGCM256
})();
