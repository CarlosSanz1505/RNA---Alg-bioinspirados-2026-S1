import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const posts = [
  {
    slug: "mi-primer-post-markdown",
    title: "Trabajo 1 - Optimización Heurística",
    description:
      `
Optimización numérica de funciones de benchmarking.
      `,
    coverText: "MD",
    markdown: `
# Trabajo 01 - Optimización Heurística

Para el componente de optimización numérica, elegimos la función de Rosenbrock
y la de Schwefel. A continuación se da una descripción general del proceso de
desarrollo de los algoritmos de optimización para estas funciones usando
gradiente descendiente y otros métodos heurísticos. Dichas implementaciones se
encuentran en nuestro [repositorio en GitHub](https://github.com/CarlosSanz1505\
/RNA---Alg-bioinspirados-2026-S1.git), el cual incluye indicaciones para
ejecutar los *Jupyter Notebooks* correspondientes por medio de un entorno
virtual de Python.

## Descenso del Gradiente

Se desarrolló una versión inicial de un notebook para la implementación de este
algoritmo basada en las diapositivas de este tema en el curso (Ospina & Zapata,
2026). En esta versión del código se define una posición inicial
($\\mathbf{x}_0$) aleatoria en la región $[-5,5]^2$, una tasa de aprendizaje
$\\eta$ de 0.001 y un máximo de 10 iteraciones ($M$). Se observó que en la
mayoría de los puntos iniciales generados el gradiente era demasiado grande,
ocasionando que los cambios de posición sean muy agresivos y el algoritmo
explote, pues cada iteración trasladaba el punto al lado opuesto en el eje $x$ a
mayor distancia del origen, obteniendo una inclinación aún más fuerte en el
gradiente evaluado, repitiendo así el ciclo hasta que *NumPy* se vuelve incapaz
de continuar los cálculos.

\`\`\`
Posición Inicial: [-4.24089429 -0.56892962]
Iteración 1
    gradient=array([-31484.89614165,  -3710.82279247])
    change=array([31.48489614,  3.71082279])
    position=array([27.24400186,  3.14189317])
Iteración 2
    gradient=array([8054401.02062413, -147818.7487885 ])
    change=array([-8054.40102062,   147.81874879])
    position=array([-8027.15701877,   150.96064196])
Iteración 3
    gradient=array([-2.06892262e+14, -1.28870198e+10])
    change=array([2.06892262e+11, 1.28870198e+07])
    position=array([2.06892254e+11, 1.28871707e+07])
...
Posición Final: [nan nan]
\`\`\`

Así que probamos reducir la tasa de aprendizaje a la vez que incrementamos el
máximo de iteraciones. Con ayuda de una animación auxiliar que demuestra el
proceso de optimización sobre un gráfico de curvas de nivel, observamos el
comportamiento del algoritmo con $M = 1000$, $\\eta = 0.0001$, el cual es mucho
más estable, pero con la desventaja de que el algoritmo puede llegar
rápidamente a la región del valle de la función, que es extremadamente plana, y
de ahí converger muy lentamente hacia el verdadero mínimo. Como resultado, el
algoritmo puede obtener valores finales de la función objetivo relativamente
cercanos al mínimo global, pero en puntos alejados del argumento óptimo.

...

<video controls width="100%">
  <source src="/RNA---Alg-bioinspirados-2026-S1/rosen_2d_grad.mp4" type="video/mp4" />
  Tu navegador no soporta video HTML5.
</video>

## Enjambres de Partículas

<video controls width="100%">
  <source src="/RNA---Alg-bioinspirados-2026-S1/pso.mp4" type="video/mp4" />
  Tu navegador no soporta video HTML5.
</video>

## [Video Contribuciones](https://youtube.com/shorts/LmZys56PSS8?si=_3LuLG_oOhX-ANQx)

## Referencias

Ospina, J., & Zapata, A. (2026). *Introducción al método de descenso por
gradiente para optimización* [Diapositivas]. Curso Redes Neuronales y Algoritmos
Bioinspirados, Universidad Nacional de Colombia.
`,
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
      <p>Los trabajos aquí presentados han sido creados por:</p>
      <ul>
        <li>Carlos Andres Sanchez Ortega</li>
        <li>Carlos Daniel Urresty Ascuntar</li>
        <li>Jhojan Esteban Jimenez Jaramillo</li>
        <li>Juan Manuel Teheran Machado</li>
      </ul>
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
          rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
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
