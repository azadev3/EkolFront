import React, { ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Vacations } from "./Vacations";
import Breadcrumb from "../../Breadcrumb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../recoil/Atoms";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslate } from "../../context/TranslateContext";

const VacationFormSchema = yup.object().shape({
  name: yup.string().required("Ad qeyd edilməyib"),
  surname: yup.string().required("Soyad qeyd edilməyib"),
  email: yup.string().email("Düzgün email daxil edin").required("Email qeyd edilməyib"),
  telephone: yup.string().required("Telefon qeyd edilməyib"),
  cv: yup.mixed().required("CV faylı qeyd edilməyib"),
  profile: yup.mixed().required("Profil şəkili qeyd edilməyib"),
});

const RequestVacation: React.FC = () => {
  const { reqid } = useParams<{ reqid: string }>();

  //apply vacation name send to database
  const [applyVacationName, setApplyVacationName] = React.useState<string>("");

  // FETCH VACATIONS
  const selectedlang = useRecoilValue(SelectedLanguageState);

  const { data: vacationData } = useQuery<Vacations[]>({
    queryKey: ["vacationsDataKey", selectedlang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/vacationsfront`, {
        headers: {
          "Accept-Language": selectedlang,
        },
      });
      return response.data;
    },
    staleTime: 1000000,
  });

  const requestVacation =
    vacationData &&
    vacationData?.find((item: Vacations) => {
      return item?.title.toLowerCase() === reqid?.toLowerCase();
    });

  React.useEffect(() => {
    if (requestVacation && requestVacation.title) {
      setApplyVacationName(requestVacation.title);
    }
  }, [requestVacation]);

  // form image preview
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const handlePreview = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //preview cv, cv name, cv file size..
  const [previewCV, setPreviewCV] = React.useState<string>("");
  const [cvName, setCvName] = React.useState<string>("");
  const [cvSize, setCvSize] = React.useState<number>(0);
  const [cvError, setCvError] = React.useState<string>("");

  const handlePreviewCV = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file.size > 3 * 1024 * 1024) {
        // 3 MB
        setCvError("Fayl ölçüsü 3MB keçməməlidir");
        return;
      }
      setCvName(file.name);
      setCvSize(file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCV(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCvError("");
    }
  };

  //loading form
  const [loading, setLoading] = React.useState<boolean>(false);
  //if sended the request set new success component
  const [newComponent, setNewComponent] = React.useState<boolean>(false);
  const { translations } = useTranslate();


  return (
    <section className="vacations-request">
      <div className="vacationrequest">
        <Breadcrumb prevpage={translations['nav_anasehife']} uri={requestVacation?.title || ""} />
        {newComponent ? (
          <div className="success-container">
            <div className="content">
              <div className="verify-and-text">
                <div className="verify">
                  <img src="/success.svg" alt="success" />
                </div>
                <p>{translations['muracietiniz_ugurla_gonderildi']}</p>
              </div>
              <Link to='/' className="get-home">
              <span>{translations['ana_sehifeye_qayit_title']}</span>
              <img src="/r.svg" alt="icon-right" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="container-vacation-request">
            <article className="vacation-top-description">
              <div className="texts">
                <h3>{requestVacation?.title}</h3>
                <div className="titles">
                  <span className="title">{requestVacation?.title}</span>
                  <span className="dot"></span>
                  <span className="title">{requestVacation?.location}</span>
                  <span className="dot"></span>
                  <span className="title">{requestVacation?.workRegime}</span>
                  <div className="time-and-view">
                    <article>
                      <img
                        src="/dates.png"
                        alt="date"
                        title={`${requestVacation?.startDate || ""} - ${requestVacation?.endDate || ""}`}
                      />
                      <p>
                        {requestVacation?.startDate || ""} - {requestVacation?.endDate || ""}
                      </p>
                    </article>
                    {/* <article>
                      <img src="/eyy.png" alt="views" title="Baxış sayı" />
                      <p>112 baxış</p>
                    </article> */}
                  </div>
                </div>
              </div>
            </article>

            {/* FORM */}
            <div className="form-vac-request">
              <Formik
                initialValues={{
                  name: "",
                  surname: "",
                  email: "",
                  telephone: "",
                  cv: null,
                  profile: null,
                }}
                validationSchema={VacationFormSchema}
                onSubmit={async (values, { resetForm }) => {
                  setLoading(true);
                  try {
                    const formData = new FormData();
                    //send current apply date
                    const date = new Date();
                    const currentDate = moment(date).format("DD-MM-YYYY");
                    formData.append("name", values.name);
                    formData.append("surname", values.surname);
                    formData.append("email", values.email);
                    formData.append("telephone", values.telephone);
                    formData.append("cv", values.cv ? values.cv : "");
                    formData.append("profile", values.profile ? values.profile : "");
                    formData.append("apply_vacation_name", applyVacationName);
                    formData.append("applyDate", currentDate);

                    const response = await axios.post(`${Baseurl}/applyvacation`, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    if (response.data) {
                      toast.success("Təşəkkür edirik! Məlumatlarınız qarşı tərəfə göndərildi.", {
                        position: "top-center",
                        style: { backgroundColor: "black", color: "white" },
                      });
                      resetForm();
                      const timeout = setTimeout(() => {
                          setNewComponent(true);
                      }, 600);
                      return () => {
                        clearTimeout(timeout);
                      };
                    } else {
                      console.log(response.status);
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setLoading(false);
                  }
                }}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="field-input">
                      <Field type="text" placeholder={translations['name']} name="name" />
                      <ErrorMessage name="name" component="p" className="error-msg" />
                    </div>
                    <div className="field-input">
                      <Field type="text" name="surname" placeholder={translations['soyad']} />
                      <ErrorMessage name="surname" component="p" className="error-msg" />
                    </div>
                    <div className="field-input">
                      <Field style={{ paddingLeft: "55px" }} type="email" placeholder={translations['form_email']} name="email" />
                      <img src="/em.svg" alt="email_icon" />
                      <ErrorMessage name="email" component="p" className="error-msg" />
                    </div>
                    <div className="field-input">
                      <Field style={{ paddingLeft: "65px" }} type="text" placeholder="00 000 00 00" name="telephone" />
                      <span>+994</span>
                      <ErrorMessage name="telephone" component="p" className="error-msg" />
                    </div>
                    <div className="field-file">
                      <label htmlFor="cv">{translations['cv_ucun_click_edin']}</label>
                      <div className="upload-cv">
                        <input
                          type="file"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          onChange={(event) => {
                            setFieldValue("cv", event.currentTarget.files ? event.currentTarget.files[0] : ""),
                              handlePreviewCV(event);
                          }}
                        />

                        {previewCV ? (
                          <div className="preview-cv">
                            {cvName && (
                              <p>
                                {translations['secilen_fayl_title']} <strong>{cvName}</strong>
                              </p>
                            )}
                            {cvSize > 0 && (
                              <p>
                                {translations['fayl_olcusu_title']} <strong>{(cvSize / 1024 / 1024).toFixed(2)}</strong> MB
                              </p>
                            )}
                            <span>{translations['deyismek_ucun_clickle']}</span>
                          </div>
                        ) : (
                          <React.Fragment>
                            <article>
                              <img src="/sncq.png" alt="sncq" />
                              <span>{translations['cv_faylini_sec']}</span>
                            </article>
                            <p>{translations['file_required_title']}</p>
                          </React.Fragment>
                        )}
                      </div>
                      {cvError && <p className="error-msg">{cvError}</p>}
                      <ErrorMessage name="cv" component="p" className="error-msg" />
                    </div>
                    <div className="field-file">
                      <label htmlFor="profile">{translations['sekil_ucun_click_edin']}</label>
                      <div className="upload-profile">
                        <input
                          type="file"
                          accept="image/*"
                          name="profile"
                          onChange={(event) => {
                            setFieldValue("profile", event.currentTarget.files ? event.currentTarget.files[0] : ""),
                              handlePreview(event);
                          }}
                        />
                        <article>
                          <img src="/imigg.png" alt="sncq" />
                          <span>{translations['deyismek_ucun_clickle']}</span>
                        </article>
                        <p>PNG, JPG (Max 3 mb)</p>
                        {previewImage && (
                          <div className="preview-image">
                            <img src={previewImage} alt="selected-image" title="Seçdiyiniz şəkil" />
                          </div>
                        )}
                      </div>

                      <ErrorMessage name="profile" component="p" className="error-msg" />
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className={`sendVacationFormButton ${loading ? "deactive-btn" : ""}`}>
                      {loading ? <Loader /> : `${translations['send_button']}`}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RequestVacation;
