import React from 'react';
import SettingForm from './components/SettingForm';

type pageProps = {
    params:{
        restaurantId:string
    }
};

const page:React.FC<pageProps> = () => {
    
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          { <SettingForm  />}
        </div>
      </div>
    );
}
export default page;