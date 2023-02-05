// компонент со ссылками на другие проекты.
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-element">
          <a className="portfolio__link" href="https://github.com/sigvad/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
        <li className="portfolio__link-element">
          <a className="portfolio__link" href="https://github.com/sigvad/russian-travel" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
        <li className="portfolio__link-element">
          <a className="portfolio__link" href="https://github.com/sigvad/react-mesto-api-full" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;