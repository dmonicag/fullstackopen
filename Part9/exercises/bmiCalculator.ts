type Result = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

const calculateBmi = (weight: number, height: number): Result => {
    const heightInMeters = height/100
    const bmi = weight / (heightInMeters ** 2)
        
    if(bmi <= 18.5){
      return 'Underweight'
    } else if (bmi > 18.5 && bmi <= 24.9){
      return 'Normal'
    } else if (bmi > 25 && bmi <=29.9){
      return 'Overweight'
    } else if (bmi >= 30){
      return 'Obese'
    }   
  }

console.log(calculateBmi(74, 180));
  
  