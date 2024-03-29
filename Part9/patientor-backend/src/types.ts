export type Diagnoses = {
    code: string;
    name: string;
    latin?: string
};

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
};

export type NonSsnEntries = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;