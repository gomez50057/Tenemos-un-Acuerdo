"use client";
import BlogHeader from "./BlogHeader";
import BlogNoticias from "./BlogNoticias";
import UltimasNoticias from "./UltimasNoticias";
import { blogPosts, featuredPosts } from "../../utils/blogData";

const BlogMain = () => {
  return (
    <div>
      {/* Respetamos el BlogHeader como parte destacada */}
      <BlogHeader />

      {/* Sección de Últimas Noticias */}
      <UltimasNoticias posts={blogPosts.slice(0, 4)} />

      {/* Nueva sección de Noticias con Publicación destacada */}
      <BlogNoticias posts={blogPosts} featuredPosts={featuredPosts} />

    </div>
  );
};

export default BlogMain;
