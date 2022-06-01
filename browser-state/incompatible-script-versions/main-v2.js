(async function () {
  const input = document.getElementById('input');
  const result = document.getElementById('result');

  async function encryptValue () {
    const encryptedValue = await encrypt(2, input.value)
    result.value = btoa(String.fromCharCode(...new Uint8Array(encryptedValue)))
  }

  async function decryptValue () {
    const encodedValue = Uint8Array.from(atob(input.value), c => c.charCodeAt(0))
    const decryptedValue = await decrypt(2, encodedValue)
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
