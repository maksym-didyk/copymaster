import * as React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import imageScreenOne from '../assets/images/screenshots/home-1.png';

export const HomePage = () => {
  return (
    <>
      <Header />

      <main className='main'>
        <section className='d-flex justify-content-around align-items-center gap-3 m-5'>
          <div>
            <h1 className='main__hero--text'>Your assistant <br /> in crypto-trading</h1>
          </div>

          <div className='d-none d-sm-block'>
            <img src={imageScreenOne} alt='Screenshot' className='main__hero--image' />
          </div>

        </section>

        <section className='main__accordion'>
          <div className='d-flex justify-content-around align-items-center gap-2'>
            <div className='d-none d-sm-block'>
              <button className='header__button header__button--border'>Sign in</button>
            </div>
            
            <h2 className='main__accordion--text'>Sign up and get started today</h2>

            <div className='d-none d-sm-block'>
              <button className='header__button header__button--fill'>Sign up</button>
            </div>
          </div>
          
        </section>
      </main>

      <Footer />
    </>
  )
}

export default HomePage;
