import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req,res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(isNaN(weight) || isNaN(height) || (!weight || !height)){
        res.send({ error: "malformatted values"}).status(400);
    }

    const bmi = calculateBmi(weight, height);
    const result = {
        weight, height, bmi
    };
    res.send(result).status(200);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyHours: Array<number> = values.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const targetHours: number = values.target;

    if(!dailyHours || !targetHours){
        res.send({ error: "parameters missing"}).status(400);
    }

    if(isNaN(targetHours) || !dailyHours.every((d => typeof d === 'number'))){
        res.send({ error: "malformatted input"}).status(400);
    }

    try{
    const result = calculateExercises(dailyHours, targetHours);
    res.send(result).status(200);
    }
    catch(error){
        if (error instanceof Error){
            res.status(400).send(error.message);
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});