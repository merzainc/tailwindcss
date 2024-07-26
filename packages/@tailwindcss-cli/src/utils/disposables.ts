export type Disposables = ReturnType<typeof disposables>

export function disposables() {
  let _disposables = new Set<Function>([])

  let api = {
    queueMicrotask(cb: () => void) {
      let shouldExecute = true

      queueMicrotask(() => {
        if (shouldExecute) {
          cb()
        }
      })

      return api.add(() => {
        shouldExecute = false
      })
    },

    queueMacrotask(cb: () => void) {
      let timer = setTimeout(cb, 0)

      return api.add(() => {
        clearTimeout(timer)
      })
    },

    add(dispose: () => void) {
      _disposables.add(dispose)

      return () => {
        _disposables.delete(dispose)

        dispose()
      }
    },

    dispose() {
      for (let dispose of _disposables) {
        dispose()
      }

      _disposables.clear()
    },
  }

  return api
}
