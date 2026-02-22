import { LEVELS } from "../data/levels"

const LevelList = ({currentLevel}) => {
    return(
        <>
            <div className="levels">
                 {LEVELS.map((lev) => (
                     <h3
                     key={lev.level}
                     style={{
                        background: lev.level === currentLevel ? "green" : "transparent",
                        color: lev.safe ? "yellow" : "white",
                        borderRadius: '10px',
                    }}
                     >
                        {lev.level}. level {lev.prize}eur
                     </h3>
                   ))}
            </div>
        </>
    );
}

export default LevelList;