import { Markup } from "telegraf";

/**
 * @type {Markup.Markup<import("telegraf/typings/core/types/typegram").ReplyKeyboardMarkup>}
 */
let markups = null;

export function create() {
    markups = Markup.keyboard();

    return markups;
}

export function get() {
    return markups;
}

export function addNewButton(name, locationRequest = false) {
    if (markups == null)
        throw new Error("Markups isn't defined");

    const allButtons = markups.reply_markup.keyboard.flat();

    allButtons.push({
        text: name, 
        request_location: locationRequest
    });
    
    markups = Markup.keyboard(allButtons).resize();
}

// Buttons under sent message
export function inlineMenu() {
    return Markup.inlineKeyboard([
        Markup.button.url('Google', 'https://www.google.com'),
    ]);
}