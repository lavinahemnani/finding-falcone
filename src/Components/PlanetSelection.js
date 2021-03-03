/**
 * Author: Lavina Hemnani
 * Description: This class component is used to show the planet selection details (vehicles available for the planet)
 */

import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

/**
 * This class component is used to show the planet selection details (vehicles available for the planet)
 */
class PlanetSelection extends Component {
  /**
   * This is the constructor that will be automatically called, here all the functions used in the page are binded to the class
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    /** Component States */
    this.state = {
      selectedPlanet: "",
      selectedVehicle: this.props.currentVehicle
    };
  }

  /**
   * This function is called on selection of planet
   * @param {*} e 
   */
  onPlanetSelect = e => {
    const { onPlanetChange, combination, resetFilters } = this.props;
    //In case new planet is selected after vehicles have been selected
    if (this.state.selectedVehicle) {
      resetFilters(combination);
    }
    onPlanetChange(e, combination);
    this.setState({ selectedPlanet: e.value });
  };

  /**
   * This functiion is called on the selection of vehicle
   * @param {*} e 
   */
  onVehicleSelect = e => {
    const { onVehicleCountUpdate, combination } = this.props;
    const prevSelectedVehicle =
      this.state.selectedVehicle !== e.target.name
        ? this.state.selectedVehicle
        : null;
    if (e.target.checked) {
      this.setState(
        { selectedVehicle: e.target.name },
        onVehicleCountUpdate(
          e.target.name,
          e.target.checked,
          prevSelectedVehicle,
          combination
        )
      );
    } else {
      this.setState(
        { selectedVehicle: "" },
        onVehicleCountUpdate(
          e.target.name,
          e.target.checked,
          prevSelectedVehicle,
          combination
        )
      );
    }
  };

  /**
   * This function is used to check whether the maximum distance of selected vehicle is less than the distance 
   * need to be covered for the planet
   * @param {*} vehicle 
   */
  checkDistanceFeasibility = vehicle => {
    const selectedPlanetDetails = this.props.planets.filter(
      planet => planet.name === this.state.selectedPlanet
    );

    if (vehicle) {
      if (selectedPlanetDetails[0].distance > vehicle.max_distance) {
        return true;
      } else {
        return false;
      }
    }
  };

  /** to render HTML */
  render() {
    /** prop variables */
    const { selectedPlanets, planets, vehicles, currentVehicle } = this.props;
    /** state variables */
    const { selectedPlanet, selectedVehicle } = this.state;
    /** style variable */
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px solid grey',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'grey' : 'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "5%",
      })
    }
    /** planet list to be rendered */
    const planetList = planets.filter(
      planet =>
        selectedPlanets &&
        selectedPlanets.length &&
        selectedPlanets.indexOf(planet.name) < 0
    ).length
      ? planets.filter(
          planet =>
            selectedPlanets &&
            selectedPlanets.length &&
            selectedPlanets.indexOf(planet.name) < 0
        )
      : planets;
    return (
      <div>
        <Select
          options={
            planetList &&
            planetList.map(planet => ({
              value: planet.name,
              label: planet.name
            }))
          }
          onChange={this.onPlanetSelect.bind(this)}
          styles={customStyles}
        />
        {selectedPlanet &&
          vehicles.map((vehicle,index) => (
            <div className="form-group" style={{ margin: "15px 15px 15px 0 " }} key={index}>
              <input
                type="checkbox"
                name={vehicle && vehicle.name}
                disabled={
                  this.checkDistanceFeasibility(vehicle) ||
                  (!this.checked &&
                    !vehicle.total_no &&
                    selectedVehicle !== vehicle.name)
                }
                checked={
                  currentVehicle !== "" && selectedVehicle === vehicle.name
                }
                onChange={this.onVehicleSelect.bind(this)}
              />
              <label>
                {vehicle.name} ({vehicle.total_no})
              </label>{" "}
            </div>
          ))}
      </div>
    );
  }
}
/** prop types validation */
PlanetSelection.propTypes = {
  planets: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  currentVehicle: PropTypes.string.isRequired,
  selectedPlanets: PropTypes.array.isRequired,
  onPlanetChange : PropTypes.func.isRequired,
  combination : PropTypes.number.isRequired,
  resetFilters : PropTypes.func.isRequired,
  onVehicleCountUpdate : PropTypes.func.isRequired
};

/** export the component */
export default PlanetSelection;
