const { exec } = require('child_process');
const platform = process.platform;
const blacklistedDomains = ['cipher-panel.me', 'ciphercheats.com', 'keyx.club', 'dark-utilities.xyz']

const logError = (type, error) => {
    console.log(`WHOOPS! Something went wrong while ${type}: ${error}`);
}

const getPlatformCommand = async(url) => {
    if (platform === 'win32') return `echo 127.0.0.1 ${url} >> %windir%\\system32\\drivers\\etc\\hosts`
    return `
        DIRECTORY="/etc/hosts"
        echo -e "127.0.0.1\\t${url}" >> $DIRECTORY
    `
}

const blockDomains = async() => {
    blacklistedDomains.forEach(async domain => {
        const command = await getPlatformCommand(domain);
        exec(command, (err, stdout, stderr) => {
            if (err) return logError(`blocking domain: ${domain}.`, err);
            console.log(`Succesfully Blocked domain ${domain}`);
        });
    });
    console.log(`Sucessfully Blocked ${blacklistedDomains.length} Cypher domains`);
}

RegisterCommand('blockCipher', async() => {
    try {
        await blockDomains();
        console.log(`Finished blocking process. Consider cleaning your server using the command 'cleanCipher'`);
    } catch(e) {
        logError('blocking Cypher', e)
    }
});

(async() => { // A commit with Cipher detection will be uploaded soon.

})();