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