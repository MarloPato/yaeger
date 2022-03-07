import React, { useRef, useState, useEffect } from "react"
import CanvasDraw, { getSaveData } from "react-canvas-draw"
import * as tf from "@tensorflow/tfjs"

export default function Canvas() {
    const [prediction, setPrediction] = useState(null)
    const [linearModel, setLinearModel] = useState(null)
    const canvasRef = useRef(null)

    console.log("canvasRef")
    console.log(canvasRef)

    async function train() {
        // Define a model for linear regression.
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" })

        // Training data, completely random stuff
        const xs = tf.tensor1d([3.2, 4.4, 5.5])
        const ys = tf.tensor1d([1.6, 2.7, 3.5])

        // Train
        await model.fit(xs, ys)
        setLinearModel(model)

        console.log("model trained!")
    }

    function predict(val) {
        const output = linearModel.predict(tf.tensor2d([parseInt(val)], [1, 1]))
        setPrediction(Array.from(output.dataSync())[0])
    }

    useEffect(() => {
        train()
    }, [])

    return (
        <div className='wrapper'>
            <h1>predictions {prediction}</h1>
            <input type='number' onChange={(e) => predict(e.target.value)} />
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
