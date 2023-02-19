// презентационный компонент, который отрисовывает подвал.import './Footer.css';
import './Footer.css';

function Footer() {
	return (
		<footer className="footer">
			<h3 className='footer__title footer__texts'>Учебный проект Яндекс.Практикум x BeatFilm.</h3>
				<nav className='footer__nav'>
				  <p className='footer__copyright footer__texts'>&copy; 2023</p>
					<a href='https://practicum.yandex.ru/web/' className="footer__link footer__texts" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
					<a href='https://github.com/Dmitryzhur/' className="footer__link footer__texts" target="_blank" rel="noreferrer">Github</a>
				</nav>
		</footer>
	)
}

export default Footer;