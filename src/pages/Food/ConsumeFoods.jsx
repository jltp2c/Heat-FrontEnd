function ConsumeFoods({ oneFood}) {


  return (
      <div className="containerFoodConsumed">
            <h3>My Meal</h3>
              {oneFood.map(food => {
                return <p>{food.name}</p>
              })}
          </div>
  )
}

export default ConsumeFoods