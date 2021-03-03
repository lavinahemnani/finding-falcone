/**
 * Author: Lavina Hemnani
 * Description: This class component is used to show the planet selection and vehicle selection page along with showing the total time 
 */

import { PropTypes } from 'prop-types';
import React from 'react';
import { API } from '../API/API';
import PlanetSelection from './PlanetSelection';

/**
 * This class component is used to show the planet selection and vehicle selection page along with showing the total time 
 */
class Home extends React.Component {
    /**
     * This is the constructor that will be automatically called, here all the functions used in the page are binded to the class
     * @param {*} props 
     */
    constructor(props){
        super(props);
        /** Component States */
        this.state = {
            planets: [],
            vehicles: [],
            authToken:"",
            selectedPlanets: ["", "", "", ""],
            selectedVehicles: ["", "", "", ""],
            error: "",
            totalTime:0
          };
        /** binding functions to class */
        this.getPlanets=this.getPlanets.bind(this);
        this.getVehicles=this.getVehicles.bind(this);
        this.getAuthToken=this.getAuthToken.bind(this);
        this.updateTotalTime=this.updateTotalTime.bind(this);
        this.incrementVehicleCount=this.incrementVehicleCount.bind(this);
        this.decrementVehicleCount=this.decrementVehicleCount.bind(this);
    }

    /**
     * This function is called before rendering HTML, when props value has been changed
     * @param {*} nextProps 
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.planets && nextProps.vehicles) {
          this.setState({
            planets: nextProps.planets,
            vehicles: nextProps.vehicles
          });
        }
      }
    
    /**
     * This function is called after HTML is rendered
     * It generally contains all the ajax calls
     */
    componentDidMount(){
      this.getPlanets();
      this.getVehicles();
      this.getAuthToken();
      this.updateTotalTime(0);
    }

    /**
     * This function gets the planets by calling the planets API
     */
    getPlanets(){
      const objAPI = new API();
      const result=objAPI.getPlanets();
      result.then((response)=>{
        var planets=response
        this.setState({planets})
      })
    }

    /**
     * This function gets the vehicles by calling the vehicles API
     */
    getVehicles(){
      const objAPI = new API();
      const result=objAPI.getVehicles();
      result.then((response)=>{
        var vehicles=response
        this.setState({vehicles})
      })
    }

    /**
     * This function gets the token by calling the token API
     */
    getAuthToken(){
      const objAPI = new API();
      const result=objAPI.getAuthToken();
      result.then((response)=>{
        var authToken=response.token
        this.setState({authToken})
      })
    }

    /**
     * This function is used to calculate the total time taken to search falcone
     */
    calculateTravelTime = () => {
      const { planets, vehicles, selectedPlanets, selectedVehicles } = this.state;
      let travelTime = 0;
      for (let i = 0; i < selectedPlanets.length; i++) {
        if (selectedPlanets[i] !== "" && selectedVehicles[i] !== "") {
          travelTime +=
            planets.filter(planet => planet.name === selectedPlanets[i])[0]
              .distance /
            vehicles.filter(vehicle => vehicle.name === selectedVehicles[i])[0]
              .speed;
        }
      }
      this.updateTotalTime(travelTime);
    };

    /**
     * This function is called when user selects a vehicle to update the count of that vehicle
     * @param {*} vehicleName 
     * @param {*} isChecked 
     * @param {*} prevSelectedVehicle 
     * @param {*} combination 
     */
    onVehicleCountUpdate = (
      vehicleName,
      isChecked,
      prevSelectedVehicle,
      combination
    ) => {
      const { selectedVehicles } = this.state;
      if (selectedVehicles && selectedVehicles.length) {
        const newSelectedVehicles = selectedVehicles.map(
          (selectedVehicle, vehicleIndex) => {
            if (vehicleIndex === combination - 1) {
              return vehicleName;
            } else {
              return selectedVehicle;
            }
          }
        );
        this.setState(
          {
            selectedVehicles: newSelectedVehicles
          },
          () => this.calculateTravelTime()
        );
      }
      if (isChecked) {
        this.decrementVehicleCount(vehicleName,prevSelectedVehicle);
      } else {
        this.incrementVehicleCount(vehicleName);
      }
    };

    /**
     * This function is used to increment the count of vehicle by 1
     * @param {*} vehicleName 
     */
    incrementVehicleCount(vehicleName){
      const elementsIndex = this.state.vehicles.findIndex(vehicle => vehicle.name === vehicleName )
      let newArray = [...this.state.vehicles];
      newArray[elementsIndex] = {...newArray[elementsIndex], total_no: newArray[elementsIndex].total_no+1}
      this.setState({
        vehicles: newArray
        });
    }

    /**
     * This function is used to decrement the count of vehicle by 1
     * @param {*} vehicleName 
     * @param {*} prevSelectedVehicle 
     */
    decrementVehicleCount(vehicleName,prevSelectedVehicle){
      const elementsIndexDecrement = this.state.vehicles.findIndex(vehicle => vehicle.name === vehicleName )
      let newArrayDecrement = [...this.state.vehicles];
      newArrayDecrement[elementsIndexDecrement] = {...newArrayDecrement[elementsIndexDecrement], total_no: newArrayDecrement[elementsIndexDecrement].total_no-1}
      console.log(newArrayDecrement)
      this.setState({
        vehicles: newArrayDecrement
        },()=>{
        if (prevSelectedVehicle) {
          this.incrementVehicleCount(prevSelectedVehicle);
        }});
    }

    /**
     * This function sets the total time in state variable
     * @param {*} totalTime 
     */
    updateTotalTime(totalTime){
      this.setState({totalTime})
    }

    /**
     * This function is called when the selected planet is changed
     * @param {*} e 
     * @param {*} combination 
     */
    onPlanetChange = (e, combination) => {
      const { selectedPlanets } = this.state;
      if (selectedPlanets && selectedPlanets.length) {
        const newSelectedPlanets = selectedPlanets.map(
          (selectedPlanet, planetIndex) => {
            if (planetIndex === combination - 1) {
              return e.value;
            } else {
              return selectedPlanet;
            }
          }
        );
        this.setState(
          {
            selectedPlanets: newSelectedPlanets
          },
          () => this.calculateTravelTime()
        );
      }
    };

    /**
     * This function is used to reset the selection
     * @param {*} combination 
     */
    resetFilters = combination => {
      //If only a certain planet and vehicle combo is beign reset
      if (combination) {
        this.onVehicleCountUpdate(
          this.state.selectedVehicles[combination - 1],
          false,
          "",
          combination
        );
  
        this.setState(prevState => ({
          selectedVehicles: prevState.selectedVehicles.map(
            (selectedVehicle, index) => {
              if (index === combination - 1) {
                return "";
              } else {
                return selectedVehicle;
              }
            }
          )
        }));
      } else {

        for (var i = 0; i < this.state.selectedVehicles.length; i++) {
          this.onVehicleCountUpdate(
            this.state.selectedVehicles[i],
            false,
            "",
            i + 1
          );
        }
  
        //Only resetting the vehicle filters
        this.setState({
          selectedVehicles: ["", "", "", ""]
        });
      }
    };

    /**
     * This function is used to submit selected data and call the find falcone API to get the search result
     */
    onSubmitData = () => {
      const objAPI=new API();
      var result=objAPI.findFalcone(this.state.selectedVehicles,this.state.selectedPlanets,this.state.authToken)
      result.then((response)=>{
        this.props.history.push('/result',{"status":response.status,"planet_name":response.planet_name,"totalTimeTaken":this.state.totalTime});
      })
      .catch((error) => {
        console.log(error);
    })
    };

    /** To render HTML */
    render(){
        return (
            <div>
                {this.state.planets.length && this.state.vehicles.length ? (
                <div style={{ marginTop: "20px" }}>
                    <h2 style={{ color: "black" }} align="center">
                    Select planets you wish to search in:
                    </h2>
                    {this.state.selectedPlanets.map((selectedPlanet, index) => (
                      <div key={index} className="destination-div">
                        <h3 style={{ color: "black" }} align="center">
                        Destination {index + 1}
                        </h3>
                        <PlanetSelection
                        currentPlanet={selectedPlanet}
                        currentVehicle={this.state.selectedVehicles[index]}
                        selectedPlanets={this.state.selectedPlanets}
                        onPlanetChange={this.onPlanetChange}
                        onVehicleCountUpdate={this.onVehicleCountUpdate}
                        resetFilters={this.resetFilters}
                        combination={index + 1}
                        planets={this.state.planets}
                        vehicles={this.state.vehicles}
                      />
                      </div>
                     ))
                     
                    }
                </div>)
              :""
              }
              <div className="text-class">
                <h4 style={{ color: "black" }} align="center">
                  Time taken : {this.state.totalTime}
                </h4>
                <button
                  className="button-class"
                  onClick={this.onSubmitData}
                >
                  Find Falcone!
                </button>
              </div>
            </div>
        )
    }
}

Home.propTypes = {
  planets: PropTypes.array,
  vehicles: PropTypes.array,
  history: PropTypes.object.isRequired
}

/** export the component */
export default Home;
  