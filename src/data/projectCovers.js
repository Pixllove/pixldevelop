import pixlloveImage from '../../images/optimized/pixllove-cover.avif'
import pixltraceImage from '../../images/optimized/pixltrace-cover.avif'
import vitalityImage from '../../images/optimized/vitality-cover.avif'
import connectBricksImage from '../../images/optimized/connectbricks-cover.avif'

export const projectCoverImages = {
  'pixllove-app': pixlloveImage,
  'pixltrace-app': pixltraceImage,
  'vitality-anywhere': vitalityImage,
  'connect-bricks': connectBricksImage,
}

export function getProjectCoverImage(projectId) {
  return projectCoverImages[projectId] ?? null  
}
