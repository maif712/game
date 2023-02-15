

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faTrash, faAdd, faEdit } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"


export default function App() {


    const [addGameRollInput, setAddGameRollInput] = useState("")
    const [gameRoll, setGameRoll] = useState([])
    const [secondryData, setSecondryData] = useState([])
    const [finallResult, setFinallResult] = useState("")

    const [isExpanded, setIsExpanded] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const myInput = useRef()

    useEffect(() => {
        myInput.current.focus()
    }, [])

    function Clearing() {
        myInput.current.focus()
        setAddGameRollInput("")
    }

    useEffect(() => {
        gameRoll.length === 0 && setIsExpanded(false)
    }, [gameRoll])


    const handleAddGameRoll = () => {
        const newGameRoll = {
            id: gameRoll.length === 0 ? 1 : gameRoll[gameRoll.length - 1].id + 1,
            title: addGameRollInput,
            isClicked: false,
        }

        setGameRoll(prevGameRoll => [...prevGameRoll, newGameRoll])
        setSecondryData(prevSecondryData => [...prevSecondryData, newGameRoll])
        Clearing()
    }

    const handleEnterAddRoll = (e) => {
        if (e.key === "Enter") {
            handleAddGameRoll()
            Clearing()
        }
    }

    const handleDeleteGameRoll = (id) => {
        setGameRoll(prevGameRoll => prevGameRoll.filter(x => x.id !== id))
        setSecondryData(prevGameRoll => prevGameRoll.filter(x => x.id !== id))
        setIsDeleted(true)
        setTimeout(() => {
            setIsDeleted(false)
        }, 800);
    }

    const handleFinalResult = (id) => {
        setGameRoll(prevData => prevData.map(x => {
            if (x.id === id) {
                return { ...x, isClicked: true }
            }
            else {
                return x
            }
        }))
        const rndNumber = Math.floor(Math.random() * secondryData.length)
        setFinallResult(secondryData[rndNumber].title)
        secondryData.splice(rndNumber, 1)

    }

    const handleNewGame = () => {
        setGameRoll([])
        setSecondryData([])
        setFinallResult("")
        Clearing()
    }

    const handleExpanded = () => {
        setIsExpanded(prevExpanded => !prevExpanded)
    }

    const showCards = gameRoll.map(gameRolls => {
        return (
            <div onClick={() => handleFinalResult(gameRolls.id)} key={gameRolls.id} className={`card-wrapper ${gameRolls.isClicked ? "clicked" : ""}`}>
                <figure>
                    <img src="./images/maicon.png" alt="" />
                </figure>
                <h2>مافیا</h2>
            </div>
        )
    })

    const showMainGameRolls = gameRoll.map(gameRolls => {
        return (
            <div key={gameRolls.id} className="game-roll-wrapper">
                <h4 className="game-roll-title">{gameRolls.title}</h4>
                <button onClick={() => handleDeleteGameRoll(gameRolls.id)} className="del-btn"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        )
    })

    return (
        <div className="app container">
            <div className="app__div">
                <input ref={myInput} value={addGameRollInput} onKeyDown={e => handleEnterAddRoll(e)} onChange={e => setAddGameRollInput(e.target.value)} type="text" className="app-div__input" placeholder="نقش بازی را وارد کنید..." />
                <div className="app-div__buttons-wrapper">
                    <button onClick={handleNewGame} className="app-div__make-new-game-btn">ایجاد بازی جدید <FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={handleAddGameRoll} className="app-div__add-player-btn">اضافه کردن<FontAwesomeIcon icon={faAdd} /></button>
                </div>
            </div>
            <div className="app__show-result">
                {showCards}
            </div>

            <div className="app__show-added-roll">
                <div onClick={handleExpanded} className="app-show-added-roll__wrapper">
                    <h2 className="wrapper__h2">نقش های اضافه شده به بازی</h2>
                    <FontAwesomeIcon className="plus-icon" icon={isExpanded ? faMinus : faPlus} />
                </div>
                <div className="app-show-added-roll__main-rolls-wrapper">
                    {isExpanded && showMainGameRolls}
                </div>

            </div>

            <div className={`show-finall-result ${finallResult ? "active" : null}`}>
                <h3>{finallResult}</h3>
                <button onClick={() => setFinallResult("")} className="btn-finall-result">!فهمیدم</button>
            </div>
            {finallResult && <div className="mask"></div>}
            <div className={`deleted-warning ${isDeleted ? "deleted" : null}`}>
                <p>حذف شد</p>
            </div>
        </div>
    )
}