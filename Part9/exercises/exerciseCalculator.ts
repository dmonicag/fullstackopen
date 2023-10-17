interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDecription: string,
    target: number,
    average: number
}

let results = {
    periodLength: 0,
    trainingDays: 0,
    target: 0,
    average: 0,
    success: false,
    rating: 0,
    ratingDecription: 'description'    
}

const calculateExercises = (dailyHours: Array<number>, targetHours: number): Results => {

   const days = 7
   results.target = targetHours
   results.periodLength = days

   const weeklyhours =  dailyHours.reduce((a,b) => a + b, 0)

   const averageHours = weeklyhours/days
   results.average = averageHours

   const trainingDays = dailyHours.filter(d => d !== 0)
   results.trainingDays = trainingDays.length

   if(averageHours >= targetHours){
        results.success = true
        results.rating = 3
        results.ratingDecription = "well done! keep it up"
   }
   else if(averageHours < targetHours){
     if(averageHours < 1){
       results.success = false
       results.rating = 0
       results.ratingDecription = "not good, start exercising"
     }
     else if(averageHours > 1 && averageHours <= 2.5){
       results.success = false
       results.rating = 1
       results.ratingDecription = "not bad, can do better"
     }
     else if(averageHours > 2.5 && averageHours <=3.9){
       results.success = true
       results.rating = 2
       results.ratingDecription = "very good"
     }
   }
return results
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))