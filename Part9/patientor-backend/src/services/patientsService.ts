import patientData from "../../data/patients";
import { Patient, NonSsnEntries, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';


const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSsnEntries = (): NonSsnEntries[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id = uuid();
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id,
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default { getPatients, getNonSsnEntries, addPatient};