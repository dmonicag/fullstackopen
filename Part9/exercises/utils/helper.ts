interface ParsedArguments{
    target: number,
    trainingDays: Array<number>
}

export const getArguments = (args: string[]): ParsedArguments => {
    if(args.length < 4){
        throw new Error("please add arguments");
    }

    for(let i=3; i<args.length; i++){    
        if(isNaN(Number(args[i])))
        {
           throw new Error("inputs are not numbers");
        }   
    }
    return{
    target: Number(args[2]),
    trainingDays: args.slice(3).map(Number)
    };
};

export const ratingCalculation = (average: number, target: number): number => {
    const ratingAverage = average/target;
    if(ratingAverage >= 1){
      return 2;
    }
    else if(ratingAverage >= 0.9){
      return 1;
    }
    else return 0;
};

export const descriptionText = (rating: number): string => {
    if(rating === 2){
      return "well done! keep it up";
    }
    else if(rating === 1){
      return "not bad, can do better";
    }
    else return "better start exercising!";
};

export default getArguments;