import axios from "axios";
import fs from 'fs';
import { spawn } from 'child_process';
import { pipeline } from 'stream/promises';

/**
 * @param {import("telegraf").Context} ctx
 * @param {boolean} isDocument 
 */
export async function handlerSend(ctx, isDocument) {
    let file = null;

    if (isDocument) {
        file = ctx.message.document;        
    } else {
        const photos = ctx.message.photo;
        
        file = photos[photos.length - 1];
    }

    ctx.reply(`Thanks for ${isDocument ? "file" : "photo"}`);

    try {
        const downloadLink = await ctx.telegram.getFileLink(file.file_id);
        const fileName = getFileName(downloadLink);
        const filePath = `${global.__maindir}/cache/`;
    
        if (!fs.existsSync(filePath))
            fs.mkdirSync(filePath);

        // download file to server
        await downloadFile(filePath, fileName, downloadLink);

        // copy file to clipboard
        await copyClipboard(filePath, fileName);
    
        if (!isDocument) {
            fs.rmSync(filePath + fileName);

            const cacheDir = fs.readdirSync(filePath);

            for (const file of cacheDir) {
                fs.rm(filePath + file, () => null);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function getFileName (downloadLink) {
    return downloadLink.href.split("/")[downloadLink.href.split("/").length - 1];
}

async function downloadFile(filePath, fileName, downloadLink) {
    const response = await axios({
        method: 'get',
        url: downloadLink,
        responseType: 'stream',
    });

    await pipeline(response.data, fs.createWriteStream(filePath + fileName));
}

/**
 * @returns {Promise<boolean>} true - success | false - error
 */
function copyClipboard(filePath, fileName) {
    return new Promise((res, rej) => {
        const child = spawn('dotnet',
            [global.__maindir + '/modules/ClipboardManager.dll', filePath, fileName],
            { stdio: 'inherit' }
        );
        
        child.on('exit', (code) => {
            if (code === 0) {
                console.info('File has been copied succesfull');

                res(true);
            }
            else {
                console.error(`Child process exited with code ${code}.`);

                rej(false);
            }
        });
    });
}