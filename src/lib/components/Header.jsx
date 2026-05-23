import "../styles/HeaderStyle.css";

function Header() {
  return (
    <section className="hero-text">
      <h1>NAKEMAKE</h1>
      <h3>Keep a daily journal that no one else can access, not even us.</h3>
      <h4>
        Your system keeps a local file on lock, fully encrypted, so no cap,
        don't even worry. Only you know the drop, and you can rename that file
        whatever you want.
      </h4>
      <a href="/pageOpen">page Open</a>
    </section>
  );
}

export default Header;
