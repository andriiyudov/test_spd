// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
	setInitialFormState, 
	setFormField
} from '../../actions/officeFormActions';
import {
	saveOfficeDB as saveOffice
} from '../../actions/officesActions';

import type { ThunkAction, ActionCreator } from '../../flow-types';
import type { Office } from '../../flow-types/officeFormTypes';

import './OfficeForm.css';

type OfficeFormProps = {
	office: Office,
	saveOffice: ThunkAction,
	setInitialFormState: ActionCreator,
	setFormField: ActionCreator,
	closeForm: () => void
};

class OfficeForm extends Component<OfficeFormProps> {
	handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
    	const name = target.name;
		
		if (!this.props.office.hasOwnProperty(name)) {
			// When there is no name field in office object
			// this field doesn't went to the store for prevent saving useless data 
			alert(`Offce object doesn't have property "${name}"`);
			return;
		}

		this.props.setFormField({[name]: value});
	}

	handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!this.isFormValid()) {
			alert('Please, fill all required field(*)!');
			return;
		}

		this.props.saveOffice({...this.props.office});
		this.handleCancelClick();
	}

	handleCancelClick = (e?: SyntheticInputEvent<HTMLButtonElement>): void => {
		if (e) e.preventDefault();
		this.props.closeForm();
		this.props.setInitialFormState();
	}

	isFormValid = (): boolean => {
		const { country, stateOrProvince, postalCode, city, streetAddress } = this.props.office;

		return !!(country && stateOrProvince && postalCode && city && streetAddress);
	}

	render() {
		const { 
			country, 
			stateOrProvince, 
			postalCode, 
			city, 
			streetAddress, 
			address2, 
			phone, 
			fax, 
			email, 
			officeType 
		} = this.props.office;

		return (
			<div className="OfficeForm">
				<form className="OfficeForm__form" onSubmit={this.handleSubmitForm}>
					<div className="OfficeForm__form_column">
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">*Country:</div>
							<select className={`OfficeForm__form_field ${!country ? 'invalid' : ''}`} name="country" value={country} onChange={this.handleInputChange}>
								<option value="USA">USA</option>
								<option value="Canada">Canada</option>
								<option value="Ukraine">Ukraine</option>
							</select>
						</div>
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">*State/Province:</div>
							<input className={`OfficeForm__form_field ${!stateOrProvince ? 'invalid' : ''}`} autoComplete="off" type="text" name="stateOrProvince" value={stateOrProvince} onChange={this.handleInputChange} />
						</div>
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">*Postal Code:</div>
							<input className={`OfficeForm__form_field ${!postalCode ? 'invalid' : ''}`} autoComplete="off" type="text" name="postalCode" value={postalCode} onChange={this.handleInputChange} />
						</div>
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">*City:</div>
							<select className={`OfficeForm__form_field ${!city ? 'invalid' : ''}`} name="city" value={city} onChange={this.handleInputChange}>
								<option value="New York">New York</option>
								<option value="Toronto">Toronto</option>
								<option value="Kiev">Kiev</option>
							</select>	
						</div>
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">*Street Andress:</div>
							<input className={`OfficeForm__form_field ${!streetAddress ? 'invalid' : ''}`} autoComplete="off" type="text" name="streetAddress" value={streetAddress} onChange={this.handleInputChange} />
						</div>
						<div className="OfficeForm__form_row">
							<div className="text__dark OfficeForm__form_label">Andress 2:</div>
							<input className="OfficeForm__form_field" autoComplete="off" type="text" name="address2" value={address2} onChange={this.handleInputChange} />	
						</div>
					</div>

					<div className="OfficeForm__form_column_wrapper">
						<div className="OfficeForm__form_column">
							<div className="OfficeForm__form_row">
								<div className="text__dark OfficeForm__form_label">Phone:</div>
								<input className="OfficeForm__form_field" autoComplete="off" type="text" name="phone" value={phone} onChange={this.handleInputChange} />
							</div>
							<div className="OfficeForm__form_row">
								<div className="text__dark OfficeForm__form_label">Fax:</div>
								<input className="OfficeForm__form_field" autoComplete="off" type="text" name="fax" value={fax} onChange={this.handleInputChange} />
							</div>
							<div className="OfficeForm__form_row">
								<div className="text__dark OfficeForm__form_label">Email:</div>
								<input className="OfficeForm__form_field" autoComplete="off" type="text" name="email" value={email} onChange={this.handleInputChange} />
							</div>
							<div className="OfficeForm__form_row">
								<div className="text__dark OfficeForm__form_label">Office Type:</div>
								<div className="OfficeForm__form_checkbox_wrapper">
									<input className="OfficeForm__form_checkbox" autoComplete="off" type="checkbox" name="officeType" checked={officeType} onChange={this.handleInputChange} />
									<div>Primary HQ</div>
								</div>
							</div>
						</div>
						<div className="OfficeForm__form_column OfficeForm__column_margin_left">
							<div className="OfficeForm__form_row">
								<button className="btn btn__light" onClick={this.handleCancelClick}>Cancel</button>
								<input className="btn btn__primary OfficeForm__btn_margin_left" type="submit" value="Save" />
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		office: state.officeForm
	}
}

const mapDispatchToProps = dispatch => 
	bindActionCreators({
		saveOffice,
		setInitialFormState,
		setFormField
	}, dispatch);

OfficeForm.propTypes = {
	office: PropTypes.shape({
		country: PropTypes.oneOf(['USA', 'Canada', 'Ukraine']).isRequired,
		stateOrProvince: PropTypes.string.isRequired,
		postalCode: PropTypes.string.isRequired,
		city: PropTypes.oneOf(['New York', 'Toronto', 'Kiev']).isRequired,
		streetAddress: PropTypes.string.isRequired,
		address2: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		fax: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		officeType: PropTypes.bool
	}).isRequired,
	saveOffice: PropTypes.func.isRequired,
	setInitialFormState: PropTypes.func.isRequired,
	setFormField: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeForm);
