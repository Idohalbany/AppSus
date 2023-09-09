export function About() {
  return (
    <section className='about'>
      <h1>About Us</h1>
      <main>
        <div className='about-card'>
          <div className='card-details'>
            <img src='./assets/img/ido.jpeg' alt='Ido img' />
            <h2 className='card-name'>Ido Halbany</h2>
            <br />
            <p className='card-description'>
              At 26, Ido, a spirited developer from Azor, Israel, exudes passion in every line of
              code he writes. His love for development is not just a job, but a calling. Navigating
              through the complex world of programming, Ido thrived during Sprint 3 of his studies
              at Coding Academy. Today, he's a proud co-creator of "Appsus", a testament to his
              dedication and skill.
            </p>
          </div>
          <div className='card-actions'>
            <i className='bx bx-phone'></i>
            <i className='bx bxl-linkedin'></i>
            <i className='bx bxl-github'></i>
          </div>
        </div>
        <div className='about-card'>
          <div className='card-details'>
            <img src='./assets/img/nati.jpeg' alt='Nati img' />
            <h2 className='card-name'>Nati Feldbaum</h2>
            <br />
            <p className='card-description'>
              Nati, a 26-year-old from Rehovot, Israel, sees development as more than just crafting
              software - it's an art. Each project he undertakes is a canvas, and his codes, the
              strokes of a brush. Studying at Coding Academy, Nati showcased his expertise during
              Sprint 3, leading to the inception of "Appsus", a product he's profoundly proud of.
            </p>
          </div>
          <div className='card-actions'>
            <i className='bx bx-phone'></i>
            <i className='bx bxl-linkedin'></i>
            <i className='bx bxl-github'></i>
          </div>
        </div>
      </main>
      <footer>
        <h1 className='project-about'>About Appsus</h1>
        <p className='project-description'>
          Introducing "Appsus", your friendly assistant in the digital realm. Born out of a vision
          during Sprint 3 at Coding Academy, Appsus seamlessly integrates functionalities for
          emails, notes, and books. This isn't just another app; it's a solution, crafted with
          precision, love, and a touch of genius. Dive in, and let Appsus simplify your world with
          elegance and efficiency.
        </p>
      </footer>
    </section>
  )
}
