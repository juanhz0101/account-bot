import { GoogleSpreadsheet } from "google-spreadsheet";

export async function sheetService(){
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    let accountEmail :string = process.env.GOOGLE_ACCOUNT ?? 'abcde'
    let privateKey :string = process.env.GOOGLE_PRIVATE_KEY ?? 'xxxxx'
    
    doc.useServiceAccountAuth({
        client_email: accountEmail,
        private_key:privateKey
    });
    await doc.loadInfo()

    return doc
}