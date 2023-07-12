import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';
import {useState,useEffect} from 'react';

const AvailableMeals=()=>{

    const [meals,setMeals]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [httpError,setHttpError]=useState();
    useEffect(()=>{

      const fetchHandler=async()=>{
        const response=await fetch('https://react-http-6d662-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok) {
          throw new Error("Something went wrong");
        }
        
        const data= await response.json();
        let loadedMeals=[];
      for(const key in data)
      {
        loadedMeals.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    
      fetchHandler().catch(error=>{
        setIsLoading(false);
        setHttpError(error.message);
    })
    
    },[])

    if(httpError){return(
      <section className={classes.mealsloading}>
      <p>{httpError}</p>
      </section>
    )}

    if(isLoading) {return(
      <section className={classes.mealsloading}>
      <p>Loading... </p>
      </section>
    )}

    return (
        <Card classes={classes.meals}>
            <ul>
                {meals.map(meal=><MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)}
            </ul> 
        </Card>
    )
  }

export default AvailableMeals;
