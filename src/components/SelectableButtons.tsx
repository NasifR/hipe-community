'use client';

import React from 'react';

type Props = {
    options: string[];
    selected: string | string[];
    onSelect: (value: any) => void;
    multi?: boolean;
};

const SelectableButtons: React.FC<Props> = ({ options, selected, onSelect, multi = false }) => {
    const isSelected = (value: string) =>
        multi ? (selected as string[]).includes(value) : selected === value;

    const handleClick = (value: string) => {
        if (multi) {
          const selectedArr = selected as string[];
          if (selectedArr.includes(value)) {
            onSelect(selectedArr.filter((item) => item !== value));
          } else {
            onSelect([...selectedArr, value]);
          }
        } else {
          onSelect(value);
        }
      };

      return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleClick(option)}
                    className={`px-4 py-2 rounded-full border transition ${
                        isSelected(option)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border-gray-300'
                    } hover:bg-blue-100`}
                >
                    {option}
                </button>
            ))}
        </div>
      );
    };

export default SelectableButtons;