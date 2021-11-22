import { format } from 'date-fns'
import { Composer, Scenes, session, Telegraf } from 'telegraf'
import { MovementContext } from '../interfaces/movements'
import { getDate } from '../utils/dates'
import { sheetService }  from '../utils/sheets/index'

export function setupMovements(bot: Telegraf<MovementContext>){

    let expense = { name: 'name', value: 'value' }

    const stepOneHandler = new Composer<MovementContext>()
    const stepTwoHandler = new Composer<MovementContext>()
    const stepThreeHandler = new Composer<MovementContext>()
    
    stepOneHandler.command('gasto', async (ctx) => {
        ctx.scene.session.movementWizardSessionProp = Math.floor(10 * Math.random()) + 10
        await ctx.reply('Por favor ingrese el nombre de su gasto')
        return ctx.wizard.next()
    })

    stepTwoHandler.use(async (ctx) => {
        // @ts-ignore
        expense.name = ctx.message.text
        ctx.replyWithMarkdown('Ingrese el valor del gasto')
        return ctx.wizard.next()
    })

    stepThreeHandler.use(async (ctx) => {
        const sheetSrv = await sheetService()
        let sheet = sheetSrv.sheetsByIndex[0];
        await sheet.loadHeaderRow()
        // @ts-ignore
        expense.value = ctx.message.text


        
        sheet.addRow({
            Fecha: getDate().date,
            Hora: getDate().hour,
            Concepto: expense.name,
            Tipo: 'Gasto',
            Valor: expense.value
        })
        
        await ctx.reply(`El gasto: ${expense.name} por un valor de ${expense.value} fue agregado ✅`) 
       
        return await ctx.scene.leave()
    })

    const superWizard = new Scenes.WizardScene(
      'super-wizard',
      stepOneHandler,
      stepTwoHandler,
      stepThreeHandler
    )

    const stage = new Scenes.Stage<MovementContext>([superWizard], {default: 'super-wizard'})
    bot.use(session())
    bot.use((ctx, next) => {
    const now = new Date()
    ctx.movementContextProp = now.toString()
    return next()
    })
    bot.use(stage.middleware())
}
