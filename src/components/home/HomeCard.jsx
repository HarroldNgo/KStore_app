import styles from "./HomeCard.module.css";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../api'

const HomeCard = ({item}) => {
  return (
    <div className={`col-md-4 ${styles.col}`}>
      <Link to={`items/${item.slug}`}>
        <div className={styles.card}>
          <div className={styles.cardImgWrapper}>
            <img src={`${BASE_URL}${item.image}`} className={styles.cardImgTop} alt="Product Image" />
          </div>
          <div className={styles.cardBody}>
            <h5 className={`${styles.cardTitle} mb-1`}>{item.name}</h5>
            <h6 className={styles.cardText}>{`$${item.price}`}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
