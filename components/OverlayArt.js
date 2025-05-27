import { FlexContainerCol, FlexContainerRow} from './styles'
import ImageCard from './ImageCard';


function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('/public/art', false, /\.(png|jpe?g|svg|gif|GIF|PNG|JPE?G)$/));

export default function OverlayArt() {
  // remove duplicates
  const imagesSet = new Set(images);
  const newImages = [...imagesSet];
  const imageCards = newImages.map((image) => {
    return <ImageCard image={image}/>
  })

  return (
    <>
      <FlexContainerCol>
        <div><h1>art</h1></div>
        <FlexContainerRow>
          {imageCards}
        </FlexContainerRow>
      </FlexContainerCol>
    </>
  )
}