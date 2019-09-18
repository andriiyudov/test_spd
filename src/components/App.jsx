import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  removeOfficeDB as removeOffice, 
  setFormState, 
  fetchOfficesDB as fetchOffices 
} from '../actionCreators';
import { isString } from '../helperFunctions';

import OfficeForm from './OfficeForm';
import OfficeList from './OfficeList';

import logoSpd from '../images/logo_spd.svg';
import indicator from '../images/indicator.svg'
import './App.css';

class App extends Component {
  state = {
    isFormOpen: false
  }

  componentDidMount = () => {
    this.props.fetchOffices();
  }

  toggleForm = () => {
    this.setState(() => ({ isFormOpen: !this.state.isFormOpen }));
  }

  closeForm = () => {
    this.setState({ isFormOpen: false });
  }

  handleEditOffice = office => {
    if (!(office && office.hasOwnProperty('id') && isString(office.id))) {
      return;
    }

    this.setState({ isFormOpen: true });
    this.props.editOffice(office);
  }

  handleRemoveOffice = officeId => {
    if (!(officeId && isString(officeId))) {
      return;
    }
    this.props.removeOffice(officeId);
  }

  render() {
    const { isFormOpen } = this.state;
    const { offices } = this.props;
    const officesLength = offices.length;

    return (
      <div className="App">
        <div className="App__header App__header_text_styles">
          <div className="App__header_left">
            <img alt="Logo Spd" src={logoSpd} />
            <span className="App__header_margin_left">Profile Editor</span>
          </div>
          <div className="App__header_rigt">
            <span className="App__header_text">Contact</span>
            <span className="App__header_text">FAQs</span>
            <span className="App__header_text">Save and Exit</span>
          </div>
        </div>
        <div className="App__body">
          <div className="App__body_content">
            <div className="App__body_content_right">
              <div className="App__panel_top">
                <img alt="Indicator" src={indicator} />
              </div>
              <div className="App__panel_body App__text_normal">
                <div className="App__panel_block">
                  <div className="App__panel_title">COMPANY INFO</div>
                  <div className="App__panel_normal">Basic Info</div>
                  <div className="App__panel_normal App__panel_bold">Offices</div>
                  <div className="App__panel_normal App__panel_light">Competitors</div>
                </div>
                <div className="App__panel_block">
                  <div className="App__panel_title">MY FIRM</div>
                </div>
                <div className="App__panel_block">
                  <div className="App__panel_title">DEALS</div>
                </div>
                <div className="App__panel_block">
                  <div className="App__panel_title" >FINANCIALS</div>
                </div>
              </div>
            </div>
            <div className="App__body_content_left">
              <div className="App__title">
                <span className="App__title_big">OFFICES</span> <span className="App__title_big App__title_big_grey">| COMPANY INFO</span>
              </div>
              <div className="App__description App__text_normal">
                <span>Updating your location and contact information helps you appeal to regional investors and service providers.</span>
              </div>
              <hr className="App__horizontal_line_dotten" />
              <div className="App__office">
                <div className="App__office_row App__office_margin_bottom">
                  <button className="App__btn_big OfficeForm__btn App__text_bold" onClick={this.toggleForm}>Add New Office</button>
                  <span className="App__text_normal">{officesLength} Offices</span>
                </div>
                {isFormOpen &&
                  <OfficeForm closeForm={this.closeForm} />
                }
                <OfficeList offices={offices} 
                            removeOffice={this.handleRemoveOffice} 
                            editOffice={this.handleEditOffice} />
              </div>
              <hr className="App__horizontal_line_dotten" />
              <div className="App__footer">
                <div className="App__footer_left">
                  <button className="App__btn_big OfficeForm__btn App__text_bold">Back</button>
                  <span className="App__footer_margin_left App__text_normal">Provide additional comments</span>
                </div>
                <div className="App__footer_right">
                  <button className="App__btn_big App__footer_btn OfficeForm__btn App__text_bold App__text_normal">Skip this step</button>
                  <button className="App__btn_big App__footer_btn OfficeForm__btn OfficeForm__style_primary">Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);