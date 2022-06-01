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

    document.getElementById('secretKeyInput').value = bufferToBase64(rawKey)
    document.getElementById('form').submit()
  }
})();