import db from './connection'
import {upgrades as jsonUpgrades, version as jsonVersion} from './dbUpgradeJson'
import { Alert } from 'react-native'

export const getVersion = () => {
    return new Promise((resolve, reject) => {
        db.executeSql(
            `SELECT max(versiyon) AS version FROM ayarlar`,
            [],
            (result) => resolve(result.rows.item(0).version),
            err => reject(err),
        )
    })
}
const dbUpdate = async () => {
    try {
        let statements = [];
        let currentVersion= await getVersion()
        let upgradeVersionList=[]
        for (let i = 1; i <= jsonVersion-currentVersion; i++) {
            upgradeVersionList.push(`to_v${currentVersion+i}`)
        } 
        upgradeVersionList.map((item)=>{
            statements.push(...jsonUpgrades[item])
        })


        statements = [...statements, `REPLACE into ayarlar (id,versiyon) VALUES (1,${jsonVersion})`]

        db.transaction(tx => {
            for (let i = 0; i < statements.length; i++) {
                const element = statements[i];
                db.executeSql(
                    element,
                    [],
                    res => console.log("success: " + element),
                    err => Alert.alert("DB HATA", err.message, [{ text: 'Tamam' }])
                )
            }
        })


    } catch (error) {
        alert(error.message)
    }
}

export default dbUpdate

