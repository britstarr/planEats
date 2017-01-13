import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './MealPlanner.css';
import { FormControl, Button } from 'react-bootstrap';
import axios from 'axios'

class MealPlanner extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email, //TODO: update to get user's ID in location
      mealName: '',
      recipes: [],
      clicked: [],
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: '',
      mealTime: '',
      clickedName: []
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange(meal, index) {
    if (meal.target) { //meal name has been entered
      this.setState({
        mealName: meal.target.value
      });

    }
  }

  handleAddRecipe(name, index) {
    var updateIds = this.state.clicked.slice();
    updateIds.push(index) //push clicked recipe's index to state

    var updatedNames = this.state.clickedName.slice();
    updatedNames.push(name) //push clicked recipe's name to state for rendering

    this.setState({
      clicked: updateIds,
      clickedName: updatedNames
    })
  }

  handleRemove(item) {
    var context = this;
    var updateIds = this.state.clicked.slice();
    updateIds.splice(item, 1);

    var updatedName = this.state.clickedName.slice();
    updatedName.splice(item, 1);

    this.setState({
      clicked: updateIds,
      clickedName: updatedName
    }, function() {
      context.forceUpdate();
    })

  }

  handleSubmit(event) {
    event.preventDefault();
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
    var newMeal = {
      username: this.state.username,
      name: this.state.mealName,
      recipe: JSON.stringify(this.state.clicked)
    };
    this.postMeal(newMeal);
  }

  getRecipes() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('/api/recipe')
      .then(function(recipes) {
      //recipes.data[0] is an object holding a Recipes array. Recipes array has all of the user's recipe objects
      context.setState({
        recipes: recipes.data[0].Recipes
      })
    });
  }

  postMeal(newMeal) {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.post('/api/meals', newMeal)
      .then(function(event){
      console.log("posted", event)
      context.setState({
        mealName: '',
        clicked: [],
        mealTime: ''
      });
    });
  }

  render() {
    return (
      <div className="MPcontainer">
        <div className="recipeBookML">
          <div className="headerMP">
            <text className="MPHeaderText">Click a recipe to add it to your book and write a name for your creation below!</text>
            <form id="newMealForm">
              <FormControl
                id="recipeName"
                type="text"
                value={this.state.mealName}
                onChange={this.handleChange.bind(this)}
                placeholder="Meal Name"
              />
              <Button type="submit" onClick={this.handleSubmit.bind(this)}>Add Meal</Button>
            </form>
            <text>Click an item to remove from your meal</text>
            <ul>
              {this.state.clickedName.map((val, i) => {
                return <li className="mealItems" key={i} onClick={this.handleRemove.bind(this, i)}>{val}</li>
              })}
            </ul>
          </div>
          <ul className="recipeList">
            {this.state.recipes.map((recipe, i) => {
              return <li className="recipeItem" key={recipe.id} onClick={this.handleAddRecipe.bind(this, recipe.name, recipe.id)}>{recipe.name}</li>})}
          </ul>
        </div>
        <div className="addNew">

        </div>
      </div>
    )
  }
}

export default MealPlanner;
