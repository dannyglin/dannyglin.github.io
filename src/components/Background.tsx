/** Fixed, animated gradient field. Sits behind everything so the glass
 *  layers have depth and color to refract. */
export default function Background() {
  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-blob a" />
      <div className="bg-blob b" />
      <div className="bg-blob c" />
      <div className="bg-grid" />
    </div>
  )
}
