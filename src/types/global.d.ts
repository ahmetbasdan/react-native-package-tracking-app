type cargoCompanyNameType =
  | "aras"
  | "yurtici"
  | "mng"
  | "ptt"
  | "surat"
  | "ups";

type kargoModel = {
  id?: number;
  firmaId?: number;
  kargoAd?: string;
  kargoTakipNo?: string;
  tamamlandiMi?: 0 | 1;
  tarih?: string;
  kayitTarihi?: string;
};

type firmaModel = {
  id: number;
  firmaAd: string;
  firmaKod: cargoCompanyNameType;
  yerliMi: number;
  url: string;
};

type action = {
  type: string;
  payload: any;
};
