
## Instalación y publicación en npm

### 1. Iniciar sesión en npm

```bash
npm login
```

---

### 2. Ir a la carpeta del paquete

```bash
cd ruta/de/tu/paquete
```

---

### 3. Estructura del `index.ts`

Cada vez que crees un nuevo componente, debes exportarlo en el archivo principal (`index.ts`):

```ts
import "./styles.css"

export { Button } from "./button"
export { Input } from "./input"
export { TextArea } from "./textarea"
export { Checkbox } from "./checkbox"
export { FileUpload } from "./file"
export { FileItem } from "./fileItem"
export { CardRow } from "./Card"
export { Modal } from "./Modal"
export { BackgroundBlur } from "./Blur"
export { Table } from "./table"
export { Select } from "./Select"
```

### 4. Limpiar build anterior

Antes de generar una nueva versión:

```bash
Remove-Item -Recurse -Force dist
```

### 5. Generar el build

```bash
npm run build
```

### 6. Actualizar versión

```bash
npm version patch
```

Esto incrementa la versión automáticamente

### 7. Publicar en npm

```bash
npm publish
```

