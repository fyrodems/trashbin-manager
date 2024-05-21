import Countdown from 'react-countdown'

export const CountDownTimer = () => {
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    if (completed) return <div />

    return (
      <span>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </span>
    )
  }

  return <Countdown date={Date.now() + 1 * 60 * 1000} renderer={renderer} />
}
