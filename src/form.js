import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import classNames from 'classnames';

import './styles/App.scss';
import downarrow from './images/down-arrow.svg'

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			attendingGuests: '',
			streetAddress: '',
			apt: '',
			city: '',
			province: 'Province/Territory',
			postalCode: '',
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
			attendingGuests,
			streetAddress,
			apt,
			city,
			province,
			postalCode,
		} = this.state;
		const { history: { push } } = this.props;
		e.preventDefault();
		this.setState({ submitting: true });
		axios({
			method: 'get',
			url: 'https://script.google.com/macros/s/AKfycbznfveWEZ2s2fTLWksT-8DeMdmHC57jsQW0mAIyRq40EN5asmHy/exec',
			responseType: 'json',
			params: {
					attendingGuests,
					streetAddress,
					apt,
					city,
					province,
					postalCode,
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
				<h2 className="form__header">Kendra + André invite you to reserve <span>September 25<sup>th</sup>, 2021</span> to join them in celebrating their wedding in <span>Honeywood, Ontario</span>.</h2>
				<h2>Please enter your mailing address and the names of each attending guest for the formal invitation.</h2>
				<form onSubmit={this.handleSubmit}>
					<label>Attending Guest(s)*
						<input name="attendingGuests" type="text" value={value} onChange={this.handleInputChange} required />
					</label>
					<label>
						Street Address*
						<input name="streetAddress" type="text" value={value} onChange={this.handleInputChange} required />
					</label>
					<label>Apt/Suite
						<input name="apt" type="text" value={value} onChange={this.handleInputChange} />
					</label>
					<label>City*
						<input name="city" type="text" value={value} onChange={this.handleInputChange} required />
					</label>
					<label>Province/Territory*
					<select
						name="province"
						value={value}
						onChange={this.handleInputChange}
						required
						defaultValue=""
					>
						<option value="" disabled hidden></option>
						<option value="NL">NL</option>
						<option value="PE">PE</option>
						<option value="NS">NS</option>
						<option value="NB">NB</option>
						<option value="QC">QC</option>
						<option value="ON">ON</option>
						<option value="MB">MB</option>
						<option value="SK">SK</option>
						<option value="AB">AB</option>
						<option value="BC">BC</option>
						<option value="YT">YT</option>
						<option value="NT">NT</option>
						<option value="NU">NU</option>
						</select>
						<img className="down-arrow" src={downarrow} alt="Drop down arrow" />
					</label>
					<label>Postal Code*
						<input name="postalCode" type="text" value={value} onChange={this.handleInputChange} required />
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
				</section>
			);
	}
}

export default withRouter(Form);
