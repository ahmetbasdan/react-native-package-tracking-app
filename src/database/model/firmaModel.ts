const { default: db } = require("../connection");

export const firmaGetAll = () => {
  return new Promise<firmaModel[]>((resolve, reject) => {
    db.executeSql(
      `SELECT * FROM firma`,
      [],
      (results: any) => {
        const { rows } = results;
        const data: firmaModel[] = [];

        for (let i = 0; i < rows.length; i++) {
          const element = rows.item(i);
          data.push(element);
        }

        resolve(data);
      },
      (err: any) => reject(err)
    );
  });
};
