<div align="center">
<img src="https://images5.alphacoders.com/911/911614.png" alt="bot-wa" width="500" />

# **bot-wa**

> bot-wa is a multipurpose WhatsApp bot using wa-automate-nodejs library!
>
>

<h3 align="center">Made with ❤️ by</h3>
<p align="center">
  <a href="https://github.com/cr4r"><img src="https://avatars3.githubusercontent.com/u/28254882?s=400&u=25765902db0b709938966cf4127ac11af5eafb5d&v=4" height="128" width="128" /></a>
</p>

<p align="center">
  <a href="https://github.com/cr4r"><img title="Author" src="https://img.shields.io/badge/Author-cr4r-purple.svg?style=for-the-badge&logo=github" /></a>
</p>

<p align="center">
  <a href="https://github.com/cr4r/bot-wa"><img title="Stars" src="https://img.shields.io/github/stars/cr4r/bot-wa?color=red&style=flat-square" /></a>
  <a href="https://github.com/cr4r/bot-wa/network/members"><img title="Forks" src="https://img.shields.io/github/forks/cr4r/bot-wa?color=red&style=flat-square" /></a>
  <a href="https://github.com/cr4r/bot-wa/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/cr4r/bot-wa?label=watchers&color=blue&style=flat-square" /></a> <br>
  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
  <img src="https://img.shields.io/github/repo-size/cr4r/bot-wa" /> <br>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fcr4r%2Fbot-wa?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcr4r%2Fbot-wa.svg?type=shield"/></a>
  <a href="https://www.codefactor.io/repository/github/cr4r/bot-wa"><img src="https://www.codefactor.io/repository/github/cr4r/bot-wa/badge" /></a>
</p>

<p align="center">
  <a href="https://github.com/cr4r/bot-wa#requirements">Requirements</a> •
  <a href="https://github.com/cr4r/bot-wa#installation">Installation</a> •
  <a href="https://github.com/cr4r/bot-wa#features">Features</a> •
  <a href="https://github.com/cr4r/bot-wa#thanks-to">Thanks to</a> •
  <a href="https://github.com/cr4r/bot-wa#license">License</a>
</p>
</div
  
# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://www.gyan.dev/ffmpeg/builds/)
* [Tesseract](https://s.id/vftesseract)
* Any text editor

# Requirements Heroku
* [Chrome](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-chromedriver)
* [FFmpeg](https://elements.heroku.com/buildpacks/jonathanong/heroku-buildpack-ffmpeg-latest)
* [Tesseract](https://elements.heroku.com/buildpacks/matteotiziano/heroku-buildpack-tesseract)
* [Canvas](https://elements.heroku.com/buildpacks/automattic/node-canvas)

> Heroku hosting is not recommended for public group.
>

# Installation
## 📝 Cloning this repo
```cmd
> git clone https://github.com/cr4r/bot-wa.git
> cd bot-wa
```

## 📝 Instalasi peralatan di OS ubuntu
```cmd
> npm run ubuntu
```

## ✍️ Editing the file
Edit the required value in `config.json`.
```json
{
    "ownerBot": "628xxxxxx@c.us",
    "prefix": ".",
    "uaOverride": "WhatsApp/2.2037.6 Mozilla/5.0 (CR4R; Coders Family X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
    "nao": "api-key",
    "vhtear": "api-key",
    "melodic": "administrator",
    "tobz": "api-key",
    "lol": "api-key",
    "authorStick": "@cr4r",
    "packStick": "CodersFamily",
    "stiker": {
        "img": {
            "author": "Coders Family",
            "pack": "CR4R",
            "keepScale": true
        },
        "video": {
            "stickerMetadata": true,
            "pack": "Coders Family",
            "author": "CR4R",
            "fps": 30,
            "startTime": "00:00:00.0",
            "crop": false,
            "loop": 0
        }
    }
}
```

`ownerBot`: your WhatsApp number.  
`prefix`: based on the latest update, you don't need to change the prefix, because this bot has multiple prefix.  
`uaOverride`: your user agent.  
`nao`: SauceNAO API key. You can get it [here](https://saucenao.com/user.php) by creating an account.  
`vhtear`: VHTear API key. You can get it [here](https://api.vhtear.com/) by purchasing his API key.  
`melodic`: MelodicXT API key. You can use `administrator` key.   
`tobz`: Tobz API key. You can use `BotWeA` key.   
`lol`: LolHuman API key. You can get it [here](https://lolhuman.herokuapp.com/) by creating an account.  
`authorStick`: name of the author sticker pack.  
`packStick`: name of the sticker pack.  
`stiker`: Config stiker. 

## 🗣️ Changing language
If you want to change the language to English, replace all `ind` function to `eng`.   
Example:
```js
ind.wrongFormat()
```
To:
```js
eng.wrongFormat()
```

## 🧾 Installing the Tesseract
* Download the file [here](https://s.id/vftesseract).
* After that, run downloaded file as Administrator.
* Complete the installation.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\Program Files\Tesseract-OCR;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've Tesseract installed, verify that it's working by running this command to see version number:
```cmd
> tesseract -version
```

## 🛠️ Installing the FFmpeg
* Download one of the available versions of FFmpeg by clicking [this link](https://www.gyan.dev/ffmpeg/builds/).
* Extract the file to `C:\` path.
* Rename the extracted folder to `ffmpeg`.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've FFmpeg installed, verify that it's working by running this command to see version number:
```cmd
> ffmpeg -version
```

## 🔍 Installing the dependencies
```cmd
> npm install
```

## 🆗 Running the bot
Regular node:
```cmd
> npm start
```

PM2:
```cmd
> pm2 start index.js
> pm2 monit
```

PM2 with cron job (restart after 5 hours):
```cmd
> pm2 start index.js --cron "* */5 * * *"
> pm2 monit
```

After that scan the QR code using your WhatsApp in your phone!

# Known issue
## ESM error
To prevent this, please use `node-fetch` and `parse-ms` with v2.x version.
```cmd
> npm install node-fetch@2.6.5
> npm install parse-ms@2.1.0
```

# Features
If you want to unlock premium commands, please buy me a coffee at least 1 on Ko-fi platform.

|     Deploy       |  Availability  |
| :--------------: | :------------: |
| Heroku           |       ✔️       |
| Local            |       ✔️       |

|     Leveling     |  Availability  |
| :--------------: | :------------: |
| Leveling         |       ✔️       |

|     Sticker Maker     | Availability |
| :-------------------: | :----------: |
| Send/reply image      |      ✔️      |
| Send/reply GIF        |      ✔️      |
| Send/reply MP4        |      ✔️      |
| Text to sticker       |      ❌      |
| Text to sticker GIF   |      ❌      |
| Sticker to image      |      ❌      |
| Sticker WM            |      ❌      |
| Take sticker          |      ✔️      |

|      Downloader     | Availability |
| :-----------------: | :----------: |
| Facebook video      |      ❌      |
| YouTube audio/video |      ❌      |
| Joox musics         |      ❌      |
| TikTok video        |      ❌      |
| TikTok profile pic  |      ❌      |
| Twitter video/image |      ❌      |
| Instagram post      |      ❌      |
| Instagram story     |      ❌      |
| LK21                |      ❌      |
| TikTok no WM        |      ❌      |

|         Misc         | Availability |
| :------------------: | :----------: |
| OCR (Image to Text)  |      ❌      |
| Say                  |      ❌      |
| Search lyrics        |      ❌      |
| Shortlink maker      |      ❌      |
| Wikipedia (EN)       |      ❌      |
| Wikipedia (ID)       |      ❌      |
| KBBI scarper         |      ❌      |
| Stalk IG account     |      ❌      |
| GSMArena scraper     |      ❌      |
| Search food receipts |      ❌      |
| YouTube search       |      ❌      |
| Text to speech       |      ❌      |
| AFK                  |      ❌      |
| Distance calculator  |      ❌      |
| Sticker search       |      ❌      |
| Calculator           |      ❌      |
| Al-Qur'an surah      |      ❌      |
| List surah           |      ❌      |
| Random contact       |      ❌      |
| YouTube play         |      ❌      |
| Whois                |      ❌      |
| SMS gateway          |      ❌      |
| Al-Qur'an tafseer    |      ❌      |
| Al-Kitab search      |      ❌      |
| LK21 scraper         |      ❌      |
| Reminder             |      ❌      |
| Image uploader       |      ❌      |
| Sholat schedule      |      ❌      |
| Latest Line stickers |      ❌      |
| Check postage        |      ❌      |
| Sending email        |      ❌      |
| Random quotes        |      ❌      |
| Genshin chara info   |      ❌      |
| Bass boost           |      ❌      |

|          Fun          | Availability |
| :-------------------: | :----------: |
| Weton jodoh           |      ❌      |
| Horoscope             |      ❌      |
| Harta tahta maker     |      ❌      |
| Writing text maker    |      ❌      |
| Glitch text maker     |      ❌      |
| SimSimi chatbot       |      ❌      |
| Blackpink logo maker  |      ❌      |
| Pornhub logo maker    |      ❌      |
| Galaxy text maker     |      ❌      |
| Truth or dare         |      ❌      |
| Asupan TikTok         |      ❌      |
| PH comment maker      |      ❌      |
| Triggered maker       |      ❌      |
| Kiss image maker      |      ❌      |
| 3D text maker         |      ❌      |
| Freefire logo maker   |      ❌      |
| Freefire banner maker |      ❌      |
| Sliding text maker    |      ❌      |
| Hero ML maker         |      ❌      |
| Fire text maker       |      ❌      |
| Couple balloon maker  |      ❌      |
| Wasted maker          |      ❌      |
| Cakl Lontong quiz     |      ❌      |
| Hilih-ify text        |      ❌      |
| Tebak gambar quiz     |      ❌      |
| Random doge stickers  |      ❌      |
| Dice                  |      ❌      |

|       Weeb Zone       | Availability |
| :-------------------: | :----------: |
| Random neko girl      |      ❌      |
| Random wallpaper      |      ❌      |
| Random kemonomimi     |      ❌      |
| Kusonime scraper      |      ❌      |
| Komiku scraper        |      ❌      |
| Random Video Loli     |      ❌      |
| Anime tracer          |      ❌      |
| Source finder         |      ❌      |
| Random waifu pics     |      ❌      |
| Anitoki latest update |      ❌      |
| Random anime stickers |      ❌      |
| Neonime latest update |      ❌      |
| Anoboy on-going list  |      ❌      |
| Search character      |      ❌      |
| Sticker keywords      |      ❌      |

|        Bot       | Availability |
| :--------------: | :----------: |
| Server usage     |      ❌      |
| Blocked list     |      ❌      |
| Ping             |      ❌      |
| Delete messages  |      ❌      |
| Bug report       |      ❌      |
| Join group       |      ❌      |
| Check serials    |      ❌      |

|        Owner       | Availability |
| :----------------: | :----------: |
| Clear all messages |      ❌      |
| Broadcasting       |      ❌      |
| Leave all groups   |      ❌      |
| Get snapshot       |      ❌      |
| Ban                |      ❌      |
| Eval               |      ❌      |
| Shutdown           |      ❌      |
| Add premium user   |      ❌      |
| Set bot's info     |      ❌      |
| Mute bot           |      ❌      |
| Block              |      ❌      |
| Unblock            |      ❌      |

|    Moderation    | Availability |
| :--------------: | :----------: |
| Add              |      ❌      |
| Kick             |      ❌      |
| Promote          |      ❌      |
| Demote           |      ❌      |
| Leave bot        |      ❌      |
| Everyone         |      ❌      |
| Toogle NSFW      |      ❌      |
| Set group icon   |      ❌      |
| Anti-group link  |      ❌      |
| Toogle welcome   |      ❌      |
| Auto-sticker     |      ❌      |
| Mute group       |      ❌      |
| Anti-NSFW link   |      ❌      |
| Anti-porn        |    Premium   |

|        NSFW        | Availability |
| :----------------: | :----------: |
| Lewds              |      ❌      |
| nHentai lookup     |      ❌      |
| Fetish             |      ❌      |
| Latest Nekopoi     |      ❌      |
| Pornhub downloader |      ❌      |
| Waifu 18+          |      ❌      |
| Yuri               |      ❌      |
| Femdom             |      ❌      |
| Lewd avatars       |      ❌      |
| nHentai search     |      ❌      |
| nHentai downloader | Premium/Free |
| Multi-lewds        |    Premium   |
| Multi-fetish       |    Premium   |

# Thanks to
* [`open-wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
* [`uukina`](https://github.com/uukina)
* [`MrPawNO`](https://github.com/MrPawNO)
* [`Pahri123`](https://github.com/Pahri123)
* [`LeviathanH`](https://github.com/LeviathanH)
* [`ferlitopym`](https://github.com/ferlitopym)
* [`AlvioAdjiJanuar`](https://github.com/AlvioAdjiJanuar)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`VirusLauncher`](https://github.com/VirusLauncher)
* [`Sansekai`](https://github.com/Sansekai)
* [`Baguettou`](https://github.com/Baguettou)
* [`HAFizh-15`](https://github.com/HAFizh-15)
* [`TheSploit`](https://github.com/TheSploit)
* [`rashidsiregar28`](https://github.com/rashidsiregar28)
* [`irham01`](https://github.com/irham01)
* [`hardiantojek93`](https://github.com/hardiantojek93)
* [`gamingrkp`](https://github.com/gamingrkp)
* [`BocchiBot`](https://github.com/SlavyanDesu/BocchiBot/)

# License
**bot-wa** © [cr4r](https://github.com/cr4r), released under the MIT License.
Authored and maintained by cr4r.

<p align="center">
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fcr4r%2Fbot-wa?ref=badge_large"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcr4r%2Fbot-wa.svg?type=large" />
</p>
