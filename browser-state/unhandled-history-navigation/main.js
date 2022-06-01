(async function () {
  const pathParts = document.location.pathname.split('/')
  const lastPath = pathParts.pop()
  const base_pathname = pathParts.join('/')

  if (lastPath.substr(0, 4) !== 'step') {
    window.location.pathname = base_pathname + '/step1.html'
    return
  }

  const step = lastPath.substr(0, 5)

  document.getElementById(step).classList.remove('hidden')

  if (step === 'step1') {
    document.title = 'Step 1 – ' + document.title
    document.getElementById('step1-submit').onclick = async () => {
      localStorage.setItem('name', document.getElementById('step1-name').value)
      localStorage.setItem('creditCardNumber', document.getElementById('step1-creditCardNumber').value)

      document.getElementById('step1-next').classList.remove('hidden')
      document.getElementById('step1-submit').classList.add('hidden')
    }
  } else if (step === 'step2') {
    document.title = 'Step 2 – ' + document.title
    document.getElementById('step2-dataDisplay').innerText = 'Name: ' + localStorage.getItem(
      'name') + '\nCredit Card Number: ' + localStorage.getItem('creditCardNumber')

    document.getElementById('step2-generateKey').onclick = async () => {
      const key = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      )

      const rawKey = await window.crypto.subtle.exportKey('raw', key)
      localStorage.setItem('secretKey', bufferToBase64(rawKey))

      // developer mistake: storing an unprotected key in a persistent location
      localStorage.setItem('name', bufferToBase64(await encryptAESGCM256(key, localStorage.getItem('name'))))
      localStorage.setItem('creditCardNumber', bufferToBase64(await encryptAESGCM256(key, localStorage.getItem('creditCardNumber'))))

      document.getElementById('step2-next').classList.remove('hidden')
      document.getElementById('step2-generateKey').classList.add('hidden')
    }
  } else if (step === 'step3') {
    document.title = 'Step 3 – ' + document.title

    // developer mistake: using the same (persistent!) storage for unencrypted and encrypted representations
    document.getElementById('step3-name').value = localStorage.getItem('name')
    document.getElementById('step3-creditCardNumber').value = localStorage.getItem('creditCardNumber')

    const rawKey = bufferFromBase64(localStorage.getItem('secretKey'))
    const key = await window.crypto.subtle.importKey(
      'raw',
      rawKey,
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt'])
    document.getElementById('step3-keyDisplay').innerText = key.algorithm.name + ': ' + localStorage.getItem('secretKey')
  }
})();