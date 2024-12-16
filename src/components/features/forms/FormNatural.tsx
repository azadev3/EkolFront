import React, { ChangeEvent, FormEvent } from 'react';
// import ReCAPTCHA from "react-google-recaptcha";
import { C, EnterprisePart, EnterprisePartTypes, TypeOfRequest, TypeOfRequestData } from './FormLegal';
import { Baseurl } from '../../../Baseurl';
import axios from 'axios';

const FormNatural: React.FC = () => {
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

 //reCAPTCHA
 //   const RECAPTCHA_SITE_KEY = "6LfhhDIqAAAAAMeMLpnKC2ys9LikCnlFJnnKBvQX";
 //   const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

 //   const handleCaptchaChange = (value: string | null) => {
 //     setCaptchaValue(value);
 //     console.log("Captcha value:", value);
 //   };

 //form natural values for server
 //or is form legal or natural
 const [voen, setVoen] = React.useState<string>('');
 const [name, setName] = React.useState<string>('');
 const [surname, setSurname] = React.useState<string>('');
 const [mobtel, setMobTel] = React.useState<string>('');
 const [email, setEmail] = React.useState<string>('');
 const [country, setCountry] = React.useState<string>('');
 const [location, setLocation] = React.useState<string>('');
 const [enterprisename, setEnterpriseName] = React.useState<string>('');
 const [enterpriseNameOrTel, setEnterPriseNameOrTel] = React.useState<string>('');
 const [enterprisepart, setEnterprisePart] = React.useState<string>('');
 const [typeofrequest, setTypeOfRequest] = React.useState<string>('');
 const [requestpdf, setRequestPdf] = React.useState<File | null>(null);
 const [message, setMessage] = React.useState<string>('');

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
   voen: voen,
   name: name,
   surname: surname,
   mobtel: mobtel,
   email: email,
   location: location,
   enterprisename: enterprisename,
   enterpriseNameOrTel: enterpriseNameOrTel,
   enterprisepart: enterprisepart,
   typeofrequest: typeofrequest,
   message: message,
   country: country,
  };

  const formData = new FormData();

  Object.keys(dataForDB).forEach((key) => {
   if (dataForDB[key] !== null) {
    formData.append(key, dataForDB[key]);
   }
  });

  if (requestpdf) {
   formData.append('requestpdf', requestpdf);
  }

  try {
   const response = await axios.post(`${Baseurl}/purchaseNaturalForm`, formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
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

 type EnterprisesType = {
  _id: string;
  name: [{ _id: string; value: string }];
 };
 const [enterprises, setEnterprises] = React.useState<EnterprisesType>();
 const handleGetEnterprises = async () => {
  try {
   const res = await axios.get(`${Baseurl}/add-enterprise`, {
    headers: {
     'Content-Type': 'application/json',
    },
   });

   if (res.data) {
    setEnterprises(res.data[0]);
   } else {
    console.log(res.status);
   }
  } catch (error) {
   console.log(error);
  }
 };

 React.useEffect(() => {
  handleGetEnterprises();
 }, []);

 return (
  <form className="form-natural" acceptCharset="UTF-8" onSubmit={handleSubmit}>
   <section className="company-and-voen">
    {/* voen */}
    <div className="input-field">
     <label htmlFor="voen">
      VÖEN <span>*</span>
     </label>
     <input
      onChange={(e: ChangeEvent<HTMLInputElement>) => setVoen(e.target.value)}
      required
      type="text"
      name="voen"
      placeholder="VÖEN"
      id="voen"
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
      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      name="name"
      placeholder="Müraciət edənin adı"
      id="name"
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
      onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
      placeholder="Müraciət edənin soyadı"
      id="surname"
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
      type="text"
      name="email"
      placeholder="E-poçt"
      id="email"
      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
      <option value="">Bir ölkə seçin</option>
      {countryData && countryData?.length > 0 ? (
       countryData?.map((data: C) =>
        data.countries && data.countries?.length > 0
         ? data.countries?.map((c) => (
            <option value={c?.country} key={c?._id}>
             {c.country}
            </option>
           ))
         : ''
       )
      ) : (
       <option value="">Ölkə yoxdur</option>
      )}
     </select>
    </div>
   </section>

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
    <select
     name="enterprise"
     id="enterprise"
     onChange={(e: ChangeEvent<HTMLSelectElement>) => setEnterpriseName(e.target.value)}>
     <option value="">
      Müəssisə <span>*</span>
     </option>
     {enterprises && enterprises?.name?.length > 0 ? (
      enterprises?.name?.map((names, i: number) => (
       <option value={names?.value} key={i + 1}>
        {names?.value}
       </option>
      ))
     ) : (
      <option value="">Müraciət növü yoxdur</option>
     )}
    </select>
   </section>

   <section className="enterprise-name-and-part">
    {/* enterprise name or phone */}
    <div className="input-field">
     <label htmlFor="enterpriseNameOrPhone">
      Müsabiqənin adı və ya nömrəsi
      <span>*</span>
     </label>
     <input
      onChange={(e: ChangeEvent<HTMLInputElement>) => setEnterPriseNameOrTel(e.target.value)}
      required
      type="text"
      name="enterpriseNameOrPhone"
      placeholder="Müsabiqənin adı və ya nömrəsi"
      id="enterpriseNameOrPhone"
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
      <option value="">Müsabiqə mərhələsi seçin</option>
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
     <option value="">Müraciətin növünü seçin</option>
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
     <input onChange={handleFileChange} type="file" accept=".pdf, .doc, .docx" name="requestpdf" id="requestpdf" />
    </div>
   </section>

   <section className="message" style={{ marginTop: '24px' }}>
    <label htmlFor="message">
     Mesaj <span>*</span>
    </label>
    <textarea
     name="message"
     id="message"
     onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}></textarea>
   </section>
   {/* 
      <div className="captcha-container">
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
      </div> */}

   <button type="submit">Göndər</button>
  </form>
 );
};

export default FormNatural;
