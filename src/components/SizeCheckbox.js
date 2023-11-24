import { Checkbox, Typography } from '@material-tailwind/react';
import React from 'react'

const SizeCheckbox = ({ size, isChecked, onChange }) => {
    return (
        <label className="flex items-center cursor-pointer">
      <Checkbox
        checked={isChecked}
        onChange={(e) => onChange(size, e.target.checked)}
        ripple={false}
        className={`h-8 w-8 border-gray-900/20 transition-all ${isChecked ? 'bg-green-500' : 'bg-gray-900/10'} hover:scale-105 hover:before:opacity-0`}
      />
      <Typography variant="body1" className={`ml-2 ${isChecked ? 'text-green-500' : 'text-gray-500'}`}>
        {size}
      </Typography>
    </label>
    );
  };

export default SizeCheckbox