// Performance-optimized smooth scroll utility
interface ScrollOptions {
  duration?: number
  easing?: (t: number) => number
  offset?: number
  callback?: () => void
}

// Professional easing functions
export const easingFunctions = {
  easeInOutCubic: (t: number): number => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutQuart: (t: number): number => 1 - --t * t * t * t,
  easeInOutQuint: (t: number): number => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
}

// Optimized scroll manager with requestAnimationFrame
class ScrollManager {
  private isScrolling = false
  private scrollQueue: Array<() => void> = []

  public smoothScrollTo(elementId: string, options: ScrollOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      const { duration = 1200, easing = easingFunctions.easeInOutCubic, offset = -80, callback } = options

      // Add to queue if already scrolling
      if (this.isScrolling) {
        this.scrollQueue.push(() => this.smoothScrollTo(elementId, options).then(resolve))
        return
      }

      const element = document.getElementById(elementId)
      if (!element) {
        resolve()
        return
      }

      this.isScrolling = true
      const startPosition = window.pageYOffset
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        const easedProgress = easing(progress)
        const currentPosition = startPosition + distance * easedProgress

        window.scrollTo(0, currentPosition)

        if (progress < 1) {
          requestAnimationFrame(animation)
        } else {
          this.isScrolling = false
          callback?.()
          resolve()

          // Process queue
          if (this.scrollQueue.length > 0) {
            const nextScroll = this.scrollQueue.shift()
            nextScroll?.()
          }
        }
      }

      requestAnimationFrame(animation)
    })
  }

  public scrollToTop(options: ScrollOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      const { duration = 1000, easing = easingFunctions.easeOutQuart, callback } = options

      if (this.isScrolling) {
        this.scrollQueue.push(() => this.scrollToTop(options).then(resolve))
        return
      }

      this.isScrolling = true
      const startPosition = window.pageYOffset
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        const easedProgress = easing(progress)
        const currentPosition = startPosition * (1 - easedProgress)

        window.scrollTo(0, currentPosition)

        if (progress < 1) {
          requestAnimationFrame(animation)
        } else {
          this.isScrolling = false
          callback?.()
          resolve()

          if (this.scrollQueue.length > 0) {
            const nextScroll = this.scrollQueue.shift()
            nextScroll?.()
          }
        }
      }

      requestAnimationFrame(animation)
    })
  }
}

export const scrollManager = new ScrollManager()

// Intersection Observer for performance optimization
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
): IntersectionObserver => {
  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    "/LAROCKA-IMAGE/Samsung-Galaxy-A15-varios-colores-66e4a331d102d-O.webp",
    "/LAROCKA-IMAGE/sm-a065f_galaxy_a06_blue_black_green_front-back_1_1 (1).webp",
    "/LAROCKA-IMAGE/samsung_a05_fa37c0bd-1c45-40d1-bf65-47a79848cf1f.webp",
    "/LAROCKA-IMAGE/moto_g42_128gb_verde_atl_ntico_1.webp"
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}
