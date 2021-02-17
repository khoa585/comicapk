import { openDatabase } from 'react-native-sqlite-storage';
class SqlHelper {
    constructor() {
        this.db = openDatabase({
            name: "data.db",
            location: "default",
            createFromLocation: "~/www/data.db"
        }, () => { console.log("Open DB Success") }, (error) => { console.log(error) })
    }
    db;



    async addHistoryManga(item) {

        this.db.transaction((tx) => {
            // tx.executeSql(
            //     'INSERT INTO history(_id,category, date_time) VALUES (?,?,?)',
            //     [item._id, JSON.stringify(item), Date.now()],
            //     (tx, results) => {
            //         if (results.rowsAffected > 0) {
            //             console.log('Registration Successfully')
            //         } else console.log('Registration Failed');
            //     }
            // );
            tx.executeSql("SELECT * FROM history where _id=?", [item._id], (txt, result) => {
                if (result.rows.length > 0) {
                    txt.executeSql("UPDATE history SET date_time= ? where _id = ?", [Date.now(), item._id])
                }
                else {
                    txt.executeSql('INSERT INTO history(_id,category, date_time) VALUES (?,?,?)',
                        [item._id, JSON.stringify(item), Date.now()], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                console.log('addHistoryManga Successfully')
                            } else console.log('addHistoryManga Failed');
                        })
                }
            }, (error) => console.log(error))
        });
    }
    GetListHistory(page = 1, numberItem = 12) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM history  ORDER  BY date_time DESC LIMIT ? OFFSET ?',
                    [numberItem, (page - 1) * numberItem],
                    (_, results) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error) => { reject(error) })
        })
    }
    DeleteMangaHistory(id) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM history WHERE _id= ?", [id], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error) => { reject(error) })
            })
        })
    }
    addFollowManga(item) {
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM manga_follow where _id=?", [item._id], (txt, result) => {
                if (result.rows.length > 0) {
                    txt.executeSql("UPDATE manga_follow SET date_time= ? where manga_id = ?",
                        [item._id, JSON.stringify(item), Date.now()], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                console.log('addFollowManga Successfully')
                            } else console.log('addFollowManga Failed');
                        })
                }
                else {
                    txt.executeSql(`INSERT INTO manga_follow (_id,category, date_time) VALUES (?,?,?)`, [item._id, JSON.stringify(item), Date.now()], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('addFollowManga Successfully')
                        } else console.log('addFollowManga Failed');
                    })
                }
            }, (error) => console.log(error))
        });
    }
    unFollowManga(id) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM manga_follow WHERE _id= ?", [id], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error) => { reject(error) })
            })
        })
    }

    GetListFollower() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM manga_follow ORDER  BY date_time DESC ", [], (txs, result) => {
                    reslove(result.rows.raw());
                }, (error) => { reject(error) })
            })
        })
    }
    getFollowManga(item) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM manga_follow where _id =? ", [item._id], (txs, result) => {
                    reslove(result.rows.raw());
                }, (error) => { reject(error) })
            })
        })
    }



    async addSearchManga(txt_) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO search(text, date_time) VALUES (?,?)',
                [txt_, Date.now()],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('addSearchManga Successfully')
                    } else console.log('addSearchManga Failed');
                }
            );
        }, (error) => { console.log(error) });
    }

    GetListSearch() {

        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM search ORDER  BY date_time DESC',
                    [],
                    (_, results) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error) => { reject(error) })
        })
    }

    DeleteManga() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM search", [], (txs, result) => {
                    // reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error) => { reject(error) })
            })
        })
    }
}
export default new SqlHelper();