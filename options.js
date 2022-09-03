module.exports = options = (headless, start) => {
    const options = {
        sessionId: 'cr4r',
        headless: headless,
        autoRefresh: true,
        restartOnCrash: start,
        hostNotificationLang: 'ID_ID',
        qrTimeout: 0,
        authTimeout: 60,
        cacheEnabled: true,
        disableSpins: false,
        viewport: {
            width: 1920,
            height: 1200
        },
        blockCrashLogs: false,
        // executablePath: execPath,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    }
    return options
}