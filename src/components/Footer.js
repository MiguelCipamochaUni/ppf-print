import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ppf-footer">
      <p className="footer-desc">
        <em className="exo2">
          Precisión absoluta, y los materiales de más alta calidad. En{" "}
          <span>PPF PRINT</span>, somos expertos en resaltar y proteger lo mejor
          de tu auto.
        </em>
      </p>

      <div className="footer-benefits">
        <div className="benefit-item">
          <img src="/icons/clock.png" alt="Reloj" className="benefit-icon" />
          <span className="anton">AJUSTE PERFECTO SIN ERRORES</span>
        </div>

        <div className="benefit-item">
          <span className="anton">AHORRA TIEMPO Y DINERO</span>
        </div>

        <div className="benefit-item">
          <span className="anton">COMPATIBLE CON MARCAS POPULARES</span>
          <img src="/icons/car.png" alt="Auto" className="benefit-icon-car" />
        </div>
      </div>
    </footer>
  );
}
