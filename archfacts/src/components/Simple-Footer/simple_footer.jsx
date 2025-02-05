import React from 'react';
import styles from './simple_footer.module.css';

function SimpleFooter(){
    return <div className={styles.div_footer}>
    <footer>
      <p className={styles.texto_footer}>© 2025 ArchFacts all rights reserved.</p>
    </footer>
    </div>
}

export default SimpleFooter;