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
    document.cookie = 'secretKey=' + bufferToBase64(rawKey)

    getCurrentKey()
  }

  async function getCurrentKey () {
    const cookies = document.cookie.split(';')
      .map(value => value.split('='))
      .reduce((result, value) => {
        result[decodeURIComponent(value[0].trim())] = decodeURIComponent(value[1].trim());
        return result;
      }, {})
    try {
      const encodedRawKey = cookies.secretKey
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

  getCurrentKey()
})();