// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  setFormState, 
} from '../../actions/officeFormActions';
import {
  removeOfficeDB as removeOffice, 
  fetchOfficesDB as fetchOffices   
} from '../../actions/officesActions';
import { isString } from '../../helperFunctions';

import type { ThunkAction } from '../../flow-types';
import type { Office } from '../../flow-types/officeFormTypes';
import type { OfficesState } from '../../flow-types/officesTypes';

import OfficeForm from '../OfficeForm/OfficeForm';
import OfficeList from '../OfficeList/OfficeList';

import './Offices.css';

type OfficeProps = {
  offices: OfficesState,
  removeOffice: ThunkAction,
  editOffice: ThunkAction,
  fetchOffices: ThunkAction
};
type OfficeState = {
  isFormOpen: boolean
};

class Offices extends Component<OfficeProps, OfficeState> {
	state = {
		isFormOpen: false
	}

	componentDidMount = () => {
		this.props.fetchOffices();
	}

	toggleForm = () => {
		this.setState({ isFormOpen: !this.state.isFormOpen });
	}

	closeForm = () => {
		this.setState({ isFormOpen: false });
	}

	handleEditOffice = (office: Office): void => {
		if (!(office && office.hasOwnProperty('id') && isString(office.id))) {
	  		alert('Something went wrong.');
			return;
		}
		this.setState({ isFormOpen: true });
		this.props.editOffice(office);
	}

	handleRemoveOffice = (officeId: string): void => {
		if (!(officeId && isString(officeId))) {
			alert('Something went wrong.');
			return;
		}
		this.props.removeOffice(officeId);
	}

	render() {
	    const { isFormOpen } = this.state;
	    const { offices } = this.props;
	    const officesLength = offices.length;

		return (
			<div className="Offices">
				<div className="Offices__row Offices__margin_bottom">
					<button className="btn btn__light btn__big" onClick={this.toggleForm}>Add New Office</button>
					<span>{officesLength} Offices</span>
				</div>
				{isFormOpen &&
					<OfficeForm closeForm={this.closeForm} />
				}
				<OfficeList offices={offices} 
				          	removeOffice={this.handleRemoveOffice} 
	            			editOffice={this.handleEditOffice} />
	        </div>
		);
	}
}

const mapStateToProps = state => {
  return {
    offices: state.offices
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    removeOffice: removeOffice,
    editOffice: setFormState,
    fetchOffices: fetchOffices
  }, dispatch)

Offices.propTypes = {
  offices: PropTypes.array.isRequired,
  removeOffice: PropTypes.func.isRequired,
  editOffice: PropTypes.func.isRequired,
  fetchOffices: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Offices);
