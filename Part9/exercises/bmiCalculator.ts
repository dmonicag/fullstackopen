type Result = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

interface values {
  inputWeight: number,
  inputHeight: number
}

const parseArgs = (args: string[]): values => {
  if(args.length < 4){
    throw new Error("Please add arguments:")
  }

  if(args.length > 4){
    throw new Error("too many arguments")
  }

  if(isNaN(Number(args[2])) || isNaN(Number(args[3]))){
    throw new Error("inputs are not numbers")
  }

  return {
    inputWeight: Number(args[2]),
    inputHeight: Number(args[3])
  }
}

const calculateBmi = (weight: number, height: number): Result => {
  const heightInMeters = height/100
  const bmi = weight / (heightInMeters ** 2)
        
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
    const { inputWeight, inputHeight } = parseArgs(process.argv)
    calculateBmi(inputWeight, inputHeight)
  }
  catch(error: unknown){
    let errorMessage = "Error:"
    if (error instanceof Error){      
      errorMessage += error.message;
    }
    console.log(errorMessage)
  }

export default calculateBmi
  
  