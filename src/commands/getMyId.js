/**
 * @param {import("telegraf").Context} ctx
 */
export async function getMyId(ctx) {
    await ctx.replyWithMarkdownV2(`\`@${ctx.message.from.username}\``);
}