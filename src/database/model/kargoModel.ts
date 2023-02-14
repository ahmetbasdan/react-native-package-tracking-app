import db from "../connection";

declare global {
  type kargoGetResponse = {
    firmaAd: string;
    firmaKod: cargoCompanyNameType;
    firmaId: string;
    url: string;
  } & kargoModel;
}

export const kargoAdd = (props: kargoModel) => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
            INSERT INTO 
            kargo(firmaId,kargoAd,kargoTakipNo) 
            values(?,?,?)`,
        [props.firmaId, props.kargoAd, props.kargoTakipNo],
        () => resolve(true),
        (err: any) => reject(err)
      );
    });
  });
};

export const kargoGet = ({
  tamamlandiMi,
  searchText = "",
  pageNumber = 1,
}: {
  tamamlandiMi: number;
  searchText?: string;
  pageNumber?: number;
}) => {
  const limit = 15;
  const offset = (pageNumber - 1) * limit;
  let searchQery = ``;
  if (searchText) {
    searchQery = `AND (firma.firmaAd LIKE '%${searchText}%' OR kargo.kargoAd LIKE '%${searchText}%' OR kargo.kargoTakipNo LIKE '%${searchText}%')`;
  }

  return new Promise<kargoGetResponse[]>((resolve, reject) => {
    db.executeSql(
      `
            SELECT 
            kargo.*,
            firma.firmaAd,
            firma.firmaKod,
            firma.id AS firmaId,
            firma.url
            FROM kargo 
            INNER JOIN firma 
            ON kargo.firmaId=firma.id 
            WHERE  tamamlandiMi=? ${searchQery} 
            ORDER BY kargo.id DESC  
            LIMIT ${limit} OFFSET ?
        `,
      [tamamlandiMi, offset],
      (results: any) => {
        const { rows } = results;
        const data = [];

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

export const kargoUpdate = (props: kargoModel) => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
                UPDATE kargo SET 
                firmaId=?,
                kargoAd=?,
                kargoTakipNo=?,
                tamamlandiMi=? 
                WHERE id=?
            `,
        [
          props.firmaId,
          props.kargoAd,
          props.kargoTakipNo,
          props.tamamlandiMi,
          props.id,
        ],
        () => resolve(true),
        (err: any) => reject(err)
      );
    });
  });
};

export const kargoDelete = (id?: number) => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
                DELETE FROM kargo WHERE id=?`,
        [id],
        () => resolve(true),
        (err: any) => reject(err)
      );
    });
  });
};

export const kargoCount = (tamamlandimMi: number) => {
  return new Promise<number>((resolve, reject) => {
    db.executeSql(
      `SELECT COUNT(*) AS kargoCount FROM kargo WHERE tamamlandiMi=?`,
      [tamamlandimMi],
      (result: any) => {
        const count = result.rows.item(0).kargoCount;
        resolve(count);
      },
      (err: any) => reject(err)
    );
  });
};
