

import React from 'react'
import styles from "./loading.module.scss";

function LoadingCardSearch() {
  return (
    <>
        <div className={`${styles.box} mb-5 row`}>
            <div className={`${styles.box__image} col-4 col-md-3`}></div>
            <div className={`${styles.box__text} col`}>
                <div className={`${styles.box__text__item} ${styles.box__text__item__1}`}></div>
                <div className={`${styles.box__text__item} ${styles.box__text__item__2}`}></div>
                <div className={`${styles.box__text__item} ${styles.box__text__item__3}`}></div>
            </div>
        </div>
    </>
  )
}

export default LoadingCardSearch