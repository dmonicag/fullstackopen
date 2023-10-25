import data from "../../data/diagnoses";
import { Diagnoses } from "../types";

const diagnoses: Diagnoses[] = data;

const getEntries = (): Diagnoses[] => {
    return diagnoses;
};

export default getEntries;