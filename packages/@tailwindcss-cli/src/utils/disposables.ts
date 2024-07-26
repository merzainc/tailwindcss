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
