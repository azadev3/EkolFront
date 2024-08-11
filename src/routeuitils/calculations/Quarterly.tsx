import React from "react";
import { v4 as uuidv4 } from "uuid";

type QuarterlyDataType = {
  id: string;
  title: string;
};

export const QuarterlyData: QuarterlyDataType[] = [
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
  {
    id: uuidv4(),
    title: "Korporativ idarəetmə standartları əsasında hesabatlıq",
  },
];

const Quarterly: React.FC = () => {
  return <div className="quarterly-calculations">
    {QuarterlyData.map((item: QuarterlyDataType) => (
      <div key={item?.id} className="quarterly-data-item">
        <p className="titledata">
          {item?.title}
        </p>

        <button className="download-file-button">
        Faylı yüklə
        </button>
      </div>
    ))}
  </div>;
};

export default Quarterly;
