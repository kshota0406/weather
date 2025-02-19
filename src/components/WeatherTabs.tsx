import React from 'react';
import { motion } from 'framer-motion';
import { TabType } from '../types/weather';
import { TABS } from '../constants/weather';

type WeatherTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const WeatherTabs: React.FC<WeatherTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {TABS.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={`px-3 py-1 rounded-full text-sm ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}; 