import { useEffect, useContext } from 'react';
import regContext from '../../context/context.jsx';

const TableOne = () => {
  const { getBrandGoods, brands_data } = useContext(regContext);

  useEffect(() => {
    getBrandGoods();
  }, []);

  const data = brands_data?.data || []; // Safely access nested data

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Brand Data
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Sr.No</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Timestamp</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Brand</h5>
          </div>
          <div className=" p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Count</h5>
          </div>
          <div className=" p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Expired</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Expected Days</h5>
          </div>
        </div>

        {Array.isArray(data) && data.length > 0 ? (
          data.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${
                key === data.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{key + 1}</p>
              </div>
              <div className="p-2.5 xl:p-5 text-center">
                <p className="text-black dark:text-white">{brand.Timestamp}</p>
              </div>
              <div className="p-2.5 xl:p-5 text-center">
                <p className="text-black dark:text-white">{brand.Brand}</p>
              </div>
              <div className=" p-2.5 xl:p-5 text-center">
                <p className="text-black dark:text-white">{brand.Count}</p>
              </div>
              <div className=" p-2.5 xl:p-5 text-center">
                <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      brand.Expired === 'NA'
                        ? 'bg-success text-success'
                        : brand.Expired === 'Yes'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                > { brand.Expired }</p>
              </div>
              <div className="p-2.5 xl:p-5 text-center">
                <p className="text-black dark:text-white">{brand.Expected_life_span_days ? brand.Expected_life_span_days : "-"}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 text-center text-gray-500 dark:text-gray-400">
            No brand data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOne;
