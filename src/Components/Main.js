/**
 * Author: Lavina Hemnani
 * Description: This functional component is used to write the navigation links
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Result from './Result';

/**
 * The Main component renders one of the two provided Routes (provided that one matches). The /result route will
 *  match any pathname that starts with /result. The / route will only match
 * when the pathname is exactly the string "/"
 */
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/result' component={Result}/>
    </Switch>
  </main>
)
/** export the component */
export default Main;
