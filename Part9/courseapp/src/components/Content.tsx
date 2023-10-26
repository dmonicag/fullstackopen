interface ContentProps {
    name: string,
    exerciseCount: number
  }

const Content = ({courseParts}: {courseParts: ContentProps[]}) => {
    return(
        <>
            {courseParts.map(c => (
                <li>{c.name} {c.exerciseCount}</li>
            ))}
        </>
    )
}

export default Content;