import React, { ChangeEvent } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import FormLegal from "./forms/FormLegal";
import FormNatural from "./forms/FormNatural";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { DefaultMeta, MetaDataType } from "../../routes/Home";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { HelmetTag } from "../../main";
import '../../styles/purchasecontact.scss';

export const radioValueState = atom<string>({
  key: "radioValueState",
  default: "",
});

const PurchaseContact: React.FC = () => {

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { translations } = useTranslate();

  //rendered form the selected radio values
  const [radioValue, setRadioValue] = useRecoilState(radioValueState);

  //render form component to states
  const [formLegal, setFormLegal] = React.useState<boolean>(true);
  const [formNatural, setFormNatural] = React.useState<boolean>(false);

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  React.useEffect(() => {
    if (radioValue === "legal") {
      setFormLegal(true);
      setFormNatural(false);
    } else if (radioValue === "natural") {
      setFormNatural(true);
      setFormLegal(false);
    }
  }, [radioValue]);

  const { data: MetaData } = useQuery<MetaDataType>({
    queryKey: ['meta_satinalmaelaqe_key', selectedLang],
    queryFn: async () => {
      const res = await axios.get(`${Baseurl}/meta-tags-satinalmaelaqe-front`, {
        headers: {
          "Accept-Language": selectedLang,
        }
      });
      return res.data[0];
    }
  });
  const hasMeta: MetaDataType = MetaData && Object.values(MetaData)?.length > 0 ? MetaData : DefaultMeta;

  return (
    <main className="purch-contact-wrapper">
      <HelmetTag>
        <meta charSet="utf-8" />
        <title>{hasMeta?.meta_title}</title>
        <meta name="title" content={hasMeta?.meta_title} />
        <meta name="description" content={hasMeta?.meta_description} />
        <meta name="generator" content={hasMeta?.meta_generator} />
        <meta name="author" content={hasMeta?.meta_author} />
      </HelmetTag>
      <section className="purch-contact-section">
        <div className="purch-contact">
          <Breadcrumb prevpage={translations["nav_anasehife"]} uri={translations["nav_haqqimizda_satinalma_elaqeler"]} />

          <div className="container-purch-contact">
            <h2>{translations["nav_haqqimizda_satinalma_elaqeler"]}</h2>

            <div className="form-for-purchase">
              <div className="legal-and-natural-person-checkbox">
                <div className="legal">
                  <input
                    onChange={handleRadio}
                    type="radio"
                    id="legal"
                    name="personType"
                    value="legal"
                    defaultChecked
                  />
                  <label htmlFor="legal">{translations['huquqi_sexs']}</label>
                </div>

                <div className="natural">
                  <input onChange={handleRadio} type="radio" id="natural" name="personType" value="natural" />
                  <label htmlFor="natural">{translations['fiziki_sexs']}</label>
                </div>
              </div>

              {/* rendered forms according to radio inputs */}
              {formLegal ? <FormLegal /> : formNatural ? <FormNatural /> : ""}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PurchaseContact;
