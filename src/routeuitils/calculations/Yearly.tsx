import React from "react";
import { v4 as uuidv4 } from "uuid";

type YearlyDataType = {
  id: string;
  title: string;
};

export const YearlyData: YearlyDataType[] = [
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
];

const Yearly: React.FC = () => {
  return (
    <div className="yearly-calculations">
      {YearlyData.map((item: YearlyDataType) => (
        <div key={item?.id} className="yearly-data-item">
          <p className="titledata">{item?.title}</p>

          <button className="download-file-button">Faylı yüklə</button>
        </div>
      ))}
    </div>
  );
};

export default Yearly;
