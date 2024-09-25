interface BaseNode<T> {
  id: string,
  position: { x: number, y: number },
  type: string,
  data: {
    config: T,
  },
}