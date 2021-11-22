
import { Context, Scenes } from 'telegraf'


export interface MovementWizardSession extends Scenes.WizardSessionData {
    movementWizardSessionProp: number
}

export interface MovementContext extends Context {
    movementContextProp: string
    scene: Scenes.SceneContextScene<MovementContext, MovementWizardSession>
    wizard: Scenes.WizardContextWizard<MovementContext>
}