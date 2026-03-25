# RNAB 2026-S1

Este repositorio contiene las soluciones a los problemas planteados en el curso
de **R**edes **N**euronales y **A**lgoritmos **B**ioinspirados durante el primer
semestre de 2026.

Por cada trabajo separado hay un directorio, y se pueden encontrar reportes
presentando el desarrollo de la solución y las decisiones tomadas para llegar a
la misma en un `Blog` dedicado.

## Blog

Para testear el blog localmente, ejecutar los siguientes comandos y dirigirse a
`http://localhost:5173/`:

```
cd blog/
npm install
npm run dev
```

## Trabajo 01: Optimización heurística

### Punto 1

La implementación de los algoritmos se puede encontrar en
`Trabajo 01/Optimización numérica`, de forma que se recomienda ubicarse en este
directorio y usar un entorno virtual de Python. Para lograr esto en bash:

```
cd "Trabajo 01\Optimización numérica"

# Crear venv
python -m venv .venv

# Instalar librerías y activar venv
.venv/Scripts/python -m pip install -r requirements.txt
source .venv/Scripts/activate
```