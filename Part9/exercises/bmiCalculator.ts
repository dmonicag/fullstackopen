type Result = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

const weight: number = Number(process.argv[2])
const height: number = Number(process.argv[3])

const calculateBmi = (args: string[]): Result => {
  if(args.length < 4){
    throw new Error("Please add arguments:")
  }

  if(args.length > 4){
    throw new Error("too many arguments")
  }

  if(isNaN(Number(args[2])) || isNaN(Number(args[3]))){
    throw new Error("inputs are not numbers")
  }

  const heightInMeters = Number(args[2])/100
  const bmi = Number(args[3]) / (heightInMeters ** 2)
        
  if(bmi <= 18.5){
    return 'Underweight'
  } else if (bmi > 18.5 && bmi <= 24.9){
    return 'Normal'
  } else if (bmi > 25 && bmi <=29.9){
    return 'Overweight'
  } else 
    return 'Obese'
}

  try{
    calculateBmi(process.argv);
  }
  catch(error: unknown){
    let errorMessage = "Error:"
    if (error instanceof Error){      
      errorMessage += error.message;
    }
    console.log(errorMessage)
  }

console.log(calculateBmi(process.argv));
  
  