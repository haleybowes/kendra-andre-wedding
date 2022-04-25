import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import classNames from 'classnames';

import './styles/App.scss';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			attending: '',
			numberOfGuests: '',
			howManyNights: '',
			fridayDinner: '',
			foodRestrictions: '',
			additionalQuestions: '',
			songRequest: '',
			submitting: false,
			error: false,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		const {
			attending,
			numberOfGuests,
			howManyNights,
			fridayDinner,
			foodRestrictions,
			additionalQuestions,
			songRequest,
		} = this.state;
		const { history: { push } } = this.props;
		e.preventDefault();
		this.setState({ submitting: true });
		axios({
			method: 'get',
			url: 'https://script.google.com/macros/s/AKfycbznfveWEZ2s2fTLWksT-8DeMdmHC57jsQW0mAIyRq40EN5asmHy/exec',
			responseType: 'json',
			params: {
				attending,
				numberOfGuests,
				howManyNights,
				fridayDinner,
				foodRestrictions,
				additionalQuestions,
				songRequest,
			}
		})
		.then(() => push('/thankyou'))
		.catch(() => this.setState({ error: true }));
	}

	render() {
		const { value, submitting, error } = this.state;
		const buttonClass = classNames('button', 'success', { 'animate': submitting })
		return (
			<section className="form">
				<p className="form__header">Kendra + André together with their families invite you to join us for our wedding on Saturday, June 11th 2022 AT 4PM at Unicamp of Ontario, <a href="https://www.google.com/maps/place/638159+Prince+of+Wales+Rd+W,+Mulmur,+ON+L0N+1H0/@44.21451,-80.1700187,17z/data=!3m1!4b1!4m5!3m4!1s0x882a5eb8e06766a1:0xe08a58c2118dc34c!8m2!3d44.21451!4d-80.16783">638159 Prince of Wales Rd, Mulmur ON L9V 0C5</a>.</p>
				<div className="centered">
					<h2>Saturday</h2>
					<p>The Ceremony begins at 4pm</p>
					<p>Cocktails and appetizers will be served following the ceremony at 4:30</p>
					<p>Dinner will be served buffet style at 6:30</p>
					<p>Speeches around the fire at 7:30</p>
					<p>Band at 8:30</p>
					<p>Bar closed at 12:00</p>
				</div>
				<div className="centered">
					<h2>Sunday</h2>
					<p>Sunday Brunch will be served at 9:30</p>
					<p>Guests have checked out by 1:00</p>
				</div>
				<div>
					<h2 className="centered">All the details</h2>
					<p>Kendra and Andre will be getting married outdoors.  This means guests should dress according to the days forecast and be prepared for mud, bugs and bad weather.  Think collared shirts, ties optional, and bring a rain coat just in case.</p>
					<p>Unicamp is located on the Niagara Escarpment. There is a beach, direct access to the Bruce trail, and basketball courts.  We encourage our guests to enjoy being outdoors, bring their bathing suits and hiking gear and explore the area.</p>
					<p>Weekend accommodations have been assigned, and details have been emailed to each guest.</p>
					<p>Your presence at our wedding is the greatest gift of all. If you wish to contribute further, the couple would appreciate a donation to their honeymoon fund.</p>
				</div>
				<div>
					<h2 className="centered">RSVP</h2>
					<form onSubmit={this.handleSubmit}>
						<label>We'll be there!
							<select
								name="attending"
								value={value}
								onChange={this.handleInputChange}
								required
								defaultValue=""
							>
								<option value="" disabled hidden></option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
						</label>
						<label>If yes, how many will you be?
							<input name="numberOfGuests" type="text" value={value} onChange={this.handleInputChange} />
						</label>
						<label>How many nights will you be with us?
							<select
								name="howManyNights"
								value={value}
								onChange={this.handleInputChange}
								required
								defaultValue=""
							>
								<option value="" disabled hidden></option>
								<option value="Just Friday">Just Friday</option>
								<option value="Just Saturday">Just Saturday</option>
								<option value="Both Friday and Saturday night">Both Friday and Saturday night</option>
							</select>
						</label>
						<label>If you're around on Friday, will you be joining us for dinner?
							<select
								name="fridayDinner"
								value={value}
								onChange={this.handleInputChange}
								defaultValue=""
							>
								<option value="" disabled hidden></option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
						</label>
						<label>
							Do you have any food restrictions or allergies?
							<input name="foodRestrictions" type="text" value={value} onChange={this.handleInputChange} required />
						</label>
						<label>
							Do you have any questions or concerns for us?
							<input name="additionalQuestions" type="text" value={value} onChange={this.handleInputChange} />
						</label>
						<label>
							Song request
							<input name="songRequest" type="text" value={value} onChange={this.handleInputChange} />
						</label>
						{
							error &&
							<p>Oops! Something went wrong while you were submitting the form. Please try again or send an email to <strong>sayhi@kendraandandre.com</strong>.</p>
						}
						<div className="animate submit">
							{
								submitting
									? <button className={buttonClass} />
									: <input type="submit" value="Submit" className={buttonClass} />
							}
						</div>
					</form>
				</div>
				</section>
			);
	}
}

export default withRouter(Form);
