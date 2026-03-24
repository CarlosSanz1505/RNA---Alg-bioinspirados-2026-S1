import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const posts = [
  {
    slug: "mi-primer-post-markdown",
    title: "Mi primer post en Markdown",
    description:
      "Un post de ejemplo con tablas, bloques de código y matemáticas inline y en bloque.",
    coverText: "MD",
    markdown: `# Mi primer post en Markdown

Este post se renderiza con **React Markdown**.

Podemos mostrar matemáticas inline como $E = mc^2$ y también en bloque:

$$
\\int_{0}^{1} x^2\\,dx = \\frac{1}{3}
$$

## Bloques de código

\`\`\`js
function saludar(nombre) {
  return \`Hola, \${nombre}\`;
}

console.log(saludar("Carlos"));
\`\`\`

También soporta tablas:

| Tema | Estado |
|---|---|
| Markdown | OK |
| Código | OK |
| Matemáticas | OK |
`
  }
];

function Header() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <header className="hero">
      <div className="hero-top">
        <p className="eyebrow">Weblog académico</p>
        <button type="button" className="theme-button" onClick={toggleTheme}>
          {theme === "dark" ? "Tema claro" : "Tema oscuro"}
        </button>
      </div>
      <h1>RNAB Blog</h1>
      <p>
        Esta es una colección de reportes técnicos presentando soluciones
        elaboradas para los trabajos planteados en el curso de <b>Redes
        Neuronales y Algoritmos Bioinspirados</b> en el período 2026-S1.
      </p>
      <p>Los trabajos aquí presentados han sido creados por:
        <ul>
          <li>Carlos Andres Sanchez Ortega</li>
          <li>Carlos Daniel Urresty Ascuntar</li>
          <li>Jhojan Esteban Jimenez Jaramillo</li>
          <li>Juan Manuel Teheran Machado</li>
        </ul>
      </p>
    </header>
  );
}

function PostPool() {
  return (
    <section aria-label="Pool de publicaciones" className="pool">
      {posts.map((post) => (
        <Link key={post.slug} to={`/posts/${post.slug}`} className="pool-card">
          <div className="cover" aria-hidden="true">
            {post.coverText}
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </Link>
      ))}
    </section>
  );
}

function HomePage() {
  return (
    <main className="container">
      <Header />
      <PostPool />
    </main>
  );
}

function PostPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="container">
      <Header />
      <section className="post-page-header">
        <Link to="/" className="back-link">
          Volver a publicaciones
        </Link>
      </section>
      <article className="post">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
        >
          {post.markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:slug" element={<PostPage />} />
    </Routes>
  );
}
