import patientData from "../../data/patients";
import { Patient, NonSsnEntries } from "../types";

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

export default { getPatients, getNonSsnEntries };