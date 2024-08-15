import React from "react";
import { useTranslate } from "../../context/TranslateContext";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import { toast } from "react-toastify";

const CardSubscribe: React.FC = () => {
  const { translations } = useTranslate();

  const [email, setEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const getEmail = async () => {
    if (email.length !== 0) {
      setLoading(true);
      const data = {
        email: email,
      };
      const response = await axios.post(`${Baseurl}/emails`, data);
      try {
        if (response.data) {
          toast.success("Uğurlu!", {
            position: "bottom-right",
          });
          if (inputRef && inputRef.current) {
            inputRef.current.value = "";
          }
        } else {
          console.log(response.status);
          toast.success("Ups! Error...", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="card-for-subscribtion-section">
      <div className="card-for-subscribtion">
        <h2 title={translations["subscribe_paragraph"]}>{translations["subscribe_paragraph"]}</h2>

        <div className="input-email">
          <img src="../letter.svg" alt="email-icon" title="Email" />
          <input
            ref={inputRef}
            type="email"
            required={true}
            placeholder={translations["form_email"]}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className="get-subscribe-button" onClick={getEmail}>
            {loading ? "Loading..." : translations["subscribe_button"]}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardSubscribe;
