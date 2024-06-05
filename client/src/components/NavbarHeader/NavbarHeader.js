import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './NavbarHeader.css';
import lightbulbIcon from '../../img/lightbulb.svg';


function NavbarHeader({ activetab = 0}) {

	let isDarkMode = false;
	// SET CURRENT TAB ACTIVE
	
	function darknightToggle() {
		console.log('changing color theme to: ', `${isDarkMode?'light':'dark'}`);
		const navbarelement = document.querySelector('.header-gradient');
		const brandtitle = document.querySelector('.brand-title');
		const navlink = document.querySelectorAll('.nav-link');
		const prodSection = document.querySelector('.products-section');
		if (isDarkMode) {
			prodSection.style.backgroundColor = '#f3f3f3';
			navbarelement.style.backgroundColor = '#f3f3f3' ;
			brandtitle.style.color = '#000';
			navlink.forEach((i,ii) => i.style.color = '#000');
			isDarkMode = false;
		} else {
			prodSection.style.backgroundColor = '#000';
			navbarelement.style.backgroundColor = '#000' ;
			brandtitle.style.color = '#fff';
			navlink.forEach((i,ii) => i.style.color = '#fff');
			// change icon color too
			document.getElementById('togglethemebtn').style.backgroundColor = 'white'
			isDarkMode = true;
		}
	}

    return (
<header className="header-gradient">
	<div className="row p-3 pb-0 text-center">
		<div className="col-sm-6 col-md-6 col-lg-3">
			<h2 className="navbar-brand">
				<a className="brand-title" href="/">evento</a>
			</h2>
		</div>

		<div className="col-sm-4 col-md-4 col-lg-6">
			<nav className="navbar navbar-expand navbar-dark align-items-center justify-content-center">
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav m-auto">
					  <li className="nav-item">
						  <Link to="/complete" className={`${ activetab === 1 ? 'nav-link active-tab' : 'nav-link' }`}  data-route="complete">
					    	Previous
						  </Link>
					  </li>
					  <li className="nav-item">
							<Link to="/current" className={`${ activetab === 2 ? 'nav-link active-tab' : 'nav-link' }`} data-route="current">
	   							Today
							</Link>
					  </li>
						  <li className="nav-item">
							  <Link to="/coming" className={`${ activetab === 3 ? 'nav-link active-tab' : 'nav-link' }`}  data-route="coming">
						    	Upcoming
							</Link>
					  </li>
					</ul>
				</div>
			</nav>
		</div>

		<div className="col-3 d-lg-block icons-wrapper">
			<div className="basket-wrapper">
				
               
				<div className="basket-btn">
					<img src={lightbulbIcon} id="togglethemebtn" onClick={ () => darknightToggle() } alt="cart" />
				</div>
			</div>
		</div>
	</div>
</header>
    );
}

export default NavbarHeader;