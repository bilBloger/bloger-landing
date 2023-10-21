import classNames from "classnames";
import React, { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useRef } from "react";

import * as styles from './styles.module.scss'
import zeppelinCanvasBg from '../../images/zeppelinCanvasBg.png'
import zeppelinText from '../../images/zeppelinText.svg'
import zeppelinSprite from '../../images/zeppelinSprite.svg'
import getImage from "../../getImage";
import Fireworks from "fireworks-js";

interface ICircleRef {
  offset: number
  position: number
  border: number
}

const ZeppelinAnimationMobile = ({ startAnimation, openModal, className }: { startAnimation: boolean, openModal: () => void, className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<HTMLCanvasElement>(null)
  const [fireworks, setFireworks] = useState<Fireworks>()
  const lastRenderTimeRef = useRef<number>(Date.now())
  const pointsRef = useRef([{ x: 51, y: 260 }])
  const circleInitXOffsetRef = useRef({ offset: 0 })
  const circleInitYOffsetRef = useRef({ offset: 0 })
  const circleXOffsetRef = useRef<ICircleRef>({ offset: 0, position: 0, border: 0 })
  const circleXOffset1Ref = useRef<ICircleRef>({ offset: 0, position: 0, border: 7 })
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
        context.drawImage(background, 50, 0, 450, 260)
      }
  
      if (zeppelinTxt) {
        context.drawImage(zeppelinTxt, 100, 20, 100, 25)
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
  }, [startAnimation, background])

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
      drawYCircle(context, deltaTime, circleYOffsetRef)
      drawYCircle(context, deltaTime, circleYOffset1Ref)
      drawYCircle(context, deltaTime, circleYOffset2Ref)
      addPoints()
      lastRenderTimeRef.current = timeNow
      if (pointsRef.current[pointsRef.current.length - 1].y < 155) {
        openModal()
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
    if(100 + yOffset < 300) {
      context.arc(30, 100 + yOffset, 4, 0, Math.PI * 2);
    }
    if(200 + yOffset < 300) {
      context.arc(30, 200 + yOffset, 4, 0, Math.PI * 2);
    }
    if(300 + yOffset < 300) {
      context.arc(30, 300 + yOffset, 4, 0, Math.PI * 2);
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
      offsetRef.current.border = 14
    }
    const yOffset = 20 * offsetRef.current.offset;
    context.beginPath();
    context.arc(30, offsetRef.current.position + yOffset, 4, 0, Math.PI * 2);
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
    console.log(xOffset)
    context.beginPath();
    if(160 - xOffset > 20) {
      context.arc(160 - xOffset, 280, 4, 0, Math.PI * 2);
    }
    if(80 - xOffset > 20) {
      context.arc(80 - xOffset, 280, 4, 0, Math.PI * 2);
    }
    if(0 - xOffset > 20) {
      context.arc(0 - xOffset, 280, 4, 0, Math.PI * 2);
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
      offsetRef.current.position = 300
      offsetRef.current.border = 13
    }
    const xOffset = 20 * offsetRef.current.offset;
    context.beginPath();
    context.arc(offsetRef.current.position - xOffset, 280, 4, 0, Math.PI * 2);
    context.fillStyle = '#A9B5C1';
    context.fill();
  }

  const plotPoints = (context: CanvasRenderingContext2D): void => {
    context.beginPath();
    pointsRef.current.forEach((pt) => context.lineTo(pt.x, pt.y))
    context.lineWidth = 6
    context.strokeStyle = "#FFCC00"


    context.stroke()
    context.strokeStyle = "transparent"
    context.lineTo(pointsRef.current[pointsRef.current.length - 1].x, 260);
    context.lineTo(pointsRef.current[0].x, 260);

    context.stroke()

    context.fillStyle = '#756426'
    context.fill()
    if (zeppelin) {
      context.drawImage(zeppelin, pointsRef.current[pointsRef.current.length - 1].x - 72 / 2, pointsRef.current[pointsRef.current.length - 1].y - 40, 72, 43)
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
      context.drawImage(background, 50, 0, 450, 260)
    }

    if (zeppelinTxt) {
      context.drawImage(zeppelinTxt, 100, 20, 100, 25)
    }
    plotPoints(context)
  }
  
  return (
    <>
      <canvas id={styles.canvas} className={className} width={280} height={310} ref={canvasRef} />
      <canvas ref={fireworksRef} id={styles.fireworks}></canvas>
    </>
  )
}

export default ZeppelinAnimationMobile