import React from "react";
import Breadcrumb from "../../Breadcrumb";
import { v4 as uuidv4 } from "uuid";
import PaginateButton from "../../components/PaginateButton";
import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import moment from "moment";
import "moment/locale/az";
import Loader from "../../Loader";

export const PurchaseModalState = atom<string>({
  key: 'purchaseModalStateKey',
  default: "",
});

export interface PurchaseInterface {
  _id: string;
  title: string;
  description: string;
  pdf: string;
  createdAt: string;
}

type PdfType = {
  id: string;
  time: string;
  description: string;
  url: string;
};

export const PurchaseData: PdfType[] = [
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },

  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
  {
    id: uuidv4(),
    time: "12 iyun 2024",
    description:
      "QSC-də istismar olunan isitmə, soyutma və havalandırma sistemlərində qüsurlarının müəyyən olunması və texniki servis xidmətlərinin satın alınması üçün “İki Zərf” və “Bağlı Zərf” prinsipləri ilə açıq satınalma müsabiqəsi (11002-24) elan edir",
    url: "",
  },
];

const PurchaseSection: React.FC = () => {
  moment.locale("az");

  //pagination
  const [paginate, setPaginate] = React.useState<number>(10);

  const handlePaginate = () => {
    setPaginate((prevPag) => prevPag + 10);
  };

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: Purchases, isLoading } = useQuery<PurchaseInterface[]>({
    queryKey: ["purchasesKey", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/purchasefront`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const hasPurchase = Purchases && Purchases?.length > 0;

  //open handle purchase modal
  const [_, setPurchaseModal] = useRecoilState(PurchaseModalState);
  const openPurchaseModal = (_id: string) => {
    setPurchaseModal(_id);
  };

  return (
    <section className="purchase-section">
      <div className="purchase">
        <Breadcrumb prevpage="Ana səhifə" uri="Satınalma" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container-purchase">
            <h2>Satınalma</h2>
            <div className="grid-purchase">
              {hasPurchase &&
                Purchases.slice(0, paginate).map((item: PurchaseInterface) => (
                  <div key={item?._id} className="purchase-item">
                    <article className="top-content">
                      <span className="time">{moment(item?.createdAt).format("ll")}</span>
                      <p>{item?.description}</p>
                    </article>
                    <div className="link-btn" onClick={() => openPurchaseModal(item?._id)}>
                      Daha ətraflı
                    </div>
                  </div>
                ))}
            </div>

            {hasPurchase && paginate <= Purchases?.length && <PaginateButton handlePaginate={handlePaginate} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default PurchaseSection;
