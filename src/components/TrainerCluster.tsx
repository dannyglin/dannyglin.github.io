/**
 * Decorative easter-egg for the Home hero: the owner's Pokemon team in a shallow
 * "V", packed like a family, sitting entirely to the right of the bio card.
 * Purely cosmetic - `aria-hidden`, `pointer-events: none`, and only rendered at
 * `lg` and up where there is room (`index.css` scales it down for the lg-to-xl
 * range so it does not spill past the viewport). Positioning lives in
 * `.trainer-cluster*` in `src/index.css`; under `prefers-reduced-motion` the
 * motion there is calmed down, not switched off.
 *
 * Every sprite - the trainer included - is drawn to ONE scale, so sizes are
 * honest relative to each other: `width(px) = heightM * SCALE`, using canonical
 * Pokedex heights. The trainer's height is inflated (`TRAINER_HEIGHT_M`) so he
 * reads as the group's leader rather than its shortest member. Dialga at true
 * scale (~420px) would break the layout, so it carries a fixed `px` override.
 *
 * `x` / `y` are each sprite's CENTRE in px within the box; `z-index` runs by
 * rendered size so the smallest sprites sit in front, and the trainer is always
 * on top. To retune: `SCALE` resizes the whole family, `TRAINER_HEIGHT_M` only
 * changes how the trainer compares to the team, `dialga.px` is the lone override.
 */

const SCALE = 78 // px per metre
const TRAINER_HEIGHT_M = 2.2 // taller than canon so he leads the wedge

type Sprite = {
  name: string
  heightM: number
  /** fixed width override - only Dialga, whose true scale would wreck the box */
  px?: number
  /** centre of the sprite within the .trainer-cluster box, in px */
  x: number
  y: number
}

const TRAINER: Sprite = {
  name: 'male_charactor',
  heightM: TRAINER_HEIGHT_M,
  x: 235,
  y: 248,
}

// Left arm runs nearest-the-trainer -> tip, then the right arm.
const TEAM: Sprite[] = [
  { name: 'ferrothorn', heightM: 1.0, x: 216, y: 262 },
  { name: 'metagross', heightM: 1.6, x: 162, y: 256 },
  { name: 'dialga', heightM: 5.4, px: 186, x: 100, y: 202 },
  { name: 'skarmory', heightM: 1.7, x: 292, y: 232 },
  { name: 'empoleon', heightM: 1.7, x: 344, y: 218 },
  { name: 'scizor', heightM: 1.8, x: 392, y: 204 },
]

const widthOf = (s: Sprite) => s.px ?? Math.round(s.heightM * SCALE)

function SpriteImg({
  sprite,
  variant,
  delay,
}: {
  sprite: Sprite
  variant: 'self' | 'mon'
  delay: number
}) {
  const w = widthOf(sprite)
  return (
    <img
      src={`/sprites/${sprite.name}.png`}
      alt=""
      className={`pixel-sprite trainer-cluster__${variant}`}
      style={{
        left: `${sprite.x}px`,
        top: `${sprite.y}px`,
        width: `${w}px`,
        zIndex: variant === 'self' ? 999 : 400 - w,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export default function TrainerCluster() {
  return (
    <div className="trainer-cluster hidden lg:block" aria-hidden="true">
      {TEAM.map((sprite, i) => (
        <SpriteImg
          key={sprite.name}
          sprite={sprite}
          variant="mon"
          delay={i * 0.5}
        />
      ))}
      <SpriteImg sprite={TRAINER} variant="self" delay={0.25} />
    </div>
  )
}
