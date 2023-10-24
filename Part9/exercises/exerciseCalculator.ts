import { ratingCalculation, descriptionText, getArguments }from "./utils/helper";

interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, targetHours: number): Results => {
  const target = targetHours;
  const periodLength = hours.length;
  const trainingDays = hours.filter(d => d !== 0).length;
   
  const weeklyhours =  hours.reduce((a,b) => a + b, 0);
  const averageHours = weeklyhours/hours.length;
 
  const average = averageHours;
  const success = averageHours >= targetHours;
  const rating = ratingCalculation(average, target);
  const ratingDescription = descriptionText(rating);

  return { 
    periodLength, 
    trainingDays, 
    success, 
    rating, 
    ratingDescription, 
    target, 
    average 
  };
};

  try {
    const { trainingDays, target} = getArguments(process.argv);
    calculateExercises(trainingDays, target);
  } 
  catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

//console.log(calculateExercises(process.argv));
export default calculateExercises;