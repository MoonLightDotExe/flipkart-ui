import React,{useEffect,useState, useContext} from 'react'; 
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';

import regContext from '../../context/context.jsx'

const ECommerce: React.FC = () => {

  const {fruits_data, brands_data} = useContext(regContext)
  const freshGoodsCount = fruits_data?.data?.fresh_goods?.length || 0;
  const expiredGoodsCount = fruits_data?.data?.expired_goods?.length || 0;
  const brands_total = brands_data?.data?.length || 0
  

 const calculateExpiredCount = () => {
    const expiredCount = brands_data?.data?.filter((item) => {
      const expiryDate = new Date(item.Expiry_date);
      return item.Expired === "Yes"
    }).reduce((total, item) => total + item.Count, 0);

    return expiredCount || 0;
  };

  const expiredProducts = calculateExpiredCount();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Products" total={brands_total} rate="0" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""/>
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""/>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Fresh" total={freshGoodsCount} rate="0" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M50 20 C55 15, 65 10, 70 20 C65 25, 55 30, 50 25 Z" fill="none" stroke="white" strokeWidth="2"/>
            <rect x="48" y="20" width="4" height="10" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Stale" total={expiredGoodsCount} rate="0" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <rect x="25" y="50" width="50" height="20" rx="5" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M25 50 Q50 30, 75 50" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M30 40 Q25 30, 30 20" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M40 40 Q35 30, 40 20" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M50 40 Q45 30, 50 20" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M60 40 Q55 30, 60 20" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M70 40 Q65 30, 70 20" fill="none" stroke="white" strokeWidth="2"/>
            <circle cx="20" cy="15" r="2" fill="none" stroke="white" strokeWidth="2"/>
            <circle cx="75" cy="10" r="2" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Expired" total={expiredProducts} rate="0.95%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""/>
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""/>
            <path
              d="M10.6448 14.5469C10.2993 14.5469 9.95057 14.7538 9.74894 15.0363L7.77699 16.9532C7.30676 17.5152 7.73679 18.4466 8.5285 18.4466H14.8401C15.6318 18.4466 16.0618 17.5152 15.5916 16.9532L13.6196 15.0363C13.418 14.7538 13.0692 14.5469 12.7237 14.5469C12.3782 14.5469 12.0295 14.7538 11.8279 15.0363L10.6448 14.5469Z"
              fill=""/>
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-8 xl:col-span-12">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
