import { ApexOptions } from 'apexcharts';
import React, { useState, useContext, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import regContext from '../../context/context.jsx';

interface ChartThreeState {
  series: number[];
  brands: string[];
  colors: string[];
}

const ChartThree: React.FC = () => {
  const { brands_data } = useContext(regContext);

  const [state, setState] = useState<ChartThreeState>({
    series: [],
    brands: [],
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#FF6347', '#FFD700', '#32CD32', '#8A2BE2', '#FF1493'],
  });

  useEffect(() => {
    if (brands_data?.data) {
      const labels = brands_data.data.map((item: any) => item.Brand);
      const count = brands_data.data.map((item: any) => item.Count);

      setState((prevState) => ({
        ...prevState,
        brands: labels,
        series: count,
      }));
    }
  }, [brands_data]);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    labels: state.brands,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: new Array(state.series.length).fill(0),
    }));
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Product Count Analytics
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.brands.map((brand, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{ backgroundColor: state.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{brand}</span>
                <span>{state.series[index]} products</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
