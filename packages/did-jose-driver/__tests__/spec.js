const didJose = require("../index");

const secp256k1PrivateKeyJwk = {
  crv: "secp256k1",
  x: "Gze9Z4CvUSwkf-CuQTjvj6PM1T39p2hCoqcQ_aUKrCo",
  y: "4DTvFMzowUfvFAr0hLJ1P8ROfUsu7iUXVvX2Q7ypedE",
  d: "RIJpRA5rPLSFGmH6tIuhcqi3qONFHReykqsiyGvjAjg",
  kty: "EC",
  kid: "1L2oIfzc3PtrPVTAiNFjd89fowRdIbemi_-9Qgt5rkY"
};

const ed25519PrivateKeyJwk = {
  crv: "Ed25519",
  x: "msCnP-DL0fLXsECibKv0gVedK8EpGbsC4cxcUq0-234",
  d: "aNRa1bVOHJ9KP82osCE1ulX9zQJrLdlLvdQP7dzg7oE",
  kty: "OKP",
  kid: "-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8"
};

const expectedEd25519DidDocSigned = {
  id:
    "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0",
  publicKey: [
    {
      id:
        "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0#-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8",
      type: "JoseVerificationKey2020",
      controller:
        "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0",
      publicKeyJwk: {
        crv: "Ed25519",
        x: "msCnP-DL0fLXsECibKv0gVedK8EpGbsC4cxcUq0-234",
        kty: "OKP",
        kid: "-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8"
      }
    }
  ],
  proof: {
    type: "JoseNonLinkedDataSignature2020",
    created: "2019-12-11T05:41:59.642Z",
    verificationMethod:
      "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0#-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8",
    proofPurpose: "assertionMethod",
    jws:
      "eyJhbGciOiJFZERTQSJ9..qXuqlfRrZ8INiPCJ1kpuw0_v0taHKmxjuE4AAnpwnbl0ltiOropc_GxO2mDu3WMxQKkS9N9KGi2EMQfAP5p0Cw"
  }
};

describe("did:jose", () => {
  describe("didDocFromDid", () => {
    it("ed25519", () => {
      const { controllerKey, didDoc } = didJose.didDocFromDid(
        "did:jose:eyJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiLXZnWndoOGVSVlN2U3JCOWd0bmNYWktoLS0xaF84SjVySThtNDFMTXR3OCIsImt0eSI6Ik9LUCIsIngiOiJtc0NuUC1ETDBmTFhzRUNpYkt2MGdWZWRLOEVwR2JzQzRjeGNVcTAtMjM0In0"
      );
      expect(didDoc.id).toBeDefined();
      expect(didDoc.id.indexOf("did:jose:")).toBe(0);
      expect(controllerKey.kid).toBe(
        "-vgZwh8eRVSvSrB9gtncXZKh--1h_8J5rI8m41LMtw8"
      );
    });
  });

  describe("createDid", () => {
    it("secp256k1", () => {
      const { controllerKey, didDoc } = didJose.createDid({
        kty: "EC",
        crv: "secp256k1"
      });
      expect(didDoc.id).toBeDefined();
      expect(didDoc.id.indexOf("did:jose:")).toBe(0);
      expect(controllerKey.kid).toBeDefined();
    });
    it("ed25519", () => {
      const { controllerKey, didDoc } = didJose.createDid({
        kty: "OKP",
        crv: "Ed25519"
      });
      expect(didDoc.id).toBeDefined();
      expect(didDoc.id.indexOf("did:jose:")).toBe(0);
      expect(controllerKey.kid).toBeDefined();
    });
  });

  it("getDidFromJwk", () => {
    const { controllerKey, didDoc } = didJose.getDidFromJwk(
      secp256k1PrivateKeyJwk
    );
    expect(controllerKey.kid).toBeDefined();
    expect(didDoc).toEqual({
      id:
        "did:jose:eyJjcnYiOiJzZWNwMjU2azEiLCJraWQiOiIxTDJvSWZ6YzNQdHJQVlRBaU5GamQ4OWZvd1JkSWJlbWlfLTlRZ3Q1cmtZIiwia3R5IjoiRUMiLCJ4IjoiR3plOVo0Q3ZVU3drZi1DdVFUanZqNlBNMVQzOXAyaENvcWNRX2FVS3JDbyIsInkiOiI0RFR2Rk16b3dVZnZGQXIwaExKMVA4Uk9mVXN1N2lVWFZ2WDJRN3lwZWRFIn0",
      publicKey: [
        {
          controller:
            "did:jose:eyJjcnYiOiJzZWNwMjU2azEiLCJraWQiOiIxTDJvSWZ6YzNQdHJQVlRBaU5GamQ4OWZvd1JkSWJlbWlfLTlRZ3Q1cmtZIiwia3R5IjoiRUMiLCJ4IjoiR3plOVo0Q3ZVU3drZi1DdVFUanZqNlBNMVQzOXAyaENvcWNRX2FVS3JDbyIsInkiOiI0RFR2Rk16b3dVZnZGQXIwaExKMVA4Uk9mVXN1N2lVWFZ2WDJRN3lwZWRFIn0",
          id:
            "did:jose:eyJjcnYiOiJzZWNwMjU2azEiLCJraWQiOiIxTDJvSWZ6YzNQdHJQVlRBaU5GamQ4OWZvd1JkSWJlbWlfLTlRZ3Q1cmtZIiwia3R5IjoiRUMiLCJ4IjoiR3plOVo0Q3ZVU3drZi1DdVFUanZqNlBNMVQzOXAyaENvcWNRX2FVS3JDbyIsInkiOiI0RFR2Rk16b3dVZnZGQXIwaExKMVA4Uk9mVXN1N2lVWFZ2WDJRN3lwZWRFIn0#1L2oIfzc3PtrPVTAiNFjd89fowRdIbemi_-9Qgt5rkY",
          publicKeyJwk: {
            crv: "secp256k1",
            kid: "1L2oIfzc3PtrPVTAiNFjd89fowRdIbemi_-9Qgt5rkY",
            kty: "EC",
            x: "Gze9Z4CvUSwkf-CuQTjvj6PM1T39p2hCoqcQ_aUKrCo",
            y: "4DTvFMzowUfvFAr0hLJ1P8ROfUsu7iUXVvX2Q7ypedE"
          },
          type: "JoseVerificationKey2020"
        }
      ]
    });
  });

  it("signJson", () => {
    const { controllerKey, didDoc } = didJose.getDidFromJwk(
      ed25519PrivateKeyJwk
    );
    // backdate for stable test
    didDoc.proof = {
      created: "2019-12-11T05:41:59.642Z"
    };
    const signedDidDoc = didJose.signJson(controllerKey, didDoc);
    expect(signedDidDoc).toEqual(expectedEd25519DidDocSigned);
  });

  it("verifyJson", () => {
    const { didDoc } = didJose.getDidFromJwk(ed25519PrivateKeyJwk);
    const verified = didJose.verifyJson(
      ed25519PrivateKeyJwk,
      expectedEd25519DidDocSigned
    );
    expect(verified.id).toBe(didDoc.id);
  });
});
