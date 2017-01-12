import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {requireAuth} from '../auth';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Shop from './Shop';
import EditProfile from './EditProfile';
import Calendar from './Calendar';
import Schedule from './ScheduleMeal';
import Book from './RecipeBook';
import Eat from './Eat';
import MealPlanner from './MealPlanner';
import RecipeSearch from './RecipeSearch';
import NewRecipe from './NewRecipe';

class App extends Component {
  render() {
    return (

      <Router history={browserHistory}>
        <Route component={Nav}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route onEnter={requireAuth}>
            {/* Place all authenticated routes here */}
            <Route path="/shop" component={Shop}/>
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/recipe" component={Book} />
            <Route path="/new-recipe" component={NewRecipe} />
            <Route path="/recipeSearch" component={RecipeSearch} />
            <Route path="/meals" component={MealPlanner} />
            <Route path="/eat" component={Eat} />
          </Route>
        </Route>
      </Router>

    );
  }
}

export default App;
