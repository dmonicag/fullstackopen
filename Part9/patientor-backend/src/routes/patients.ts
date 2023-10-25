import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getNonSsnEntries());
});

patientsRouter.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    const addedEntry = patientsService.addPatient({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name, dateOfBirth, gender, ssn, occupation
});

    res.json(addedEntry);
});

export default patientsRouter;

