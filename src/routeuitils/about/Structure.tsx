import React from "react";
import { v4 as uuid } from "uuid";
import Breadcrumb from "../../Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import Loader from "../../Loader";
import { useTranslate } from "../../context/TranslateContext";

// type DepartmentType = {
//   id: string;
//   title: string;
// };

// interface DepartamentStructure {
//   id: string;
//   departmentOne?: DepartmentType[];
//   departmentTwo?: DepartmentType[];
//   departmentThree?: DepartmentType[];
//   departmentFour?: DepartmentType[];
//   departmentFive?: DepartmentType[];
//   departmentSix?: DepartmentType[];
//   departmentSeven?: DepartmentType[];
// }

const Structure: React.FC = () => {
  // //define department structures
  // const DepartmentItems: DepartamentStructure = {
  //   id: uuid(),
  //   departmentOne: [
  //     {
  //       id: uuid(),
  //       title: "Daxili nəzarət departamenti",
  //     },
  //   ],
  //   departmentTwo: [
  //     {
  //       id: uuid(),
  //       title: "Ekologiya idarəsi",
  //     },
  //   ],
  //   departmentThree: [
  //     { id: uuid(), title: "İstehsalat üzrə müavin (texniki drektor)" },
  //     { id: uuid(), title: "Energetika və mexanika şöbəsi" },
  //     { id: uuid(), title: "3-cü sahə ( Parafinin təmizlənməsi sahəsi)" },
  //     { id: uuid(), title: "4-cü sahə (H.Əliyev adına NEZ)" },
  //     { id: uuid(), title: "5-ci sahə " },
  //     { id: uuid(), title: "6-ci sahə ( H.Əliyev adına NEZ)" },
  //     { id: uuid(), title: "Torpaqların rekultivasiyası demartamenti" },
  //     { id: uuid(), title: "1-ci sahə" },
  //     { id: uuid(), title: "2-ci sahə  (Yaşıllaşdırma üzrə)" },
  //     { id: uuid(), title: "“EKO Park” İnovasiya mərkəzi" },
  //     { id: uuid(), title: "“Elektromexanika sexi" },
  //   ],
  //   departmentFour: [
  //     { id: uuid(), title: "Baş direktorun müavini" },
  //     { id: uuid(), title: "Tullantı Mərkəzi" },
  //     { id: uuid(), title: "Layihələrin icrasına nəzarət" },
  //   ],
  //   departmentFive: [
  //     { id: uuid(), title: "SƏTƏM üzrə müavin" },
  //     { id: uuid(), title: "Texniki təhlükəsizlik şöbəsi" },
  //     { id: uuid(), title: "Deszinfeksiya şöbəsi" },
  //     { id: uuid(), title: "Ekoloji manitorinq departamenti" },
  //     { id: uuid(), title: "Səyyar manitorinq xidməti" },
  //     { id: uuid(), title: "Kompleks tətqiqatlar labaratoriyası" },
  //   ],
  //   departmentSix: [
  //     { id: uuid(), title: "Ümumi işlər üzrə müavin" },
  //     { id: uuid(), title: "Manitorinq və iqdisadi əlaqələr şöbəsi" },
  //     { id: uuid(), title: "Satınalmalar şöbəsi" },
  //     { id: uuid(), title: "Təhcizat şöbəsi" },
  //     { id: uuid(), title: "İctimai sosial şöbəsi" },
  //     { id: uuid(), title: "İnzibati təsərrüfat şöbəsi" },
  //     { id: uuid(), title: "Nəqliyyat sexi" },
  //     { id: uuid(), title: "Mərkəzi anbar" },
  //   ],
  //   departmentSeven: [
  //     { id: uuid(), title: "İqdisadiyyat və Uçot üzrə müavin" },
  //     { id: uuid(), title: "Mühasibat uçotu" },
  //     { id: uuid(), title: "Əmək haqqı və əməyin təşkili şöbəsi" },
  //     { id: uuid(), title: "Maliyyə və vergilər şöbəsi" },
  //     { id: uuid(), title: "İqtisadi təhlil və proqnozlaşdırma şöbəsi" },
  //     { id: uuid(), title: "Rəhbərlik yanında aparat" },
  //     { id: uuid(), title: "Hüquqi şöbə" },
  //     { id: uuid(), title: "İnsan resurslarının idarə edilməsi şöbəsi" },
  //   ],
  // };

  const { translations } = useTranslate();

  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: StructureData, isLoading: StructureLoading } = useQuery({
    queryKey: ["structureDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/departmentsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      console.log(response.data, "salam struktur!");
      return response.data;
    },
    staleTime: 1000000,
  });

  if (StructureLoading) {
    return <Loader />;
  }

  const groupedData = StructureData.reduce((acc: any, item: any) => {
    const { category, title } = item.departments;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ id: uuid(), title });
    return acc;
  }, {});

  return (
    <section className="structure-section">
      <div className="structure">
        <Breadcrumb prevpage="Ana səhifə" uri="Struktur" />

        <div className="content-structure">
          <h2>{translations["struktur_title"]}</h2>
          <div className="director-general">
            <div className="general">
              <span>{translations["baş_direktorun_adı"]}</span>
            </div>
          </div>

          {/* <div className="other-refactors">
            <div className="item-department">
              {DepartmentItems?.departmentOne?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems && DepartmentItems?.departmentOne && DepartmentItems?.departmentOne?.length > 1 && (
                    <React.Fragment>
                      <div className="technic-line"></div>
                      <div className="technic-line2"></div>
                    </React.Fragment>
                  )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentTwo?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems && DepartmentItems?.departmentTwo && DepartmentItems?.departmentTwo?.length > 1 && (
                    <React.Fragment>
                      <div className="technic-line"></div>
                      <div className="technic-line2"></div>
                    </React.Fragment>
                  )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentThree?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems &&
                    DepartmentItems?.departmentThree &&
                    DepartmentItems?.departmentThree?.length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentFour?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems &&
                    DepartmentItems?.departmentFour &&
                    DepartmentItems?.departmentFour?.length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentFive?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems &&
                    DepartmentItems?.departmentFive &&
                    DepartmentItems?.departmentFive?.length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentSix?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems && DepartmentItems?.departmentSix && DepartmentItems?.departmentSix?.length > 1 && (
                    <React.Fragment>
                      <div className="technic-line"></div>
                      <div className="technic-line2"></div>
                    </React.Fragment>
                  )}
                </div>
              ))}
            </div>

            <div className="item-department">
              {DepartmentItems?.departmentSeven?.map((item: DepartmentType) => (
                <div className="container-item" key={item.id}>
                  <div className="item">
                    <span>{item.title}</span>
                  </div>
                  {DepartmentItems &&
                    DepartmentItems?.departmentSeven &&
                    DepartmentItems?.departmentSeven?.length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                </div>
              ))}
            </div>
          </div> */}

          <div className="other-refactors">
            {Object.keys(groupedData).map((category) => (
              <div className="item-department" key={category}>
                {groupedData[category].map((item: { id: string; title: string }) => (
                  <div className="container-item" key={item.id}>
                    <div className="item">
                      <span>{item.title}</span>
                    </div>
                    {groupedData[category].length > 1 && (
                      <React.Fragment>
                        <div className="technic-line"></div>
                        <div className="technic-line2"></div>
                      </React.Fragment>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
