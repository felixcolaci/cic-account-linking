var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// functions/verify-session/verify-session.ts
__export(exports, {
  handler: () => handler
});

// node_modules/jose/dist/node/esm/runtime/base64url.js
var import_buffer = __toModule(require("buffer"));

// node_modules/jose/dist/node/esm/runtime/digest.js
var import_crypto = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  buffers.forEach((buffer) => {
    buf.set(buffer, i);
    i += buffer.length;
  });
  return buf;
}

// node_modules/jose/dist/node/esm/runtime/base64url.js
var encode;
function normalize(input) {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  return encoded;
}
if (import_buffer.Buffer.isEncoding("base64url")) {
  encode = (input) => import_buffer.Buffer.from(input).toString("base64url");
} else {
  encode = (input) => import_buffer.Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var decode = (input) => import_buffer.Buffer.from(normalize(input), "base64");

// node_modules/jose/dist/node/esm/runtime/decrypt.js
var import_crypto7 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/util/errors.js
var JOSEError = class extends Error {
  static get code() {
    return "ERR_JOSE_GENERIC";
  }
  constructor(message2) {
    var _a;
    super(message2);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static get code() {
    return "ERR_JWT_CLAIM_VALIDATION_FAILED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JWTExpired = class extends JOSEError {
  static get code() {
    return "ERR_JWT_EXPIRED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
  static get code() {
    return "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_JOSE_NOT_SUPPORTED";
  }
};
var JWSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
  static get code() {
    return "ERR_JWS_INVALID";
  }
};
var JWTInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
  static get code() {
    return "ERR_JWT_INVALID";
  }
};
Symbol.asyncIterator;
var JWSSignatureVerificationFailed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    this.message = "signature verification failed";
  }
  static get code() {
    return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};

// node_modules/jose/dist/node/esm/runtime/random.js
var import_crypto2 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/is_key_object.js
var import_crypto3 = __toModule(require("crypto"));
var util = __toModule(require("util"));
var is_key_object_default = util.types.isKeyObject ? (obj) => util.types.isKeyObject(obj) : (obj) => obj != null && obj instanceof import_crypto3.KeyObject;

// node_modules/jose/dist/node/esm/runtime/timing_safe_equal.js
var import_crypto4 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/cbc_tag.js
var import_crypto5 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/webcrypto.js
var crypto = __toModule(require("crypto"));
var util2 = __toModule(require("util"));
var webcrypto2 = crypto.webcrypto;
var webcrypto_default = webcrypto2;
var isCryptoKey = util2.types.isCryptoKey ? (key) => util2.types.isCryptoKey(key) : (key) => false;

// node_modules/jose/dist/node/esm/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/jose/dist/node/esm/lib/invalid_key_input.js
function message(msg, actual, ...types4) {
  if (types4.length > 2) {
    const last = types4.pop();
    msg += `one of type ${types4.join(", ")}, or ${last}.`;
  } else if (types4.length === 2) {
    msg += `one of type ${types4[0]} or ${types4[1]}.`;
  } else {
    msg += `of type ${types4[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor && actual.constructor.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types4) => {
  return message("Key must be ", actual, ...types4);
};
function withAlg(alg, actual, ...types4) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types4);
}

// node_modules/jose/dist/node/esm/runtime/ciphers.js
var import_crypto6 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/is_key_like.js
var is_key_like_default = (key) => is_key_object_default(key) || isCryptoKey(key);
var types3 = ["KeyObject"];
if (globalThis.CryptoKey || (webcrypto_default === null || webcrypto_default === void 0 ? void 0 : webcrypto_default.CryptoKey)) {
  types3.push("CryptoKey");
}

// node_modules/jose/dist/node/esm/runtime/zlib.js
var import_util = __toModule(require("util"));
var import_zlib = __toModule(require("zlib"));
var inflateRaw = (0, import_util.promisify)(import_zlib.inflateRaw);
var deflateRaw = (0, import_util.promisify)(import_zlib.deflateRaw);

// node_modules/jose/dist/node/esm/lib/is_disjoint.js
var isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/node/esm/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

// node_modules/jose/dist/node/esm/runtime/aeskw.js
var import_buffer2 = __toModule(require("buffer"));
var import_crypto8 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/ecdhes.js
var import_crypto10 = __toModule(require("crypto"));
var import_util2 = __toModule(require("util"));

// node_modules/jose/dist/node/esm/runtime/get_named_curve.js
var import_buffer3 = __toModule(require("buffer"));
var import_crypto9 = __toModule(require("crypto"));
var p256 = import_buffer3.Buffer.from([42, 134, 72, 206, 61, 3, 1, 7]);
var p384 = import_buffer3.Buffer.from([43, 129, 4, 0, 34]);
var p521 = import_buffer3.Buffer.from([43, 129, 4, 0, 35]);
var secp256k1 = import_buffer3.Buffer.from([43, 129, 4, 0, 10]);
var weakMap = new WeakMap();
var namedCurveToJOSE = (namedCurve) => {
  switch (namedCurve) {
    case "prime256v1":
      return "P-256";
    case "secp384r1":
      return "P-384";
    case "secp521r1":
      return "P-521";
    case "secp256k1":
      return "secp256k1";
    default:
      throw new JOSENotSupported("Unsupported key curve for this operation");
  }
};
var getNamedCurve2 = (kee, raw) => {
  var _a;
  let key;
  if (isCryptoKey(kee)) {
    key = import_crypto9.KeyObject.from(kee);
  } else if (is_key_object_default(kee)) {
    key = kee;
  } else {
    throw new TypeError(invalid_key_input_default(kee, ...types3));
  }
  if (key.type === "secret") {
    throw new TypeError('only "private" or "public" type keys can be used for this operation');
  }
  switch (key.asymmetricKeyType) {
    case "ed25519":
    case "ed448":
      return `Ed${key.asymmetricKeyType.slice(2)}`;
    case "x25519":
    case "x448":
      return `X${key.asymmetricKeyType.slice(1)}`;
    case "ec": {
      if (weakMap.has(key)) {
        return weakMap.get(key);
      }
      let namedCurve = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.namedCurve;
      if (!namedCurve && key.type === "private") {
        namedCurve = getNamedCurve2((0, import_crypto9.createPublicKey)(key), true);
      } else if (!namedCurve) {
        const buf = key.export({ format: "der", type: "spki" });
        const i = buf[1] < 128 ? 14 : 15;
        const len = buf[i];
        const curveOid = buf.slice(i + 1, i + 1 + len);
        if (curveOid.equals(p256)) {
          namedCurve = "prime256v1";
        } else if (curveOid.equals(p384)) {
          namedCurve = "secp384r1";
        } else if (curveOid.equals(p521)) {
          namedCurve = "secp521r1";
        } else if (curveOid.equals(secp256k1)) {
          namedCurve = "secp256k1";
        } else {
          throw new JOSENotSupported("Unsupported key curve for this operation");
        }
      }
      if (raw)
        return namedCurve;
      const curve = namedCurveToJOSE(namedCurve);
      weakMap.set(key, curve);
      return curve;
    }
    default:
      throw new TypeError("Invalid asymmetric key type for this operation");
  }
};
var get_named_curve_default = getNamedCurve2;

// node_modules/jose/dist/node/esm/runtime/ecdhes.js
var generateKeyPair = (0, import_util2.promisify)(import_crypto10.generateKeyPair);

// node_modules/jose/dist/node/esm/runtime/pbes2kw.js
var import_util3 = __toModule(require("util"));
var import_crypto11 = __toModule(require("crypto"));
var pbkdf2 = (0, import_util3.promisify)(import_crypto11.pbkdf2);

// node_modules/jose/dist/node/esm/runtime/rsaes.js
var import_crypto12 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/check_modulus_length.js
var weakMap2 = new WeakMap();
var getLength = (buf, index) => {
  let len = buf.readUInt8(1);
  if ((len & 128) === 0) {
    if (index === 0) {
      return len;
    }
    return getLength(buf.subarray(2 + len), index - 1);
  }
  const num = len & 127;
  len = 0;
  for (let i = 0; i < num; i++) {
    len <<= 8;
    const j = buf.readUInt8(2 + i);
    len |= j;
  }
  if (index === 0) {
    return len;
  }
  return getLength(buf.subarray(2 + len), index - 1);
};
var getLengthOfSeqIndex = (sequence, index) => {
  const len = sequence.readUInt8(1);
  if ((len & 128) === 0) {
    return getLength(sequence.subarray(2), index);
  }
  const num = len & 127;
  return getLength(sequence.subarray(2 + num), index);
};
var getModulusLength = (key) => {
  var _a, _b;
  if (weakMap2.has(key)) {
    return weakMap2.get(key);
  }
  const modulusLength = (_b = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.modulusLength) !== null && _b !== void 0 ? _b : getLengthOfSeqIndex(key.export({ format: "der", type: "pkcs1" }), key.type === "private" ? 1 : 0) - 1 << 3;
  weakMap2.set(key, modulusLength);
  return modulusLength;
};
var check_modulus_length_default = (key, alg) => {
  if (getModulusLength(key) < 2048) {
    throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
  }
};

// node_modules/jose/dist/node/esm/runtime/asn1.js
var import_crypto13 = __toModule(require("crypto"));
var import_buffer4 = __toModule(require("buffer"));

// node_modules/jose/dist/node/esm/runtime/jwk_to_key.js
var import_buffer6 = __toModule(require("buffer"));
var import_crypto14 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/runtime/asn1_sequence_encoder.js
var import_buffer5 = __toModule(require("buffer"));
var tagInteger = 2;
var tagBitStr = 3;
var tagOctStr = 4;
var tagSequence = 48;
var bZero = import_buffer5.Buffer.from([0]);
var bTagInteger = import_buffer5.Buffer.from([tagInteger]);
var bTagBitStr = import_buffer5.Buffer.from([tagBitStr]);
var bTagSequence = import_buffer5.Buffer.from([tagSequence]);
var bTagOctStr = import_buffer5.Buffer.from([tagOctStr]);
var oids = new Map([
  ["P-256", import_buffer5.Buffer.from("06 08 2A 86 48 CE 3D 03 01 07".replace(/ /g, ""), "hex")],
  ["secp256k1", import_buffer5.Buffer.from("06 05 2B 81 04 00 0A".replace(/ /g, ""), "hex")],
  ["P-384", import_buffer5.Buffer.from("06 05 2B 81 04 00 22".replace(/ /g, ""), "hex")],
  ["P-521", import_buffer5.Buffer.from("06 05 2B 81 04 00 23".replace(/ /g, ""), "hex")],
  ["ecPublicKey", import_buffer5.Buffer.from("06 07 2A 86 48 CE 3D 02 01".replace(/ /g, ""), "hex")],
  ["X25519", import_buffer5.Buffer.from("06 03 2B 65 6E".replace(/ /g, ""), "hex")],
  ["X448", import_buffer5.Buffer.from("06 03 2B 65 6F".replace(/ /g, ""), "hex")],
  ["Ed25519", import_buffer5.Buffer.from("06 03 2B 65 70".replace(/ /g, ""), "hex")],
  ["Ed448", import_buffer5.Buffer.from("06 03 2B 65 71".replace(/ /g, ""), "hex")]
]);

// node_modules/jose/dist/node/esm/runtime/flags.js
var [major, minor] = process.versions.node.split(".").map((str) => parseInt(str, 10));
var oneShotCallback = major >= 16 || major === 15 && minor >= 13;
var rsaPssParams = !("electron" in process.versions) && (major >= 17 || major === 16 && minor >= 9);
var jwkExport = major >= 16 || major === 15 && minor >= 9;
var jwkImport = major >= 16 || major === 15 && minor >= 12;

// node_modules/jose/dist/node/esm/lib/check_key_type.js
var symmetricTypeCheck = (alg, key) => {
  if (key instanceof Uint8Array)
    return;
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types3, "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${types3.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage) => {
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types3));
  }
  if (key.type === "secret") {
    throw new TypeError(`${types3.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${types3.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${types3.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${types3.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${types3.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
var checkKeyType = (alg, key, usage) => {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};
var check_key_type_default = checkKeyType;

// node_modules/jose/dist/node/esm/runtime/encrypt.js
var import_crypto15 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    } else if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
var validate_crit_default = validateCrit;

// node_modules/jose/dist/node/esm/lib/validate_algorithms.js
var validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/node/esm/runtime/key_to_jwk.js
var import_crypto16 = __toModule(require("crypto"));

// node_modules/jose/dist/node/esm/jwe/flattened/encrypt.js
var unprotected = Symbol();

// node_modules/jose/dist/node/esm/runtime/verify.js
var crypto3 = __toModule(require("crypto"));
var import_util5 = __toModule(require("util"));

// node_modules/jose/dist/node/esm/runtime/dsa_digest.js
function dsaDigest(alg) {
  switch (alg) {
    case "PS256":
    case "RS256":
    case "ES256":
    case "ES256K":
      return "sha256";
    case "PS384":
    case "RS384":
    case "ES384":
      return "sha384";
    case "PS512":
    case "RS512":
    case "ES512":
      return "sha512";
    case "EdDSA":
      return void 0;
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/node/esm/runtime/node_key.js
var import_crypto17 = __toModule(require("crypto"));
var PSS = {
  padding: import_crypto17.constants.RSA_PKCS1_PSS_PADDING,
  saltLength: import_crypto17.constants.RSA_PSS_SALTLEN_DIGEST
};
var ecCurveAlgMap = new Map([
  ["ES256", "P-256"],
  ["ES256K", "secp256k1"],
  ["ES384", "P-384"],
  ["ES512", "P-521"]
]);
function keyForCrypto(alg, key) {
  switch (alg) {
    case "EdDSA":
      if (!["ed25519", "ed448"].includes(key.asymmetricKeyType)) {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448");
      }
      return key;
    case "RS256":
    case "RS384":
    case "RS512":
      if (key.asymmetricKeyType !== "rsa") {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
      }
      check_modulus_length_default(key, alg);
      return key;
    case (rsaPssParams && "PS256"):
    case (rsaPssParams && "PS384"):
    case (rsaPssParams && "PS512"):
      if (key.asymmetricKeyType === "rsa-pss") {
        const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
        const length = parseInt(alg.slice(-3), 10);
        if (hashAlgorithm !== void 0 && (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) {
          throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
        }
        if (saltLength !== void 0 && saltLength > length >> 3) {
          throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
        }
      } else if (key.asymmetricKeyType !== "rsa") {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss");
      }
      check_modulus_length_default(key, alg);
      return __spreadValues({ key }, PSS);
    case (!rsaPssParams && "PS256"):
    case (!rsaPssParams && "PS384"):
    case (!rsaPssParams && "PS512"):
      if (key.asymmetricKeyType !== "rsa") {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
      }
      check_modulus_length_default(key, alg);
      return __spreadValues({ key }, PSS);
    case "ES256":
    case "ES256K":
    case "ES384":
    case "ES512": {
      if (key.asymmetricKeyType !== "ec") {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ec");
      }
      const actual = get_named_curve_default(key);
      const expected = ecCurveAlgMap.get(alg);
      if (actual !== expected) {
        throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
      }
      return { dsaEncoding: "ieee-p1363", key };
    }
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/node/esm/runtime/sign.js
var crypto2 = __toModule(require("crypto"));
var import_util4 = __toModule(require("util"));

// node_modules/jose/dist/node/esm/runtime/hmac_digest.js
function hmacDigest(alg) {
  switch (alg) {
    case "HS256":
      return "sha256";
    case "HS384":
      return "sha384";
    case "HS512":
      return "sha512";
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/node/esm/runtime/get_sign_verify_key.js
var import_crypto18 = __toModule(require("crypto"));
function getSignVerifyKey(alg, key, usage) {
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types3));
    }
    return (0, import_crypto18.createSecretKey)(key);
  }
  if (key instanceof import_crypto18.KeyObject) {
    return key;
  }
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return import_crypto18.KeyObject.from(key);
  }
  throw new TypeError(invalid_key_input_default(key, ...types3, "Uint8Array"));
}

// node_modules/jose/dist/node/esm/runtime/sign.js
var oneShotSign;
if (crypto2.sign.length > 3) {
  oneShotSign = (0, import_util4.promisify)(crypto2.sign);
} else {
  oneShotSign = crypto2.sign;
}
var sign2 = async (alg, key, data) => {
  const keyObject = getSignVerifyKey(alg, key, "sign");
  if (alg.startsWith("HS")) {
    const hmac = crypto2.createHmac(hmacDigest(alg), keyObject);
    hmac.update(data);
    return hmac.digest();
  }
  return oneShotSign(dsaDigest(alg), data, keyForCrypto(alg, keyObject));
};
var sign_default = sign2;

// node_modules/jose/dist/node/esm/runtime/verify.js
var oneShotVerify;
if (crypto3.verify.length > 4 && oneShotCallback) {
  oneShotVerify = (0, import_util5.promisify)(crypto3.verify);
} else {
  oneShotVerify = crypto3.verify;
}
var verify2 = async (alg, key, signature, data) => {
  const keyObject = getSignVerifyKey(alg, key, "verify");
  if (alg.startsWith("HS")) {
    const expected = await sign_default(alg, keyObject, data);
    const actual = signature;
    try {
      return crypto3.timingSafeEqual(actual, expected);
    } catch {
      return false;
    }
  }
  const algorithm = dsaDigest(alg);
  const keyInput = keyForCrypto(alg, keyObject);
  try {
    return await oneShotVerify(algorithm, data, keyInput, signature);
  } catch {
    return false;
  }
};
var verify_default = verify2;

// node_modules/jose/dist/node/esm/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  var _a;
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = __spreadValues(__spreadValues({}, parsedProt), jws.header);
  const extensions = validate_crit_default(JWSInvalid, new Map([["b64", true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  check_key_type_default(alg, key, "verify");
  const data = concat(encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  const signature = decode(jws.signature);
  const verified = await verify_default(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    payload = decode(jws.payload);
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return __spreadProps(__spreadValues({}, result), { key });
  }
  return result;
}

// node_modules/jose/dist/node/esm/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return __spreadProps(__spreadValues({}, result), { key: verified.key });
  }
  return result;
}

// node_modules/jose/dist/node/esm/lib/epoch.js
var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

// node_modules/jose/dist/node/esm/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
var secs_default = (str) => {
  const matched = REGEX.exec(str);
  if (!matched) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[1]);
  const unit = matched[2].toLowerCase();
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      return Math.round(value);
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      return Math.round(value * minute);
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      return Math.round(value * hour);
    case "day":
    case "days":
    case "d":
      return Math.round(value * day);
    case "week":
    case "weeks":
    case "w":
      return Math.round(value * week);
    default:
      return Math.round(value * year);
  }
};

// node_modules/jose/dist/node/esm/lib/jwt_claims_set.js
var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
var jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
  }
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  if (maxTokenAge !== void 0)
    requiredClaims.push("iat");
  if (audience !== void 0)
    requiredClaims.push("aud");
  if (subject !== void 0)
    requiredClaims.push("sub");
  if (issuer !== void 0)
    requiredClaims.push("iss");
  for (const claim of new Set(requiredClaims.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
    }
  }
  return payload;
};

// node_modules/jose/dist/node/esm/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  var _a;
  const verified = await compactVerify(jwt, key, options);
  if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes("b64")) && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return __spreadProps(__spreadValues({}, result), { key: verified.key });
  }
  return result;
}

// node_modules/jose/dist/node/esm/runtime/fetch_jwks.js
var http = __toModule(require("http"));
var https = __toModule(require("https"));
var import_events = __toModule(require("events"));

// node_modules/jose/dist/node/esm/runtime/generate.js
var import_crypto19 = __toModule(require("crypto"));
var import_util6 = __toModule(require("util"));
var generate = (0, import_util6.promisify)(import_crypto19.generateKeyPair);

// functions/verify-session/verify-session.ts
var { TOKEN_SIGNING } = process.env;
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
};
var handleError = (message2, status = 400) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      message: message2,
      status
    }),
    headers: __spreadValues({
      "content-type": "application/json"
    }, corsHeaders)
  };
};
var handleCors = (event) => {
  if (event.httpMethod == "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "Options Callback"
    };
  }
};
var handler = async (event, context) => {
  const corsResponse = handleCors(event);
  if (corsResponse) {
    return corsResponse;
  }
  const { sessionToken } = JSON.parse(event.body);
  if (!sessionToken) {
    return handleError("no token provided");
  }
  try {
    const { payload } = await jwtVerify(sessionToken, Buffer.from(TOKEN_SIGNING || ""), {
      algorithms: ["HS256"]
    });
    return {
      statusCode: 200,
      body: JSON.stringify(payload),
      headers: __spreadValues({
        "content-type": "application/json"
      }, corsHeaders)
    };
  } catch (error) {
    return handleError("the provided token is invalid", 401);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=verify-session.js.map
