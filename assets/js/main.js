if ('serviceWorker' in navigator) {
    return
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceWorker.js')
    })
}