import HomeCard from "./HomeCard"


const CardContainer = ({items}) => {
  return (
    <section className="py-5" id="shop">
    <h4 style={{ textAlign: "center" }}>Our Products</h4>

    <div className="container px-4 px-lg-5 mt-5">
      <div className="row justify-content-center">
        {items.map((item, i) => (
          <HomeCard key={i} item={item} />
          ))}
      </div>
    </div>
  </section>
  )
}

export default CardContainer
