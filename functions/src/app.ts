import * as dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import * as functions from "firebase-functions";
import { configWebhook } from './utils/webhook'
import { setupMovements } from './commands/movements';
import { MovementContext } from './interfaces/movements';

dotenv.config()
const telegramBotToken: string = process.env.TELEGRAM_BOT_TOKEN ?? 'harcoded'
const bot = new Telegraf<MovementContext>(telegramBotToken)

setupMovements(bot);
export const router = functions.https.onRequest((req, res) => bot.handleUpdate(req.body, res))
export const setWebhook = functions.https.onRequest( async (req, res) => await configWebhook(req, res, telegramBotToken ))
