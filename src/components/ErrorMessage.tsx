import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
    <div className="text-red-600 text-center p-4">
      <p className="font-semibold">Error</p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  </div>
);