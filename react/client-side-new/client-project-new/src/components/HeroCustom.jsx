export default function HeroCustom() {
  return (
    <section className="hero">
      <div className="slider-wrapper">
        <div className="slider">
          <img id="slide-1" src="https://i0.wp.com/www.murphysmultiverse.com/wp-content/uploads/2022/12/Across-the-Spider-Verse.jpg?fit=1024%2C576&ssl=1" alt="" />
          <img id="slide-2" src="https://i.ytimg.com/vi/mJ12UnFa-Yo/maxresdefault.jpg" alt="" />
          <img id="slide-3" src="https://assets-in.bmscdn.com/discovery-catalog/events/et00122562-ymtsjwygmy-landscape.jpg" alt="" />
        </div>
        <div className="slider-nav">
          <a href="#slide-1"></a>
          <a href="#slide-2"></a>
          <a href="#slide-3"></a>
        </div>
      </div>
      <div className="hero-card">
        <h3>Up Next</h3>
        <div className="card">
          <div className="left-card">
            <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
          </div>
          <div className="right-card">
            <h4>Spider-Man: Across the Spider-Verse</h4>
            <p>Action</p>
            <p><i className="bx bx-star"></i> 9.00</p>
          </div>
        </div>
        <div className="card">
          <div className="left-card">
            <img src="https://media-cache.cinematerial.com/p/500x/00y3oix2/transformers-rise-of-the-beasts-movie-poster.jpg?v=1682600690" alt="" />
          </div>
          <div className="right-card">
            <h4>Transformers: Rise of the Beasts</h4>
            <p>Action</p>
            <p><i className="bx bx-star"></i> 9.00</p>
          </div>
        </div>
        <span>Browse Trailer <i className='bx bx-right-arrow-alt' ></i></span>
      </div>
    </section>
  )
}