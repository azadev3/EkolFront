import React, { ChangeEvent } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useTranslate } from "../../context/TranslateContext";
import FormLegal from "./forms/FormLegal";
import FormNatural from "./forms/FormNatural";
import { atom, useRecoilState } from "recoil";

export const radioValueState = atom<string>({
     key: "radioValueState",
     default: "",
});

const PurchaseContact: React.FC = () => {
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
     if(radioValue === "legal") {
          setFormLegal(true);
          setFormNatural(false);
     } else if (radioValue === "natural") {
          setFormNatural(true);
          setFormLegal(false);
     }
  }, [radioValue]);


  return (
    <main className="purch-contact-wrapper">
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
                  <label htmlFor="legal">Hüquqi şəxs</label>
                </div>

                <div className="natural">
                  <input onChange={handleRadio} type="radio" id="natural" name="personType" value="natural" />
                  <label htmlFor="natural">Fiziki şəxs</label>
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
