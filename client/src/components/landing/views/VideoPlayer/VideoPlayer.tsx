import styles from './VideoPlayer.module.scss'
import videoImg from '@/assets/landing/videoplayer.svg'

interface VideoPlayerProps {
  title: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ title }) => {
  return (
    <div className={styles.videoPlayer}>
      <h3>{title}</h3>
      <img src={videoImg} alt="" />
    </div>
  )
}
