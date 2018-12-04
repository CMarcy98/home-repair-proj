import React, { Component } from 'react';
import { Jumbotron, Button, Carousel } from 'react-bootstrap';
import './index.css';
import raccoon from './img/raccoon.jpg';
import repair from './img/repair.jpg';
import plumber from './img/plumbing-repair.jpg';
import mechanic from './img/mechanic.jpg';
import family from './img/family.jpg';
import logo from './img/coonlogo.jpg';

export default class IndexPage extends Component {
	render() {
		return (
			<div id="index_container" className="container">

				<Carousel id="index_carousel">

				<Carousel.Item>
					<img id="index_car_img" width={900} height={500} alt="900x500" src={raccoon} />
					<Carousel.Caption>
					<Jumbotron id="index_jumbo">
						<h2 id="index_h2" >Raccoon Repair</h2>

						<p id="index_para">
							This is a home repair website to connect customers who have problems in their home with competent people who can fulfill their household problems.
						</p>
						<p>
							<Button bsStyle="primary">Learn more</Button>
						</p>
					</Jumbotron>
					</Carousel.Caption>
				</Carousel.Item>

					<Carousel.Item>
						<img id="index_car_img" width={900} height={500} alt="900x500" src={repair} />
						<Carousel.Caption>
						<Jumbotron id="index_jumbo">
							<h2 id="index_h2" >Ease of Use</h2>

							<p id="index_para">
								Home repair is as easy as it has ever been. All you have to do is submit a claim ticket and then choose which service provider best suites you.
							</p>
							<p>
								<Button bsStyle="primary">Learn more</Button>
							</p>
						</Jumbotron>
						</Carousel.Caption>
					</Carousel.Item>

					<Carousel.Item>
						<img id="index_car_img" width={900} height={500} alt="900x500" src={plumber} />
						<Carousel.Caption>
						<Jumbotron id="index_jumbo">
							<h2 id="index_h2" >Provided Services</h2>

							<p id="index_para">
								Raccoon Repair offers a wide variety of home repair services you may need. This site offers a plethora of provider options to choose from.
								We guarentee you will not be displeased.
							</p>
							<p>
								<Button bsStyle="primary">Learn more</Button>
							</p>
						</Jumbotron>
						</Carousel.Caption>
					</Carousel.Item>

					<Carousel.Item>
						<img id="index_car_img" width={900} height={500} alt="900x500" src={mechanic} />
						<Carousel.Caption>
						<Jumbotron id="index_jumbo">
							<h2 id="index_h2" >Sign Up</h2>

							<p id="index_para">
								Sign-up from the Customer drop down to submit a claims ticket. If you are a service provider, you can register your company through the Provider sign-up drop down.
							</p>
							<p>
								<Button bsStyle="primary">Learn more</Button>
							</p>
						</Jumbotron>
						</Carousel.Caption>
					</Carousel.Item>

					<Carousel.Item>
						<img id="index_car_img" width={900} height={500} alt="900x500" src={family} />
						<Carousel.Caption>
						<Jumbotron id="index_jumbo">
							<h2 id="index_h2" >Happy Home</h2>

							<p id="index_para">
								This family may or could probably be an accurate depiction of you once you file a home repair claim through Raccoon Repair. Don't delay your home renovation needs!
							</p>
							<p>
								<Button bsStyle="primary">Learn more</Button>
							</p>
						</Jumbotron>
						</Carousel.Caption>
					</Carousel.Item>

					</Carousel>

			</div>
		);
	}
}
