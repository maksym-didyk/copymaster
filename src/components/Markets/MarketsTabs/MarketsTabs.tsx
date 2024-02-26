import React, { FC } from 'react';
import { OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';
import { MarketsTabType } from '../../../types/enums';

interface Props {
  currentTab: MarketsTabType,
  tabChange: (tab: MarketsTabType) => void,
}

export const MarketsTabs: FC<Props> = ({ currentTab, tabChange: handleCurrentTabChange }) => {
  return (
    <Stack direction="horizontal" gap={3} className='mt-5 ps-5 text-secondary' >
    <div onClick={() => handleCurrentTabChange(MarketsTabType.buy)} style={{cursor: 'pointer'}} className={currentTab === MarketsTabType.buy ? 'text-white' : ''}>BUY</div>
    <div onClick={() => handleCurrentTabChange(MarketsTabType.sell)} style={{cursor: 'pointer'}} className={currentTab === MarketsTabType.sell ? 'text-white' : ''}>SELL</div>
    <div onClick={() => handleCurrentTabChange(MarketsTabType.all)} style={{cursor: 'pointer'}} className={currentTab === MarketsTabType.all ? 'text-white' : ''}>ALL Positions</div>
    <div onClick={() => handleCurrentTabChange(MarketsTabType.alert)} style={{cursor: 'pointer'}} className={currentTab === MarketsTabType.alert ? 'text-white' : ''}>Alert</div>
    <div onClick={() => handleCurrentTabChange(MarketsTabType.history)} style={{cursor: 'pointer'}} className={currentTab === MarketsTabType.history ? 'text-white' : ''}>History</div>
    <OverlayTrigger
      placement='auto'
      overlay={
        <Tooltip id={'tooltip-help'} data-bs-theme='light'>
          Some helps
        </Tooltip>
      }
    >
      <svg style={{height: '1.5rem', width: '1.5rem', cursor: 'pointer'}} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_616_5227)">
          <circle cx="16" cy="16.1191" r="16" fill="#323750"/>
        </g>
        <path d="M17.0898 19.9043H14.1016C14.1094 19.2012 14.1641 18.5957 14.2656 18.0879C14.375 17.5723 14.5586 17.1074 14.8164 16.6934C15.082 16.2793 15.4336 15.8691 15.8711 15.4629C16.2383 15.1348 16.5586 14.8223 16.832 14.5254C17.1055 14.2285 17.3203 13.9238 17.4766 13.6113C17.6328 13.291 17.7109 12.9355 17.7109 12.5449C17.7109 12.0918 17.6406 11.7168 17.5 11.4199C17.3672 11.1152 17.1641 10.8848 16.8906 10.7285C16.625 10.5723 16.2891 10.4941 15.8828 10.4941C15.5469 10.4941 15.2344 10.5684 14.9453 10.7168C14.6562 10.8574 14.418 11.0762 14.2305 11.373C14.0508 11.6699 13.957 12.0605 13.9492 12.5449H10.5508C10.5742 11.4746 10.8203 10.5918 11.2891 9.89648C11.7656 9.19336 12.4023 8.67383 13.1992 8.33789C13.9961 7.99414 14.8906 7.82227 15.8828 7.82227C16.9766 7.82227 17.9141 8.00195 18.6953 8.36133C19.4766 8.71289 20.0742 9.23242 20.4883 9.91992C20.9023 10.5996 21.1094 11.4277 21.1094 12.4043C21.1094 13.084 20.9766 13.6895 20.7109 14.2207C20.4453 14.7441 20.0977 15.2324 19.668 15.6855C19.2383 16.1387 18.7656 16.6074 18.25 17.0918C17.8047 17.4902 17.5 17.9082 17.3359 18.3457C17.1797 18.7832 17.0977 19.3027 17.0898 19.9043ZM13.75 23.5254C13.75 23.0254 13.9219 22.6113 14.2656 22.2832C14.6094 21.9473 15.0703 21.7793 15.6484 21.7793C16.2188 21.7793 16.6758 21.9473 17.0195 22.2832C17.3711 22.6113 17.5469 23.0254 17.5469 23.5254C17.5469 24.0098 17.3711 24.4199 17.0195 24.7559C16.6758 25.0918 16.2188 25.2598 15.6484 25.2598C15.0703 25.2598 14.6094 25.0918 14.2656 24.7559C13.9219 24.4199 13.75 24.0098 13.75 23.5254Z" fill="#8997DC"/>
        <defs>
          <filter id="filter0_b_616_5227" x="-4" y="-3.88086" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_616_5227"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_616_5227" result="shape"/>
          </filter>
        </defs>
      </svg>
    </OverlayTrigger>
    
    
  </Stack>
  );
};