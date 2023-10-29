import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return(
        <>
        {courseParts.map(c => (
            <p><Part part={c}/></p>
        ))}
        </>
    )
}

export default Content;