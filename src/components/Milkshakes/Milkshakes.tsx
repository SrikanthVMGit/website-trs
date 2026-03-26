import { useState } from 'react'
import styles from './Milkshakes.module.css'
import strawberryCream from '../../assets/Strawberry_Cream.png'
import vanillaMalt from '../../assets/Vanilla Malt.png'
import classicColdCoffee from '../../assets/Classic Cold Coffee.png'

const milkshakes = [
  {
    id: 1,
    name: 'Strawberry Cream',
    description: 'Fresh berry brightness with smooth cultured dairy notes.',
    price: 229,
    image: strawberryCream,
  },
  {
    id: 2,
    name: 'Vanilla Malt',
    description: 'Classic soda-bar comfort elevated with real vanilla.',
    price: 219,
    image: vanillaMalt,
  },
  {
    id: 3,
    name: 'Classic Cold Coffee',
    description: 'Aromatic cold brew blitzed with creamy dairy base.',
    price: 249,
    image: classicColdCoffee,
  },
]

export default function Milkshakes() {
  const [quantity, setQuantity] = useState<Record<number, number>>(
    milkshakes.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  )

  const increment = (id: number) => {
    setQuantity(prev => ({ ...prev, [id]: prev[id] + 1 }))
  }

  const decrement = (id: number) => {
    setQuantity(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }))
  }

  const addToCart = (itemId: number) => {
    const item = milkshakes.find(m => m.id === itemId)
    if (!item) return
    console.log(`Added to cart: ${quantity[itemId]} × ${item.name} (₹${item.price} each)`)
    alert(`Added ${quantity[itemId]} × ${item.name} to cart`)
  }

  return (
    <section className={styles.milkshakesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Milk Shakes</h2>
            <p className={styles.subtitle}>Lighter blends for everyday cravings. Nostalgic flavours with premium ingredients.</p>
          </div>
          <button className={styles.seeAllBtn}>
            See All
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>

        <div className={styles.cards}>
          {milkshakes.map(item => (
            <article key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>

                <div className={styles.footer}>
                  <span className={styles.price}>₹{item.price}</span>
                  <div className={styles.quantityControls}>
                    <button onClick={() => decrement(item.id)} className={styles.qtyBtn}>−</button>
                    <span>{quantity[item.id]}</span>
                    <button onClick={() => increment(item.id)} className={styles.qtyBtn}>+</button>
                  </div>
                </div>

                <button onClick={() => addToCart(item.id)} className={styles.addToCartBtn}>
                  🛒 ADD TO CART
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
