/* eslint-disable no-unused-vars */
const { create, Client } = require('@open-wa/wa-automate')
const figlet = require('figlet')
const canvas = require('discord-canvas')
const fs = require('fs-extra')
const base_dir = process.env.base_botwa

const { color, options } = require('./tools')
const { ind, eng } = require('./message/text/lang/')
const { loader } = require('./function')
const { version, bugs } = require('../package.json')
const msgHandler = require('./message/index')
const { ownerBot } = require('./config.json')

const { groupLimit, memberLimit } = require(base_dir + 'database/bot/setting.json')
const { levelRole } = require('./message/levelRole')

const express = require('express')
const cron = require('node-cron')
const exec = require('await-exec')

const start = (rahman = new Client()) => {
    console.log(color(figlet.textSync('BotRahman', 'Larry 3D'), 'cyan'))
    console.log(color('=> Bot sukses dijalankan! Database:', 'yellow'), color(loader.getAllDirFiles(base_dir + 'database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Function:', 'yellow'), color(loader.getAllDirFiles('./function').length))
    console.log(color('=> Source code version:', 'yellow'), color(version))
    console.log(color('=> Bug? Error? Suggestion? Visit here:', 'yellow'), color(bugs.url))
    console.log(color('[RAHMAN]'), color('BotRahman is now online!', 'yellow'))
    console.log(color('[DEV]', 'cyan'), color('Selamat Datang Kembali, Owner! Hope you are doing well~', 'magenta'))

    // Uncomment code di bawah untuk mengaktifkan auto-update file changes. Tidak disarankan untuk long-time use.
    // Uncomment code below to activate auto-update file changes. Not recommended for long-time use.
    // loader.nocache('../message/index.js', (m) => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))

    rahman.onStateChanged((state) => {
        console.log(color('[RAHMAN]'), state)
        if (state === 'OPENING') return client.refresh().catch(e => {
            console.log("ERROR WHEN REFRESH >>>", e)
            exec('pm2 restart .')
        })
        if (state === 'UNPAIRED' || state === 'CONFLICT' || state === 'UNLAUNCHED') rahman.forceRefocus()
    })

    rahman.onAddedToGroup(async (chat) => {
        const gc = await rahman.getAllGroups()
        console.log(color('[RAHMAN]'), 'Added to a new group. Name:', color(chat.contact.name, 'yellow'), 'Total members:', color(chat.groupMetadata.participants.length, 'yellow'))
        if (chat.groupMetadata.participants.includes(ownerBot)) {
            await rahman.sendText(chat.id, ind.addedGroup(chat))
        } else if (gc.length > groupLimit) {
            await rahman.sendText(chat.id, `Max groups reached!\n\nCurrent status: ${gc.length}/${groupLimit}`)
            await rahman.deleteChat(chat.id)
            await rahman.leaveGroup(chat.id)
        } else if (chat.groupMetadata.participants.length < memberLimit) {
            await rahman.sendText(chat.id, `Need at least ${memberLimit} members in group!`)
            await rahman.deleteChat(chat.id)
            await rahman.leaveGroup(chat.id)
        } else {
            await rahman.sendText(chat.id, ind.addedGroup(chat))
        }
    })

    rahman.onAnyMessage((message) => {
        // Uncomment code di bawah untuk mengaktifkan auto-delete cache pesan.
        // Uncomment code below to activate auto-delete message cache.
        /*
        rahman.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 1000) {
                    console.log(color('[RAHMAN]'), color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    rahman.cutMsgCache()
                    console.log(color('[RAHMAN]'), color('Cache deleted!', 'yellow'))
                }
            })
        */

        // Comment code msgHandler di bawah untuk mengaktifkan auto-update. Kemudian, uncomment code require di bawah msgHandler.
        // Comment code below to activate auto-update. Then, uncomment require code below msgHandler.
        msgHandler(rahman, message)
        // require('./message/index.js')(rahman, message)
    })

    rahman.onIncomingCall(async (callData) => {
        await rahman.sendText(callData.peerJid, ind.blocked(ownerBot))
        await rahman.contactBlock(callData.peerJid)
        console.log(color('[BLOCK]', 'red'), color(`${callData.peerJid} has been blocked.`, 'yellow'))
    })

    // Clear Chat Every 12 Hours
    cron.schedule('0 0 */12 * * *', () => {
        async function start() {
            const cronallChat = await rahman.getAllChats()
            for (let getdchat of cronallChat) {
                if (getdchat.isGroup == true) {
                    console.log(color('[RAHMAN]'), 'Clear Chat Group', 'yellow')
                    await rahman.clearChat(getdchat.id)
                } else {
                    await rahman.deleteChat(getdchat.id)
                }
            }
            console.log(color('[RAHMAN]'), 'Success Clear All Chat!', 'yellow')
        }
        start();
    })

    rahman.onGlobalParticipantsChanged(async (event) => {
        const _welcome = JSON.parse(fs.readFileSync(base_dir + 'database/group/welcome.json'))
        const isWelcome = _welcome.includes(event.chat)
        const gcChat = await rahman.getChatById(event.chat)
        const pcChat = await rahman.getContact(event.who)
        let { pushname, verifiedName, formattedName } = pcChat
        pushname = pushname || verifiedName || formattedName
        const { name, groupMetadata } = gcChat
        const botNumbers = await rahman.getHostNumber() + '@c.us'
        try {
            if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                const pic = await rahman.getProfilePicFromServer(event.who)
                if (pic === `ERROR: 401` || pic === 'ERROR: 404') {
                    var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picx = pic
                }
                const welcomer = await new canvas.Welcome()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picx)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`
                await rahman.sendFile(event.chat, base64, 'welcome.png', `Welcome ${pushname}!`)
            } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
                const pic = await rahman.getProfilePicFromServer(event.who)
                if (pic === `ERROR: 401` || pic === 'ERROR: 404') {
                    var picxs = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picxs = pic
                }
                const bye = await new canvas.Goodbye()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picxs)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
                await rahman.sendFile(event.chat, base64, 'welcome.png', `Bye ${pushname}, we will miss you~`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}

create(options(start))
    .then((rahman) => start(rahman)).catch((err) => console.error(err))