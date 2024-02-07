import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Accordion } from 'react-bootstrap';
import imageScreenOne from '../assets/images/screenshots/home-1.png';
import imageBarrel from '../assets/images/home-barrel.png';
import imageAccordionFirst from '../assets/images/screenshots/home-2.svg';
import imageAccordionSecond from '../assets/images/screenshots/home-3.svg';
import useTitle from '../hooks/useTitle';

export const HomePage = () => {
  const fagContent = [
    {
      id: '01',
      title: 'Site features',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
    {
      id: '02',
      title: 'Copy trading',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
    {
      id: '03',
      title: 'Trading bot',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
    {
      id: '04',
      title: 'Security and Transparency',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
    {
      id: '05',
      title: 'Intuitive Interface',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
    {
      id: '06',
      title: 'Intuitive Interface',
      content: 'An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.'
    },
  ];

  useTitle('CopyMaster – your assistant in crypto-trading');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
      scrollToTop();
    }, []);

  return (
    <>
      <Header homepage />

      <main className='main'>
        <section className='d-flex justify-content-around align-items-center gap-3 p-5'>
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
              <Link to={'/signin'}  className='header__button header__button--border'>Sign in</Link>
            </div>

            <h2 className='main__accordion-text text-white'>Sign up and get started today</h2>

            <div className='d-none d-sm-block'>
              <Link to={'/signup'} className='header__button header__button--fill'>Sign up</Link>
            </div>
          </div>

          <div className='d-flex d-sm-none justify-content-center mt-4'>
            <Link to={'/signup'} className='header__button header__button--fill px-5'>Sign up</Link>
          </div>

          <div className='mt-4 position-relative'>
            <Accordion id='test' flush>
              {fagContent.map((item, index) => 
                <Accordion.Item eventKey={String(index)} key={item.id}>
                    {index < 3
                    ? (
                      <Accordion.Header>
                        <span className='main__accordion--id'>{item.id}</span>
                        <span className='main__accordion--title first'>{item.title}</span>
                      </Accordion.Header>
    
                    )
                  : (
                    <Accordion.Header>
                      <span className='main__accordion--id'>{item.id}</span>
                      <span className='main__accordion--title first'>{item.title}</span>
                    </Accordion.Header>
                  )}

                  <Accordion.Body>
                    {item.content}
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>

            <img src={imageAccordionFirst} alt='Coins barrel' className='main__accordion--image-first' />
            <img src={imageAccordionSecond} alt='Coins barrel' className='main__accordion--image-second' />
          </div>
        </section>

        <section className='main__start'>
          <div className='col-md-6 col-sm-12'>
            <div className='row g-3'>
              <div className='col'>
                <h3>Let start your
                  <span className='d-block m-2 ps-4'>Crypto story</span>
                </h3>
              </div>

              <div className='col'>
                <svg xmlns="http://www.w3.org/2000/svg" width="106" height="30" viewBox="0 0 106 30" fill="none">
                  <path d="M89.704 15.1755L88.81 18.798C89.914 19.0755 93.316 20.1795 93.82 18.1365C94.345 16.005 90.8065 15.453 89.704 15.1755ZM90.9235 10.23L90.1135 13.5165C91.0315 13.7475 93.8635 14.6925 94.3225 12.834C94.7995 10.8945 91.8415 10.4625 90.9235 10.23ZM91 0C88.0333 0 85.1332 0.879734 82.6665 2.52796C80.1997 4.17618 78.2771 6.51885 77.1418 9.25974C76.0065 12.0006 75.7094 15.0166 76.2882 17.9263C76.867 20.8361 78.2956 23.5088 80.3934 25.6066C82.4912 27.7044 85.1639 29.133 88.0737 29.7118C90.9834 30.2905 93.9994 29.9935 96.7403 28.8582C99.4811 27.7229 101.824 25.8003 103.472 23.3335C105.12 20.8668 106 17.9667 106 15C106 13.0302 105.612 11.0796 104.858 9.25974C104.104 7.43986 102.999 5.78628 101.607 4.3934C100.214 3.00052 98.5601 1.89563 96.7403 1.14181C94.9204 0.387986 92.9698 0 91 0ZM97.537 12.8625C97.5055 13.4379 97.2847 13.9868 96.909 14.4239C96.5333 14.8609 96.0237 15.1615 95.4595 15.279C95.8304 15.43 96.166 15.6562 96.4452 15.9433C96.7243 16.2304 96.941 16.5722 97.0815 16.9472C97.222 17.3222 97.2833 17.7222 97.2615 18.1221C97.2397 18.5219 97.1354 18.913 96.955 19.2705C96.076 21.8085 93.9895 22.023 91.2145 21.492L90.541 24.222L88.9135 23.811L89.578 21.1185C89.1446 21.0105 88.7126 20.897 88.282 20.778L87.6145 23.484L85.9885 23.0745L86.6635 20.3385C86.2825 20.241 85.897 20.136 85.5025 20.037L83.3845 19.503L84.193 17.619C84.193 17.619 85.393 17.9415 85.375 17.9175C85.4496 17.9416 85.5283 17.9506 85.6065 17.944C85.6846 17.9374 85.7607 17.9153 85.8302 17.879C85.8997 17.8427 85.9614 17.7929 86.0115 17.7326C86.0615 17.6722 86.0991 17.6025 86.122 17.5275L87.9475 10.119C87.9709 9.89221 87.9048 9.66526 87.7633 9.4865C87.6218 9.30773 87.4161 9.1913 87.19 9.162C87.214 9.1455 86.0065 8.865 86.0065 8.865L86.4415 7.107L88.684 7.674L88.6825 7.683C89.02 7.767 89.368 7.848 89.722 7.929L90.388 5.2275L92.0155 5.637L91.3615 8.286C91.798 8.388 92.2375 8.4885 92.6665 8.5965L93.3145 5.964L94.942 6.375L94.2745 9.078C96.3295 9.7935 97.8325 10.8675 97.537 12.8625Z" fill="white"/>
                  <path d="M51.704 15.1755L50.81 18.798C51.914 19.0755 55.316 20.1795 55.82 18.1365C56.345 16.005 52.8065 15.453 51.704 15.1755ZM52.9235 10.23L52.1135 13.5165C53.0315 13.7475 55.8635 14.6925 56.3225 12.834C56.7995 10.8945 53.8415 10.4625 52.9235 10.23ZM53 0C50.0333 0 47.1332 0.879734 44.6665 2.52796C42.1997 4.17618 40.2771 6.51885 39.1418 9.25974C38.0065 12.0006 37.7094 15.0166 38.2882 17.9263C38.867 20.8361 40.2956 23.5088 42.3934 25.6066C44.4912 27.7044 47.1639 29.133 50.0737 29.7118C52.9834 30.2905 55.9994 29.9935 58.7403 28.8582C61.4811 27.7229 63.8238 25.8003 65.472 23.3335C67.1203 20.8668 68 17.9667 68 15C68 13.0302 67.612 11.0796 66.8582 9.25974C66.1044 7.43986 64.9995 5.78628 63.6066 4.3934C62.2137 3.00052 60.5601 1.89563 58.7403 1.14181C56.9204 0.387986 54.9698 0 53 0ZM59.537 12.8625C59.5055 13.4379 59.2847 13.9868 58.909 14.4239C58.5333 14.8609 58.0237 15.1615 57.4595 15.279C57.8304 15.43 58.166 15.6562 58.4452 15.9433C58.7243 16.2304 58.941 16.5722 59.0815 16.9472C59.222 17.3222 59.2833 17.7222 59.2615 18.1221C59.2397 18.5219 59.1354 18.913 58.955 19.2705C58.076 21.8085 55.9895 22.023 53.2145 21.492L52.541 24.222L50.9135 23.811L51.578 21.1185C51.1446 21.0105 50.7126 20.897 50.282 20.778L49.6145 23.484L47.9885 23.0745L48.6635 20.3385C48.2825 20.241 47.897 20.136 47.5025 20.037L45.3845 19.503L46.193 17.619C46.193 17.619 47.393 17.9415 47.375 17.9175C47.4496 17.9416 47.5283 17.9506 47.6065 17.944C47.6846 17.9374 47.7607 17.9153 47.8302 17.879C47.8997 17.8427 47.9614 17.7929 48.0115 17.7326C48.0615 17.6722 48.0991 17.6025 48.122 17.5275L49.9475 10.119C49.9709 9.89221 49.9048 9.66526 49.7633 9.4865C49.6218 9.30773 49.4161 9.1913 49.19 9.162C49.214 9.1455 48.0065 8.865 48.0065 8.865L48.4415 7.107L50.684 7.674L50.6825 7.683C51.02 7.767 51.368 7.848 51.722 7.929L52.388 5.2275L54.0155 5.637L53.3615 8.286C53.798 8.388 54.2375 8.4885 54.6665 8.5965L55.3145 5.964L56.942 6.375L56.2745 9.078C58.3295 9.7935 59.8325 10.8675 59.537 12.8625Z" fill="white"/>
                  <path d="M13.704 15.1755L12.81 18.798C13.914 19.0755 17.316 20.1795 17.82 18.1365C18.345 16.005 14.8065 15.453 13.704 15.1755ZM14.9235 10.23L14.1135 13.5165C15.0315 13.7475 17.8635 14.6925 18.3225 12.834C18.7995 10.8945 15.8415 10.4625 14.9235 10.23ZM15 0C12.0333 0 9.13319 0.879734 6.66645 2.52796C4.19972 4.17618 2.27713 6.51885 1.14181 9.25974C0.00649926 12.0006 -0.290551 15.0166 0.288228 17.9263C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2905 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.472 23.3335C29.1203 20.8668 30 17.9667 30 15C30 13.0302 29.612 11.0796 28.8582 9.25974C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387986 16.9698 0 15 0ZM21.537 12.8625C21.5055 13.4379 21.2847 13.9868 20.909 14.4239C20.5333 14.8609 20.0237 15.1615 19.4595 15.279C19.8304 15.43 20.166 15.6562 20.4452 15.9433C20.7243 16.2304 20.941 16.5722 21.0815 16.9472C21.222 17.3222 21.2833 17.7222 21.2615 18.1221C21.2397 18.5219 21.1354 18.913 20.955 19.2705C20.076 21.8085 17.9895 22.023 15.2145 21.492L14.541 24.222L12.9135 23.811L13.578 21.1185C13.1446 21.0105 12.7126 20.897 12.282 20.778L11.6145 23.484L9.98851 23.0745L10.6635 20.3385C10.2825 20.241 9.89701 20.136 9.50251 20.037L7.38451 19.503L8.193 17.619C8.193 17.619 9.39301 17.9415 9.375 17.9175C9.44964 17.9416 9.52833 17.9506 9.60648 17.944C9.68464 17.9374 9.76069 17.9153 9.83022 17.879C9.89975 17.8427 9.96136 17.7929 10.0115 17.7326C10.0615 17.6722 10.0991 17.6025 10.122 17.5275L11.9475 10.119C11.9709 9.89221 11.9048 9.66526 11.7633 9.4865C11.6218 9.30773 11.4161 9.1913 11.19 9.162C11.214 9.1455 10.0065 8.865 10.0065 8.865L10.4415 7.107L12.684 7.674L12.6825 7.683C13.02 7.767 13.368 7.848 13.722 7.929L14.388 5.2275L16.0155 5.637L15.3615 8.286C15.798 8.388 16.2375 8.4885 16.6665 8.5965L17.3145 5.964L18.942 6.375L18.2745 9.078C20.3295 9.7935 21.8325 10.8675 21.537 12.8625Z" fill="white"/>
                </svg>
              </div>
            </div>

            <div className='row mt-3 gap-4'>
              <div className='col col-md-9'>
                An easy-to-use and intuitive interface makes cryptocurrency trading accessible to everyone. Simple analysis tools and charts help you make informed decisions.
              </div>

              <div>
                <Link className='header__button header__button--fill' to={'/signup'}>Get started</Link>
              </div>
            </div>
          </div>

          <img src={imageBarrel} alt='Coins barrel' className='main__start--image' />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;