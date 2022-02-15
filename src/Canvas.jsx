import React, { useRef } from "react"
import CanvasDraw, { getSaveData } from "react-canvas-draw"

export default function Canvas() {
    const canvasRef = useRef(null)

    console.log("canvasRef")
    console.log(canvasRef)

    return (
        <div className='wrapper'>
            <div className='canvas'>
                <CanvasDraw
                    brushRadius='5'
                    ref={(canvasDraw) => {
                        canvasRef.current = canvasDraw
                        console.log(canvasDraw)
                    }}
                />
            </div>
            <button
                onClick={() => {
                    console.log(canvasRef)
                    console.log(canvasRef.current.getSaveData())
                }}
            >
                Tryck mig
            </button>
        </div>
    )
}
