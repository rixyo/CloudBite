'use client'
import React from 'react';

import {HashLoader} from 'react-spinners'

const Loader:React.FC= () => {
    
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color={"#F14A16"} />
      </div>
    );
}
export default Loader;