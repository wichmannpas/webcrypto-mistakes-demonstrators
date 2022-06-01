(async function () {
  const thirdPartyPublicKey = await crypto.subtle.importKey('jwk', {
    alg: 'RSA-OAEP-256',
    e: 'AQAB',
    ext: true,
    key_ops: ['encrypt'],
    kty: 'RSA',
    n: '6AaPZG3jYrHc6fNCWEkbEOt4SwLuoKN1hftnsJ8UW10freelMGiQncfXvk3zQqUIRm99pAN6UW8ykzv9g2kIieiY6FUXaem5OxmirKiaAzZJQU01M0-BQ82sTrNBw77BzWQmxlyZIJswWqvdpRvl6xYhuvT7y_m5I3SLmqN5qF2eaSMxA_9CIUxNove7B37w-fX_yRd_k8p-hOMUSDh3A11W3XfOFZnfHGT9r1YjlESquDAbvHpvQbyQPkdeDp08JFQYe1TwP8vImTLAJo_ZhOPDAYgvZC_1l6bd7kPEgZ4K_8xQl_JGUwAJXlxr1zhk4lhmbZyfCyxLjTFUh70LC5D_yBj02b-bbaUruF7VaSQQboCivVgwCcLVypdHqjC_Z6uXX5l6NVf87DMCaBFFGPiXT4j1RiAUItnFwifLncT2uTK3GNY-tj-V-mWlIwbdrIK2WBMmVT8AHTjUU3EB0SNISUbgS_tqYVqpaTBbk8Wu3wxSSOFVnt3u3tKVueiW4YCyrXZYXdDv6UqdfeNe_E6fTPw8vpg3kvLXeNYzBiIazB63te4PF_cSKsTcpisc6ou238kpJnE-3-INHmukDfC9IcUt-SiyiHOcFryg0m1TulkY6z640_dZz2HlyxCCGCEaGMclmqKLaE7CX56_bl4JalRAUr9SB_w_Cd2BUfk'
  }, {
    name: 'RSA-OAEP',
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: 'SHA-256'
  }, true, ['encrypt'])

  const encoder = new TextEncoder();

  async function encryptForThirdParty (value) {
    const encodedValue = encoder.encode(value);
    return await crypto.subtle.encrypt({
      name: 'RSA-OAEP',
    }, thirdPartyPublicKey, encodedValue)
  }

  window.setInterval(async () => {
    console.log('encrypting data for third party.')
    const result = await encryptForThirdParty('DEMO value')
    console.log(result)
  }, 1000)
})();