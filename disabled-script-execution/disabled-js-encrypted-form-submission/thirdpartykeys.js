const thirdPartyKeyPair = await crypto.subtle.generateKey({
  name: 'RSA-OAEP',
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256'
}, true, ['encrypt', 'decrypt'])
console.log(thirdPartyKeyPair.publicKey)
console.log(thirdPartyKeyPair.privateKey)
console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', thirdPartyKeyPair.privateKey)))
console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', thirdPartyKeyPair.publicKey)))

const thirdPartyPrivateKey = {
  alg: 'RSA-OAEP-256',
  d: 'H-xvJDk-VOD17TZsBWuhjrVnKqLvpCh5TgLmJFXu3hc0-Z9qifuJEjxhwaxF8QB14AMM_VkBJl0vTzSsz7zO0PKwvx6eBxOCSdBgInNcJV79uz9dN38T4PlWYMmnHcCMN6806ovpAaR4hbEp4MKy4qJ755Y3YrwsLeWmI5OkdHbVCdAuuUcQmTY_ZFHDaOedTjb7h3Z1NidhOvVnX_xs24inH_eQ4kX2fZijktE-OfMsrgTofAk4b4n7KqZ1GXumv7TWXXm1SIHIStPBvkyCeBdCSF6tbpJurvvlgxfN3KubBdDdsdpCtL7HizUaHVWEA-R3y1MGSupARt_nqnlnIGAucqvPFT_IS-441JDPfRBiCgvKlhyCBTxExXmh11RZCZG9AU4Kq9d-HbZSOx4wPypZv8u7lSH9aLltlxIEwC9ROeYOIkANbxwb_zAny51SkmxRcliaWnh94Axcp7t9hLpsZXJf3UN4MoeyXjJ2iKYRJ6mQ6-aZ0a5yFhbZSb2zmDJKlmBYRtT9B1pA421wpgxIA40352Rk3ktn41ryxFKE2SEgc96bIutDS-SILAviKLINcnFEemZkT-ce3uP1iV8QbdTsRkpxiaqCxM8wUyz0qY5oZYLtkN3quFVNxpXtpnqw8mlX2JUn4CoKT8do0ZnU23VOcf-mKUDKGeLodEU',
  dp: '6R1XA_D6HMLx8zWuM-1I3qxJ1nCaR9EfJodnWJtfc0eKmYWwFD3vD1yvC2PNX_A_-iRqHcnrFUTDZoQFGkM0O0SuYVC4zS6y6EofGwaI_PEOg3F_MXWuGpBvZ-H4CoXC4ACuOX8TrkuQ8NW7rEYLngIVj-ubDXjAzOhFGOaCXJSoL7ZcuEMfhMUpGVHDUro05uJO6HATShPtKPQiTxSvkIRkB194zUXhU4FZFxpheJf7k1lufKw0FFpGgV-lUA2CfSCjHJMeZLKUc3oCR70jvqc52lh-7sDJ9_zq2b_PDiIDfOyl_0uUjPi4f0dF5pZ_4tvSgtbssr9hm5YqWkQ0EQ',
  dq: 's5BpITXeSAMR0uQBeBMOq_dWuqhovZ__3KI_ydcPLFQs-fNuyUmsnYlkjOogBp1q-UpBnmto1hVgEk2l28l_kHJv7i1Shc_qGWGbwsWrwC6yg9DUTvSWznaPOUhS0KER5PbN_PGIfZZymPSO3XMjq0OJ0j35vSPOPRK78mTTnCkOFhfQM8rjLHpUPmra5eegzV28i1-iW6iQ3-h5wXFG8GuZST1wpZStuLwN_rea643oEj4eMt8ZKfdhtioj13VhGWlBNRmzsERdkXhf4lSG3ZqXpviREfptKeQQSKk_o0Y6srjjiR9I3lrTavel0NAw4Ruattnd6xz8U0Nj7t0SbQ',
  e: 'AQAB',
  ext: true,
  key_ops: ['decrypt'],
  kty: 'RSA',
  n: '6AaPZG3jYrHc6fNCWEkbEOt4SwLuoKN1hftnsJ8UW10freelMGiQncfXvk3zQqUIRm99pAN6UW8ykzv9g2kIieiY6FUXaem5OxmirKiaAzZJQU01M0-BQ82sTrNBw77BzWQmxlyZIJswWqvdpRvl6xYhuvT7y_m5I3SLmqN5qF2eaSMxA_9CIUxNove7B37w-fX_yRd_k8p-hOMUSDh3A11W3XfOFZnfHGT9r1YjlESquDAbvHpvQbyQPkdeDp08JFQYe1TwP8vImTLAJo_ZhOPDAYgvZC_1l6bd7kPEgZ4K_8xQl_JGUwAJXlxr1zhk4lhmbZyfCyxLjTFUh70LC5D_yBj02b-bbaUruF7VaSQQboCivVgwCcLVypdHqjC_Z6uXX5l6NVf87DMCaBFFGPiXT4j1RiAUItnFwifLncT2uTK3GNY-tj-V-mWlIwbdrIK2WBMmVT8AHTjUU3EB0SNISUbgS_tqYVqpaTBbk8Wu3wxSSOFVnt3u3tKVueiW4YCyrXZYXdDv6UqdfeNe_E6fTPw8vpg3kvLXeNYzBiIazB63te4PF_cSKsTcpisc6ou238kpJnE-3-INHmukDfC9IcUt-SiyiHOcFryg0m1TulkY6z640_dZz2HlyxCCGCEaGMclmqKLaE7CX56_bl4JalRAUr9SB_w_Cd2BUfk',
  p: '-pWd2fDgLfDPsBWjh5bppQ5hFzA06IAUY3VCNWv2hYWEUipuwkjF14nAaWv3SC2MsNfxf23Y9qCabvMu64KyofKrz8JNLykD9aQxMwyL45-1PpSvwzhUt_C5ZGkS1H1rWURrEJ3M7he2WkEnE0FNG_jTkSc_SmvBAZ3r6tGoVuWVZjZnL934k2suYiHpyAbAFIVh1GTj_mr8Qh0AyT3nOzz8yoDsq9kYZKaqi57SkDbFf27klNrRRtZb0hKjQL4SHejSrGrMq-zBx9QnYF8Lb98u7wvUXJOjH4EJVTLtjLgFPF1DEKJlncRujJzTjLMAiwzjV0bGbm6Z5QZw3m-mmw',
  q: '7QpD2O3bViwWWR0oINwn4r31gvsuQ62GL5hbOroICn7LgeUBG3H_5I6egJizCau1qDjRsA8NnE4fNJ2VbsTPbOfMG6p88rLOfm-iTEMG6LHkj0khV0NXv6IZLv58B3yVfMKZ6P_fkkOXq6Kauemq81zKs4HfKKbMrTjxhBp5OWp-VH54VIqaAuU4h4y1DymwWO6SDwREqRDn4VtPSTpNK7WXDx9kaayLIT99ndQN6xGffdckYQ1bBJJMfULZWEE47pKk2vsgQkrXOLNe90RZu_ZVNtXfHVaC74lUOup1KJdidpj5a5w4tZxS0qDTQRM-FKt2mh7m2gLyVidJ165o-w',
  qi: 'HDYMwO_k6M_sgaHQtF9VTYiuo6CdZIQIE3aVLxzhrhXyo7J8RIGTGmUKqru1jGGJXHBOq9IUS9BHcfUDpAW0qRiaW0ff-BirJmj4xbAlBt_BdJO81isbmu02xygWBtHk2I3WwO_sMk2V23zbIuX3N6eKw3DcxPeDZCXS5g465BrA7nKtR-msTIBuDNCP5KS2wLOlpofrfvqsBizjs1PbCZhlwLqG2q3KOrXHdEoN2cKLoHqTtxJFX_EO8SuklHVx8AiTN8MkW1QT2AonFiYvBy5rxlm7eGh7H17fXXNM_JVPSPNmwSybe5AKS4KyNekrepHP6Cv8V5q183_MY7Xntg'
}
