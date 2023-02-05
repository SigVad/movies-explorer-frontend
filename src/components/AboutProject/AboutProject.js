// компонент с описанием дипломного проекта.
import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__info list">
        <li className="list__section">
          <h3 className="list__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="list__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="list__section">
          <h3 className="list__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="list__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__diplom-time time'>
          <p className='time__line time__line_theme_black-and-white'>1 неделя</p>
          <p className='time__line time__line_theme_gray-and-black'>4 недели</p>
          <p className='time__line time__line_type_back-sign'>Back-end</p>
          <p className='time__line time__line_type_front-sign'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
