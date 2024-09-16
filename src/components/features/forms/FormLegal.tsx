import React, { ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
// import ReCAPTCHA from "react-google-recaptcha";
import { useRecoilValue } from "recoil";
import { radioValueState } from "../PurchaseContact";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

export type C = {
  _id: string;
  countries: { country: string; _id: string }[];
};

export type CountryTypes = {
  id: string;
  country: string;
};
export type EnterprisePartTypes = {
  id: string;
  partname: string;
};
export type TypeOfRequest = {
  id: string;
  request: string;
};

export const Countries: CountryTypes[] = [
  {
    id: uuidv4(),
    country: "Azərbaycan",
  },
  {
    id: uuidv4(),
    country: "Türkiyə",
  },
  {
    id: uuidv4(),
    country: "Fransa",
  },
  {
    id: uuidv4(),
    country: "İtalya",
  },
];
export const EnterprisePart: EnterprisePartTypes[] = [
  {
    id: uuidv4(),
    partname: "Keyfiyyətin müəyyən olunması",
  },
  {
    id: uuidv4(),
    partname: "Bazar araşdırması",
  },
  {
    id: uuidv4(),
    partname: "Müqavilə",
  },
];
export const TypeOfRequestData: TypeOfRequest[] = [
  {
    id: uuidv4(),
    request: "Ərizə",
  },
  {
    id: uuidv4(),
    request: "Təklif",
  },
  {
    id: uuidv4(),
    request: "Şikayət",
  },
];

const FormLegal: React.FC = () => {
  const [countryData, setCountryData] = React.useState<C[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/purchaseCountries`);
      if (response.data) {
        setCountryData(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //if user selected SECOND RESPONSIBLE PERSON render new form
  const [innerForm, setInnerForm] = React.useState<boolean>(false);

  const handleChangeSelectCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setInnerForm(e.target.checked);
    setIsResponsible(e.target.checked);
  };

  //reCAPTCHA
  //   const RECAPTCHA_SITE_KEY = "6LfhhDIqAAAAAMeMLpnKC2ys9LikCnlFJnnKBvQX";
  //   const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

  //   const handleCaptchaChange = (value: string | null) => {
  //     setCaptchaValue(value);
  //     console.log("Captcha value:", value);
  //   };

  //form legal values for server
  //or is form legal or natural
  const radioValue = useRecoilValue(radioValueState);
  const [company, setCompany] = React.useState<string>("");
  const [voen, setVoen] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [mobtel, setMobTel] = React.useState<string>("");
  const [worktel, setWorkTel] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [other, setOther] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [job, setJob] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [enterprisename, setEnterpriseName] = React.useState<string>("");
  const [enterpriseNameOrTel, setEnterPriseNameOrTel] = React.useState<string>("");
  const [enterprisepart, setEnterprisePart] = React.useState<string>("");
  const [typeofrequest, setTypeOfRequest] = React.useState<string>("");
  const [requestpdf, setRequestPdf] = React.useState<File | null>(null);
  const [message, setMessage] = React.useState<string>("");
  //is responsibility person chekced ? <form>
  const [isResponsible, setIsResponsible] = React.useState<boolean>(false);
  const [namesecond, setNameSecond] = React.useState<string>("");
  const [surnamesecond, setSurnameSecond] = React.useState<string>("");
  const [mobtelsecond, setMobTelSecond] = React.useState<string>("");
  const [worktelsecond, setWorkTelSecond] = React.useState<string>("");
  const [emailsecond, setEmailSecond] = React.useState<string>("");
  const [othersecond, setOtherSecond] = React.useState<string>("");

  //send pdf file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRequestPdf(file);
    }
  };

  //send form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForDB: any = {
      formMainType: radioValue === "" ? "legal" : "natural",
      company: company,
      voen: voen,
      name: name,
      surname: surname,
      mobtel: mobtel,
      worktel: worktel,
      email: email,
      other: other,
      country: country,
      job: job,
      location: location,
      enterprisename: enterprisename,
      enterpriseNameOrTel: enterpriseNameOrTel,
      enterprisepart: enterprisepart,
      typeofrequest: typeofrequest,
      message: message,
      isResponsible: isResponsible,
      namesecond: namesecond,
      surnamesecond: surnamesecond,
      mobtelsecond: mobtelsecond,
      worktelsecond: worktelsecond,
      emailsecond: emailsecond,
      othersecond: othersecond,
    };

    const formData = new FormData();

    Object.keys(dataForDB).forEach((key) => {
      if (dataForDB[key] !== null) {
        formData.append(key, dataForDB[key]);
      }
    });

    if (requestpdf) {
      formData.append("requestpdf", requestpdf);
    }

    try {
      const response = await axios.post(`${Baseurl}/purchaseLegalForm`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        console.log(response.data);
        window.location.reload();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <form className="form-legal" acceptCharset="UTF-8" onSubmit={handleSubmit}>
      <section className="company-and-voen">
        {/* company */}
        <div className="input-field">
          <label htmlFor="company">
            Şirkətin adı <span>*</span>
          </label>
          <input
            required
            type="text"
            name="company"
            placeholder="Şirkətin adı"
            id="company"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
          />
        </div>
        {/* voen */}
        <div className="input-field">
          <label htmlFor="voen">
            VÖEN <span>*</span>
          </label>
          <input
            required
            type="text"
            name="voen"
            placeholder="VÖEN"
            id="voen"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVoen(e.target.value)}
          />
        </div>
      </section>

      <section className="requested-person-name-surname">
        {/* name */}
        <div className="input-field">
          <label htmlFor="name">
            Müraciət edənin adı
            <span>*</span>
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Müraciət edənin adı"
            id="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        {/* surname */}
        <div className="input-field">
          <label htmlFor="surname">
            Müraciət edənin soyadı
            <span>*</span>
          </label>
          <input
            required
            type="text"
            name="surname"
            placeholder="Müraciət edənin soyadı"
            id="surname"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
          />
        </div>
      </section>

      <section className="mobile-and-job-tel-number">
        {/* mobile number */}
        <div className="input-field">
          <label htmlFor="mobiletel">
            Mobil telefon nömrəsi
            <span>*</span>
          </label>
          <input
            required
            type="number"
            name="mobiletel"
            placeholder="Mobil telefon nömrəsi"
            id="mobiletel"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMobTel(e.target.value)}
          />
        </div>
        {/* work tel number */}
        <div className="input-field">
          <label htmlFor="worktel">
            İş telefon nömrəsi
            <span>*</span>
          </label>
          <input
            required
            type="number"
            name="worktel"
            placeholder="İş telefon nömrəsi"
            id="worktel"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkTel(e.target.value)}
          />
        </div>
      </section>

      <section className="other-email">
        {/* email */}
        <div className="input-field">
          <label htmlFor="email">
            E-poçt
            <span>*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="E-poçt"
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        {/* other */}
        <div className="input-field">
          <label htmlFor="other">
            Digər
            <span>*</span>
          </label>
          <input
            required
            type="text"
            name="other"
            placeholder="Digər"
            id="other"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOther(e.target.value)}
          />
        </div>
      </section>

      <section className="country-and-job">
        {/* country */}
        <div className="input-field">
          <label htmlFor="country">
            Ölkə
            <span>*</span>
          </label>
          <select
            name="country"
            id="country"
            value={country}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}>
            {countryData && countryData?.length > 0 ? 
              countryData?.map((data: C) =>
                data.countries && data.countries?.length > 0
                  ? data.countries?.map((c) => (
                      <option value={c?.country} key={c?._id}>
                        {c.country}
                      </option>
                    ))
                  : ""
              )
             : (
              <option value="">Ölkə yoxdur</option>
            )}
          </select>
        </div>
        {/* job */}
        <div className="input-field">
          <label htmlFor="job">
            Vəzifə
            <span>*</span>
          </label>
          <input
            required
            type="text"
            name="job"
            placeholder="Vəzifə"
            id="job"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setJob(e.target.value)}
          />
        </div>
      </section>

      <div className="second-responsible-person">
        <div className="check">
          <input
            onChange={handleChangeSelectCheckbox}
            type="checkbox"
            name="secondresponsible"
            id="secondresponsible"
          />
          <label htmlFor="secondresponsible">Şirkət adına ikinci məsul şəxs</label>
        </div>

        <div className={`inner-form ${innerForm ? "actived" : ""}`}>
          <section className="requested-person-name-surname">
            {/* name second */}
            <div className="input-field">
              <label htmlFor="namesecond">
                Müraciət edənin adı
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="text"
                name="namesecond"
                placeholder="Müraciət edənin adı"
                id="namesecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSecond(e.target.value)}
              />
            </div>
            {/* surname */}
            <div className="input-field">
              <label htmlFor="surnamesecond">
                Müraciət edənin soyadı
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="text"
                name="surnamesecond"
                placeholder="Müraciət edənin soyadı"
                id="surnamesecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSurnameSecond(e.target.value)}
              />
            </div>
          </section>

          <section className="mobile-and-job-tel-number">
            {/* mobile number */}
            <div className="input-field">
              <label htmlFor="mobiletelsecond">
                Mobil telefon nömrəsi
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="number"
                name="mobiletelsecond"
                placeholder="Mobil telefon nömrəsi"
                id="mobiletelsecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMobTelSecond(e.target.value)}
              />
            </div>
            {/* work tel number */}
            <div className="input-field">
              <label htmlFor="worktelsecond">
                İş telefon nömrəsi
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="number"
                name="worktelsecond"
                placeholder="İş telefon nömrəsi"
                id="worktelsecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkTelSecond(e.target.value)}
              />
            </div>
          </section>

          <section className="other-email">
            {/* email */}
            <div className="input-field">
              <label htmlFor="emailsecond">
                E-poçt
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="text"
                name="emailsecond"
                placeholder="E-poçt"
                id="emailsecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailSecond(e.target.value)}
              />
            </div>
            {/* other */}
            <div className="input-field">
              <label htmlFor="othersecond">
                Digər
                <span>*</span>
              </label>
              <input
                required={isResponsible}
                type="text"
                name="othersecond"
                placeholder="Digər"
                id="othersecond"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOtherSecond(e.target.value)}
              />
            </div>
          </section>
        </div>
      </div>

      <section className="location">
        <label htmlFor="location">
          Ünvan <span>*</span>
        </label>
        <textarea
          name="location"
          id="location"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLocation(e.target.value)}></textarea>
      </section>

      <section className="enterprise">
        <label htmlFor="enterprise">
          Müəssisə <span>*</span>
        </label>
        <input
          type="text"
          placeholder="Müəssisənin adı"
          name="enterprise"
          id="enterprise"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEnterpriseName(e.target.value)}
        />
      </section>

      <section className="enterprise-name-and-part">
        {/* enterprise name or phone */}
        <div className="input-field">
          <label htmlFor="enterpriseNameOrPhone">
            Müsabiqənin adı və ya nömrəsi
            <span>*</span>
          </label>
          <input
            required
            type="text"
            name="enterpriseNameOrPhone"
            placeholder="Müsabiqənin adı və ya nömrəsi"
            id="enterpriseNameOrPhone"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEnterPriseNameOrTel(e.target.value)}
          />
        </div>

        {/* enterprise part */}
        <div className="input-field">
          <label htmlFor="enterprisepart">
            Müsabiqə mərhələsi
            <span>*</span>
          </label>
          <select
            name="enterprisepart"
            id="enterprisepart"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setEnterprisePart(e.target.value)}>
            {EnterprisePart && EnterprisePart?.length > 0 ? (
              EnterprisePart?.map((enterprise: EnterprisePartTypes) => (
                <option value={enterprise?.partname} key={enterprise?.id}>
                  {enterprise?.partname}
                </option>
              ))
            ) : (
              <option value="">Mərhələ yoxdur</option>
            )}
          </select>
        </div>
      </section>

      <section className="typeofrequest">
        <label htmlFor="typeofrequest">
          Müraciətin növü
          <span>*</span>
        </label>
        <select
          name="typeofrequest"
          id="typeofrequest"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeOfRequest(e.target.value)}>
          {TypeOfRequestData && TypeOfRequestData?.length > 0 ? (
            TypeOfRequestData?.map((reqtype: TypeOfRequest) => (
              <option value={reqtype?.request} key={reqtype?.id}>
                {reqtype?.request}
              </option>
            ))
          ) : (
            <option value="">Müraciət növü yoxdur</option>
          )}
        </select>
      </section>

      <section className="request-pdf">
        <label htmlFor="requestpdf">
          Müraciətlə bağlı sənəd(lər) <span>*</span>
        </label>
        <div className="input-field">
          <input type="file" accept=".pdf, .doc, .docx" name="requestpdf" id="requestpdf" onChange={handleFileChange} />
        </div>
      </section>

      <section className="message" style={{ marginTop: "24px" }}>
        <label htmlFor="message">
          Mesaj <span>*</span>
        </label>
        <textarea
          name="message"
          id="message"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}></textarea>
      </section>

      {/* <div className="captcha-container">
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
      </div> */}

      <button type="submit">Göndər</button>
    </form>
  );
};

export default FormLegal;