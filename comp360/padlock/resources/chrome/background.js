chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id: "main",
        bounds: {
            width: 320,
            height: 568
        },
        minWidth: 320,
        minHeight: 400
    });
});