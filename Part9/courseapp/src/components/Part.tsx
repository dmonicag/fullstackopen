import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandles discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({part}: {part: CoursePart}) => {
    switch(part.kind){
        case "basic":
            return (
            <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                <em>{part.description}</em>
            </p>
            )
        case "background":
            return (
            <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                <em>{part.description}</em><br/>
                {part.backgroundMaterial}
            </p>
            )
        case "group":
            return (
            <p>
                <strong>{part.name} {part.exerciseCount}</strong><br/>
                project exercises: {part.groupProjectCount}
            </p>
            )
        case "special":
            return (
                <p>
                    <strong>{part.name} {part.exerciseCount}</strong><br/>
                    <em>{part.description}</em><br/>
                    required skills: {part.requirements.map(r => `${r}, `)}
                </p>
            )
        default:
            return assertNever(part);            
    }
}

export default Part;