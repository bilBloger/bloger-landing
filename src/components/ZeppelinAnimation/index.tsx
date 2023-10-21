import classNames from "classnames";
import React, { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useRef } from "react";

import * as styles from './styles.module.scss'
import zeppelinCanvasBg from '../../images/zeppelinCanvasBg.png'
import zeppelinText from '../../images/zeppelinText.svg'
import zeppelinSprite from '../../images/zeppelinSprite.svg'
import getImage from "../../getImage";
import { Fireworks } from 'fireworks-js'

interface ICircleRef {
  offset: number
  position: number
  border: number
}

const ZeppelinAnimation = ({ startAnimation, endAnimation, className }: { startAnimation: boolean, endAnimation: () => void, className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<HTMLCanvasElement>(null)
  const [fireworks, setFireworks] = useState<Fireworks>()
  const lastRenderTimeRef = useRef<number>(Date.now())
  const pointsRef = useRef([{ x: 100, y: 420 }])
  const circleInitXOffsetRef = useRef({ offset: 0 })
  const circleInitYOffsetRef = useRef({ offset: 0 })
  const circleXOffsetRef = useRef<ICircleRef>({ offset: 0, position: 0, border: 0 })
  const circleXOffset1Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 10 })
  const circleXOffset2Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 20 })
  const circleXOffset3Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 30 })
  const circleYOffsetRef = useRef<ICircleRef>({ offset: 0, position: 0, border: 0 })
  const circleYOffset1Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 7 })
  const circleYOffset2Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 14 })

  const background = getImage(zeppelinCanvasBg)
  const zeppelinTxt = getImage(zeppelinText)
  const zeppelin = getImage(zeppelinSprite)

  const animationFrameRequestRef = useRef<number | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (context != null) {
      if (background) {
        context.drawImage(background, 100, 0, 950, 420)
      }
  
      if (zeppelinTxt) {
        context.drawImage(zeppelinTxt, 440, 20, 200, 50)
      }
      plotPoints(context)

      drawInitXCircles(context, 0, circleInitXOffsetRef)
      drawInitYCircles(context, 0, circleInitYOffsetRef)
    }
    if (startAnimation) {
      lastRenderTimeRef.current = Date.now();
      animationFrameRequestRef.current = requestAnimationFrame(renderFrame)
      return () => {
        if (animationFrameRequestRef.current != null) {
          cancelAnimationFrame(animationFrameRequestRef.current)
        }
      }
    }
  }, [startAnimation, background, zeppelinTxt, zeppelin])

  useEffect(() => {
    if (fireworksRef.current) {
      setFireworks(new Fireworks(fireworksRef.current, { opacity: 0.8, friction: 1, particles: 200 }))
    }
  }, [fireworksRef.current])

  const renderFrame = (): void => {
    const context = canvasRef.current?.getContext('2d')
    if (context != null && pointsRef.current[pointsRef.current.length - 1].y > 150) {
      const timeNow = Date.now()
      const deltaTime = timeNow - lastRenderTimeRef.current
      clearBackground(context)
      drawInitXCircles(context, deltaTime, circleInitXOffsetRef)
      drawInitYCircles(context, deltaTime, circleInitYOffsetRef)
      drawXCircle(context, deltaTime, circleXOffsetRef)
      drawXCircle(context, deltaTime, circleXOffset1Ref)
      drawXCircle(context, deltaTime, circleXOffset2Ref)
      drawXCircle(context, deltaTime, circleXOffset3Ref)
      drawYCircle(context, deltaTime, circleYOffsetRef)
      drawYCircle(context, deltaTime, circleYOffset1Ref)
      drawYCircle(context, deltaTime, circleYOffset2Ref)
      addPoints()
      lastRenderTimeRef.current = timeNow
      if (pointsRef.current[pointsRef.current.length - 1].y < 155) {
        fireworks && fireworks.start()
        endAnimation()
      }
    }
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame)
  }

  const drawInitYCircles = (
    context: CanvasRenderingContext2D,
    deltaTime: number,
    offsetRef: MutableRefObject<any>
  ): void => {
    offsetRef.current.offset += deltaTime / 100;
    const yOffset = 20 * offsetRef.current.offset;
    context.beginPath();
    if(120 + yOffset < 400) {
      context.arc(80, 120 + yOffset, 5, 0, Math.PI * 2);
    }
    if(240 + yOffset < 400) {
      context.arc(80, 240 + yOffset, 5, 0, Math.PI * 2);
    }
    if(360 + yOffset < 400) {
      context.arc(80, 360 + yOffset, 5, 0, Math.PI * 2);
    }
    context.fillStyle = '#FECC00';
    context.fill();
  }

  const drawYCircle = (
    context: CanvasRenderingContext2D,
    deltaTime: number,
    offsetRef: MutableRefObject<ICircleRef>
  ): void => {
    offsetRef.current.offset += deltaTime / 100;
    if (offsetRef.current.offset > offsetRef.current.border) {
      offsetRef.current.offset = 0
      offsetRef.current.position = 0
      offsetRef.current.border = 21
    }
    const yOffset = 20 * offsetRef.current.offset;
    context.beginPath();
    context.arc(80, offsetRef.current.position + yOffset, 5, 0, Math.PI * 2);
    context.fillStyle = '#FECC00';
    context.fill();
  }

  const drawInitXCircles = (
    context: CanvasRenderingContext2D,
    deltaTime: number,
    offsetRef: MutableRefObject<any>
  ): void => {
    offsetRef.current.offset += deltaTime / 100;
    const xOffset = 20 * offsetRef.current.offset;
      context.beginPath();
      if(700 - xOffset > 200) {
        context.arc(700 - xOffset, 440, 5, 0, Math.PI * 2);
      }
      if(500 - xOffset > 100) {
        context.arc(500 - xOffset, 440, 5, 0, Math.PI * 2);
      }
      if(300 - xOffset > 100) {
        context.arc(300 - xOffset, 440, 5, 0, Math.PI * 2);
      }
      if(100 - xOffset > 100) {
        context.arc(100 - xOffset, 440, 5, 0, Math.PI * 2);
      }
      context.fillStyle = '#A9B5C1';
      context.fill();
  }

  const drawXCircle = (
    context: CanvasRenderingContext2D,
    deltaTime: number,
    offsetRef: MutableRefObject<ICircleRef>
  ): void => {
    offsetRef.current.offset += deltaTime / 100;
    if (offsetRef.current.offset > offsetRef.current.border) {
      offsetRef.current.offset = 0
      offsetRef.current.position = 900
      offsetRef.current.border = 40
    }
    const xOffset = 20 * offsetRef.current.offset;
    context.beginPath();
    context.arc(offsetRef.current.position - xOffset, 440, 5, 0, Math.PI * 2);
    context.fillStyle = '#A9B5C1';
    context.fill();
  }

  const plotPoints = (context: CanvasRenderingContext2D): void => {
    context.beginPath();
    pointsRef.current.forEach((pt) => context.lineTo(pt.x, pt.y))
    context.lineWidth = 8
    context.strokeStyle = "#FFCC00"


    context.stroke()
    context.strokeStyle = "transparent"
    context.lineTo(pointsRef.current[pointsRef.current.length - 1].x, 420);
    context.lineTo(pointsRef.current[0].x, 420);

    context.stroke()

    context.fillStyle = '#756426'
    context.fill()
    if (zeppelin) {
      context.drawImage(zeppelin, pointsRef.current[pointsRef.current.length - 1].x - 170 / 2, pointsRef.current[pointsRef.current.length - 1].y - 80, 170, 100)
    }

    if (startAnimation) {
      context.font = '150px Roboto, serif';
      context.fillStyle = '#FFFFFF'
      const text = `${pointsRef.current[pointsRef.current.length - 1].x > 780 ? 108 : Math.round(pointsRef.current[pointsRef.current.length - 1].x / 7.23)} FS`
      const measureText = context.measureText(text)
      context.fillText(text, 530 - measureText.width / 2, 250)
    }
  }

  const addPoints = () => {
    const prevPoint = pointsRef.current[pointsRef.current.length - 1]
    if (prevPoint.y > 150) {
      const x = Number((prevPoint.x + 2).toFixed(2))
      const y = Number((prevPoint.y - (prevPoint.x / 600)).toFixed(2))
      if (prevPoint.y > y ) {
        pointsRef.current.push({ x, y })
      }
    }
  }

  const clearBackground = (context: CanvasRenderingContext2D): void => {
    const { width, height } = context.canvas
    context.rect(0, 0, width, height)
    context.fillStyle = '#1d1f2c'
    context.fill()

    if (background) {
      context.drawImage(background, 100, 0, 950, 420)
    }

    if (zeppelinTxt) {
      context.drawImage(zeppelinTxt, 440, 20, 200, 50)
    }
    plotPoints(context)
  }
  
  return (
    <>
      <canvas id={styles.canvas} className={className} width={1024} height={480} ref={canvasRef} />
      <canvas ref={fireworksRef} id={styles.fireworks}></canvas>
    </>)
}

export default ZeppelinAnimation