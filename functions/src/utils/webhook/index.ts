import axios from 'axios';

interface SetWebhook{
    ok: boolean,
    result: boolean
}

interface GetStatusWebhook{
    ok: boolean,
    result: object
}

export async function configWebhook(req:any , res:any, telegramBotToken) {
    
    const setResponse = await axios.get<SetWebhook>(`https://api.telegram.org/bot${telegramBotToken}/setWebHook?url=${req.body.url}/`);

    if( setResponse.data.ok){
        const getStatus = await axios.get<GetStatusWebhook>(`https://api.telegram.org/bot${telegramBotToken}/getWebhookInfo`);
        res.send(getStatus.data)
        
    }else{
        res.send({ok:false, data: 'Fallo al configurar Webhook'})
    }
}