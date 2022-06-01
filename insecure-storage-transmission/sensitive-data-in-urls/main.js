(async function () {
  document.getElementById('generateKey').onclick = async () => {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    )

    const rawKey = await window.crypto.subtle.exportKey('raw', key)
    window.location.hash = bufferToBase64(rawKey)
  }

  async function getCurrentKey () {
    try {
      const encodedRawKey = window.location.hash.substr(1)
      const rawKey = bufferFromBase64(encodedRawKey)
      const key = await window.crypto.subtle.importKey(
        'raw',
        rawKey,
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt'])
      document.getElementById('displayKey').innerText = key.algorithm.name + ': ' + encodedRawKey
    } catch (e) {
      console.error(e)
    }
  }
  window.onhashchange = getCurrentKey
  getCurrentKey()
})();