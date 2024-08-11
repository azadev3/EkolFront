import React from "react";
import { useTranslate } from "../../context/TranslateContext";

const CardSubscribe: React.FC = () => {
  const { translations } = useTranslate();

  return (
    <section className="card-for-subscribtion-section">
      <div className="card-for-subscribtion">
        <h2 title={translations["subscribe_paragraph"]}>{translations["subscribe_paragraph"]}</h2>

        <div className="input-email">
          <img src="../letter.svg" alt="email-icon" title="Email" />
          <input type="email" required placeholder="Email" />
          <button className="get-subscribe-button">{translations['subscribe_button']}</button>
        </div>
      </div>
    </section>
  );
};

export default CardSubscribe;
