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

const calculateExercises = (args: string[]): Results => {
  const argsObj = getArguments(args);
  const target = argsObj.target;
  const periodLength = argsObj.trainingDays.length;
  const trainingDays = argsObj.trainingDays.filter(d => d !== 0).length;
   
  const weeklyhours =  argsObj.trainingDays.reduce((a,b) => a + b, 0);
  const averageHours = weeklyhours/argsObj.trainingDays.length;
 
  const average = averageHours;
  const success = averageHours >= argsObj.target;
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
    calculateExercises(process.argv);
  } 
  catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

console.log(calculateExercises(process.argv));