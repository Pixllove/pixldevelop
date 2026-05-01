import pixlloveImage from '../../images/pixllove.png'
import pixltraceImage from '../../images/pixltrace.jpg'
import vitalityImage from '../../images/vitality.png'
import connectBricksImage from '../../images/connectbricks.png'

export const projectCoverImages = {
  'pixllove-app': pixlloveImage,
  'pixltrace-app': pixltraceImage,
  'vitality-anywhere': vitalityImage,
  'connect-bricks': connectBricksImage,
}

export function getProjectCoverImage(projectId) {
  return projectCoverImages[projectId] ?? null  
}
