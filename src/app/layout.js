import "../styles/globals.css";
export const metadata = {
  title: 'Tenemos un Acuerdo',
  description: 'Descripción de mi aplicación',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function Layout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}