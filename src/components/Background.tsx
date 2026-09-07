/** Fixed pastel dark-blue field behind everything. Two soft, slow glows keep
 *  it gently uneven so the glass surfaces have something to refract. */
export default function Background() {
  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-blob a" />
      <div className="bg-blob b" />
    </div>
  )
}
