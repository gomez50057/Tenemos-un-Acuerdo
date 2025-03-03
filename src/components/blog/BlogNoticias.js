import React, { useState } from 'react';
import styles from './BlogNoticias.module.css';
import FeaturedPosts from './FeaturedPosts';
import Link from "next/link";
import { normalizeName, renderDescription } from "../../utils/blogData";

const BlogNoticias = ({ posts, featuredPosts }) => {
  const MAX_LENGTH = 50;

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [fadeEffect, setFadeEffect] = useState(false);
  // Función para manejar el cambio en el select con un pequeño delay para la animación
  const handleCategoryChange = (event) => {
    setFadeEffect(true); // Inicia el fade-out
    setTimeout(() => {
      setSelectedCategory(event.target.value);
      setFadeEffect(false); // Inicia el fade-in
    }, 300); // Retardo de 300ms para que se vea el efecto de transición
  };

  // Filtrar las publicaciones según la categoría seleccionada
  const filteredPosts = selectedCategory === 'Todas'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className={styles.blogNoticias}>
      <div className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2> <span>Noticias</span> de las <span>Zonas</span> <span className="span-doarado">Metropolitanas</span> </h2>
          <select className={styles.orderSelect} onChange={handleCategoryChange}>
            <option value="Todas">Todas</option>
            <option value="ZMVM">ZMVM</option>
            <option value="ZMP">ZMPachuca</option>
            <option value="ZMTula">ZMTula</option>
            <option value="ZMTulancingo">ZMTulancingo</option>
          </select>
        </div>
        <div className={`${styles.newsGrid} ${fadeEffect ? styles.fadeOut : styles.fadeIn}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className={styles.newsItem}>
                <img src={post.image} alt={post.name} className={styles.newsImage} />
                <div className={styles.newsContent}>
                  <p className={styles.newsMeta}>{post.category} · {post.date}</p>
                  <h3 className={styles.newsTitle}>{post.name}</h3>
                  <div className={styles.newsDescription}>
                    {post.description.length > MAX_LENGTH
                      ? renderDescription(`${post.description.slice(0, MAX_LENGTH)}...`)
                      : renderDescription(post.description)}
                  </div>
                </div>
                <Link href={`/noticias/${normalizeName(post.name)}`} className="readMoreBtn" >Leer más</Link>
              </div>
            ))
          ) : (
            <p>No se encontraron publicaciones para esta categoría.</p>
          )}
        </div>
      </div>

      {/* Barra Lateral - Publicaciones Destacadas */}
      <FeaturedPosts featuredPosts={featuredPosts} />
    </section>
  );
};

export default BlogNoticias;
