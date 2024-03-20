import { bot } from "../../app.js";
import * as Menu from "../menu.js";
import { getMyId } from "./getMyId.js";
// import { sendPhoto } from "./sendPhoto.js";

class CommandHandler {
    /**
     * @private
     */
    #commandsToRegister = [];

    /**
     * @param {string} name
     * @param {Function} callback - first argument must be context (ctx)
     */
    register(name, callback, addButton = true, requestLocation = false) {
        this.#commandsToRegister.push({
            name: name,
            callback: callback, 
            addButton: addButton,
            requestLocation: requestLocation,
        });
    }

    /**
     * Init all commands
     */
    initialization() {
        this.#commandsToRegister.forEach(cmd => {
            const name = cmd.name;

            bot.hears(name, cmd.callback);

            if (cmd.addButton == true)
                Menu.addNewButton(name, cmd.requestLocation);
        });
    }
}

const сommandHandler = new CommandHandler();

сommandHandler.register("#️⃣ Get my id", getMyId, true);
// сommandHandler.register("🖼️ Send photo to PC", sendPhoto, true);

export default сommandHandler;