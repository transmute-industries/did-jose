const jose = require("jose");
const base64url = require("base64url");
JSON.canonicalize = require("canonicalize");

const jwkToDidDoc = jwk => {
  const did = "did:jose:" + base64url.encode(JSON.canonicalize(jwk));
  return {
    id: did,
    publicKey: [
      {
        id: did + "#" + jwk.kid,
        type: "JoseVerificationKey2020",
        controller: did,
        publicKeyJwk: jwk
      }
    ]
  };
};

const createDid = ({ kty, crv } = { kty: "EC", crv: "secp256k1" }) => {
  const jwk = jose.JWK.generateSync(kty, crv);
  return {
    controllerKey: jwk,
    didDoc: jwkToDidDoc(jwk.toJWK(false))
  };
};

const getDidFromJwk = jwk => {
  const importedKey = jose.JWK.importKey(jwk);
  return {
    controllerKey: importedKey,
    didDoc: jwkToDidDoc(importedKey.toJWK(false))
  };
};

const signJson = (privateKeyJwk, payload) => {
  const { didDoc } = getDidFromJwk(privateKeyJwk.toJWK(false));

  payload.proof = {
    type: "JoseNonLinkedDataSignature2020",
    created: new Date().toISOString(),
    verificationMethod: didDoc.publicKey[0].id,
    proofPurpose: "assertionMethod",
    ...(payload.proof || {})
  };

  const flat = jose.JWS.sign.flattened(
    JSON.canonicalize(payload),
    jose.JWK.asKey(privateKeyJwk)
  );

  const jws = `${flat.protected}..${flat.signature}`;
  const signed = { ...payload, proof: { ...payload.proof, jws } };
  return signed;
};

const verifyJson = (publicKeyJwk, payload) => {
  let reconstructedPayload = { ...payload };
  let [encodedHeader, encodedSignature] = reconstructedPayload.proof.jws.split(
    ".."
  );
  delete reconstructedPayload.proof.jws;
  const encodedPayload = base64url.encode(
    JSON.canonicalize(reconstructedPayload)
  );
  const reconstructedJWS = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  const verified = jose.JWS.verify(
    reconstructedJWS,
    jose.JWK.asKey(publicKeyJwk)
  );
  return verified;
};

const didDocFromDid = did => {
  const [_did, method, encodedJwk] = did.split(":");
  // TODO: test did and method for conformance to spec
  const decoded = base64url.decode(encodedJwk);
  const parsed = JSON.parse(decoded);
  return getDidFromJwk(parsed);
};

module.exports = {
  didDocFromDid,
  createDid,
  getDidFromJwk,
  signJson,
  verifyJson
};
