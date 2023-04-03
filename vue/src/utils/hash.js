import CryptoJS from 'crypto-js'

export function file_sha256(content) {
    var wordArray = CryptoJS.lib.WordArray.create(content);
    var hash = CryptoJS.SHA256(wordArray).toString();
    return hash
}

export default {
    file_sha256,
}