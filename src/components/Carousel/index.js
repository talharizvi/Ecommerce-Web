import '../Carousel/carousel.css'
const CarouselView = ({title ,data, handleCardClick})=>{
    return(
      <div className='root-best-seller'>
        <div className='carousel-title'>{title}</div>
        <div className="carousel-container">
      {data.map((item, index) => (
        <div key={index} className="carousel-item" onClick={()=>handleCardClick(item)}>
          <img src={item.image} alt="Product Image" width='180' height='180' />
          <div className='item-title'>{item.title}</div>
          <div>Price: ${item.price}</div>
        </div>
      ))}
    </div>
      </div>
    )
  }

  export default CarouselView