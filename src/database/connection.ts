import { Alert } from 'react-native'

const SQLite = require('react-native-sqlite-storage')

const db = SQLite.openDatabase({ name: 'KargoTakip.db', createFromLocation: '~/KargoTakip.db' },
    () => (
        console.log("database connection success")
    ),
    (err) => {
        Alert.alert("Db Connect Error", err.message)
    }
)

export default db