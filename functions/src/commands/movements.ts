import { Composer, Context, Scenes, session, Telegraf } from 'telegraf'
import { sheetService }  from '../utils/sheets/index'

interface MyWizardSession extends Scenes.WizardSessionData {
    // will be available under `ctx.scene.session.myWizardSessionProp`
    myWizardSessionProp: number
}

interface MyContext extends Context {
    // will be available under `ctx.myContextProp`
    myContextProp: string
    
    // declare scene type
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>
    // declare wizard type
    wizard: Scenes.WizardContextWizard<MyContext>
    
}

export function setupMovements(bot: Telegraf<MyContext>){

    let expense = {
        name: 'name',
        value: 'value'
    }

    const stepOneHandler = new Composer<MyContext>()
    const stepTwoHandler = new Composer<MyContext>()
    const stepThreeHandler = new Composer<MyContext>()
    
    stepOneHandler.command('gasto', async (ctx) => {
        ctx.scene.session.myWizardSessionProp = Math.floor(10 * Math.random()) + 10
        await ctx.reply('Por favor ingrese el nombre de su gasto')
        return ctx.wizard.next()
    })

    stepTwoHandler.use(async (ctx) => {
        expense.name = ctx.message.text
        ctx.replyWithMarkdown('Ingrese el valor del gasto')
        return ctx.wizard.next()
    })

    stepThreeHandler.use(async (ctx) => {
        const sheetSrv = await sheetService()
        let sheet = sheetSrv.sheetsByIndex[0];
        await sheet.loadHeaderRow()

        expense.value = ctx.message.text

        sheet.addRow({
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

    const stage = new Scenes.Stage<MyContext>([superWizard], {default: 'super-wizard'})
    bot.use(session())
    bot.use((ctx, next) => {
    const now = new Date()
    ctx.myContextProp = now.toString()
    return next()
    })
    bot.use(stage.middleware())
}
