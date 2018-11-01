const password = '123456'
// const username = 'tkong'
// const website = 'www.wesleyan.edu'

console.log(password)
// console.log(username)
// console.log(website)

var password_buf = str2ab(password)

// convert ArrayBuffer to String
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// convert String to ArrayBuffer
function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// generate key
window.crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        modulusLength: 2048, //can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
)
.then(function(key){
    //returns a keypair object
		    // encryption
		window.crypto.subtle.encrypt(
		    {
		        name: "RSA-OAEP",
		        //label: Uint8Array([...]) //optional
		    },
		    key.publicKey, //from generateKey or importKey above
		    password_buf //ArrayBuffer of data you want to encrypt
		)
		.then(function(encrypted){
		    //returns an ArrayBuffer containing the encrypted data
		    console.log(ab2str(new Uint8Array(encrypted)));
		})
		.catch(function(err){
		    console.error(err);
		});
    // console.log(key);
    // console.log(key.publicKey);
    // console.log(key.privateKey);
})
.catch(function(err){
    console.error(err);
});