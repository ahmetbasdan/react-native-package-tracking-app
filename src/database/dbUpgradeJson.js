export const version = 1;

export const upgrades = {
  to_v1: [
    `INSERT INTO firma('firmaAd','firmaKod','url','yerliMi') VALUES('HepsiJet','hepsiJet','https://www.hepsijet.com/gonderi-takibi/#takipNo#',1)`,
    `INSERT INTO firma('firmaAd','firmaKod','url','yerliMi') VALUES('Trendyol Express','trendyolExpress','https://kargotakip.trendyol.com/?orderNumber=#takipNo#',1)`,
    `INSERT INTO firma('firmaAd','firmaKod','url','yerliMi') VALUES('17Track','track17','https://t.17track.net/tr#nums=#takipNo#',0)`,
    `UPDATE firma SET url='https://www.ups.com.tr/WaybillSorgu.aspx?Waybill=#takipNo#' WHERE firmaKod='ups' `,
  ],
};
