import { useIdleTimer } from 'react-idle-timer'

interface UseIdleTimeoutProps {
  onIdle: () => void
  onAction?: () => void
  idleTime: number
}

/**
 * @param onIdle - function to notify user when idle timeout is close
 */
const useIdleTimeout = ({
  onAction,
  onIdle,
  idleTime = 30,
}: UseIdleTimeoutProps) => {
  const idleTimeout = idleTime * 1000 * 60 // convert to minutes

  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    onIdle,
    onAction,
    debounce: 500,
  })

  return {
    idleTimer,
  }
}

export default useIdleTimeout
