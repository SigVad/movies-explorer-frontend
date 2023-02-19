// компонент с навигацией по странице «О проекте»
import './NavTab.css';

function NavTab() {
 return (
	<nav className="navtab">
		<a href="#about-project" className='navtab__link'>О проекте</a>
		<a href="#techs" className='navtab__link'>Технологии</a>
		<a href="#about-me" className='navtab__link'>Студент</a>
	</nav>
 )
}

export default NavTab;