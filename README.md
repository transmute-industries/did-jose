## did:jose

Based on [did:key](https://github.com/digitalbazaar/did-method-key-js)

This was created to help understand / support the discussion happening on:

- https://github.com/w3c/did-core/issues/140
- https://github.com/w3c/did-core/issues/128

## Getting Started

```
npm i
npm run test
```

## Example DID Doc

```
{
    "id": "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0",
    "publicKey": [
    {
        "id": "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0#-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8",
        "type": "JoseVerificationKey2020",
        "controller": "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0",
        "publicKeyJwk": {
        "crv": "Ed25519",
        "x": "msCnP-DL0fLXsECibKv0gVedK8EpGbsC4cxcUq0-234",
        "kty": "OKP",
        "kid": "-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8"
        }
    }
    ],
    "proof": {
    "type": "JoseNonLinkedDataSignature2020",
    "created": "2019-12-11T05:41:59.642Z",
    "verificationMethod": "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0#-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8",
    "proofPurpose": "assertionMethod",
    "jws": "eyJhbGciOiJFZERTQSJ9..qXuqlfRrZ8INiPCJ1kpuw0_v0taHKmxjuE4AAnpwnbl0ltiOropc_GxO2mDu3WMxQKkS9N9KGi2EMQfAP5p0Cw"
    }
}
```
