export type Disposables = ReturnType<typeof disposables>

export function disposables() {
  let _disposables = new Set<Function>([])

  let api = {
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
