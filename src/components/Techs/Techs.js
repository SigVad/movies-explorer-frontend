// компонент с использованными технологиями.
import React from "react";
import "./Techs.css";

function Techs(props) {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__section">
          <p className="techs__section-text">HTML</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">CSS</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">JS</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">React</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">Git</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">Express.js</p>
        </li>
        <li className="techs__section">
          <p className="techs__section-text">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;