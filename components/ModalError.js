import React from 'react'
import styles from './ModalError.module.css';

export default function ModalError(props) {

    const handleButton = () => props.handleClose(false);

    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <p className={styles.exitButton} onClick={handleButton}>x</p>
                <h1 className={styles.errorText}>Name Required</h1>
            </div>
        </div>
    )
}
