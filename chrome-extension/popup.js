window.onload = function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        
    })
    var popupUsername = document.getElementById("popupUsername");
    var popupPassword = document.getElementById("popupPassword");

    var username = document.getElementById("username");
    var password = document.getElementById("password");
}




// const password = '123456'
// const username = 'tkong'
// const KEY_ID = 'key'
// const USERNAME_ID = 'username'

// var salt = crypto.getRandomValues(new Uint8Array(8));
// const password_buf = str2ab(password)
// // console.log(password_buf)

// // const website = 'www.wesleyan.edu'

// // convert ArrayBuffer to String
// function ab2str(buf) {
//     return String.fromCharCode.apply(null, new Uint16Array(buf));
// }

// // convert String to ArrayBuffer
// function str2ab(str) {
//     var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
//     var bufView = new Uint16Array(buf);
//     for (var i=0, strLen=str.length; i < strLen; i++) {
//         bufView[i] = str.charCodeAt(i);
//     }
//     return buf;
// }

// function store (key, value) {
//     chrome.storage.sync.set({[key] : value}, function () {
//         console.log('value is set to ' + value)
//     })
// }

// function load (key) {
//     chrome.storage.sync.get(key, function (result) {
//         console.log(result)
//     })
// }

// chrome.storage.local.set({"key": "value"}, function() {
//     console.log('Value is set to ' + "value");
//   });

// // localStorage.setItem("password", "1234")
// // chrome.storage.local.set({ "password": 1234}, function () {
// //     console.log('value is set to ' + 1234)
// // })

//   // generateKey, use .then((key) => {}) where key is a keypair object consists of publicKey and privateKey

// // window.crypto.subtle.generateKey(
// //     {
// //         name: "RSA-OAEP",
// //         modulusLength: 2048, //can be 1024, 2048, or 4096
// //         publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
// //         hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
// //     },
// //     true, //whether the key is extractable (i.e. can be used in exportKey)
// //     ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
// // )
  

// // console.log(password)


// // // generate key
// // generateKey.then(function(key) { //returns a keypair object
// //     console.log(key)
// //       //   chrome.storage.sync.set({KEY_ID: key}, function() {
// //       //   console.log(key);
// //       // });
// // }).catch(function(err){
// //     console.error(err);
// // });

// // .then((key)=>{
// //     //returns a keypair object
// //     // localStorage.setItem("key", key);

// //     storeKey(key.publicKey, key.privateKey);
// //       //   chrome.storage.sync.set({KEY_ID: key}, function() {
// //       //   console.log(key);
// //       // });
   
// //     // console.log(key);
// //     // console.log(key.publicKey);
// //     // console.log(key.privateKey);
// // })
// // .catch(function(err){
// //     console.error(err);
// // });

// // function storeKey(publicKey, privateKey) {

// //   // store publicKey
// //   window.crypto.subtle.exportKey(
// //       "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
// //       publicKey //can be a publicKey or privateKey, as long as extractable was true
// //   )
// //   .then(function(publicKey){
// //       //returns the exported key data
      
// //   })
// //   .catch(function(err){
// //       console.error(err);
// //   });

// //   //store privateKey
// //     window.crypto.subtle.exportKey(
// //       "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
// //       key //can be a publicKey or privateKey, as long as extractable was true
// //   )
// //   .then(function(keydata){
// //       //returns the exported key data
// //       console.log(keydata);
// //   })
// //   .catch(function(err){
// //       console.error(err);
// //   });
// // }
// // // exportKey


// // // storeKey
// // function storeKey(keyName, aesKey) {
// //     var exportPromise = crypto.subtle.exportKey('raw', aesKey);
// //     exportPromise.then(function (aesKey_RAW) {
// //         localStorage.setItem();
// //         console.log("saved.");
// //     });
// // }

// // chrome.storage.sync.get(KEY_ID, handleEncrypt);

// // function handleEncrypt(key) {
// //   console.log(key)
// //   // console.log(key.key.publicKey)

// //   // // encryption
// //   //  window.crypto.subtle.encrypt(
// //   //         {
// //   //             name: "RSA-OAEP",
// //   //             //label: Uint8Array([...]) //optional
// //   //         },
// //   //         key.key.publicKey,
// //   //         // localStorage.getItem("key").publicKey, //from generateKey or importKey above
// //   //         password_buf //ArrayBuffer of data you want to encrypt
// //   //     )
// //   //     .then(function(encrypted){
// //   //         //returns an ArrayBuffer containing the encrypted data
// //   //         var encrypted_password = ab2str(new Uint8Array(encrypted));
// //   //         console.log('This is encrypted password: ' + encrypted_password);

// //   //         //store to local storage
// //   //         chrome.storage.sync.set({username: encrypted}, function() {
// //   //         // console.log('Value is set to ' + encrypted);
// //   //       });
          
// //   //         // localStorage.setItem(username, encrypted_password);
// //   //     })
// //   //     .catch(function(err){
// //   //         console.error(err);
// //   //     });
// // }



// // // window.crypto.subtle.decrypt(
// // //     {
// // //         name: "RSA-OAEP",
// // //         //label: Uint8Array([...]) //optional
// // //     },
// // //     localStorage.getItem("key").privateKey, //from generateKey or importKey above
// // //     str2ab(localStorage.getItem(username)) //ArrayBuffer of the data
// // // )
// // // .then(function(decrypted){
// // //     //returns an ArrayBuffer containing the decrypted data
// // //     // console.log(new Uint8Array(decrypted));
// // //     console.log('This is decrypted password: ' + ab2str(decrypted));
// // // })
// // // .catch(function(err){
// // //     console.error(err);
// // // });