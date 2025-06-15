import { useState } from 'react';

const Avatar = ({ 
  size = 'md', 
  name = '', 
  src = '', 
  status = '', 
  onClick = null,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    'xs': 'w-6 h-6',
    'sm': 'w-8 h-8',
    'md': 'w-10 h-10',
    'lg': 'w-12 h-12',
    'xl': 'w-16 h-16'
  };
  
  const getInitials = () => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const statusColors = {
    'online': 'bg-green-500',
    'away': 'bg-yellow-500',
    'busy': 'bg-red-500',
    'offline': 'bg-gray-400'
  };
  
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  const containerClass = `relative ${sizeClasses[size] || sizeClasses.md} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`;
  
  return (
    <div className={containerClass} onClick={handleClick}>
      {src && !imageError ? (
        <img 
          src={src} 
          alt={name || 'User avatar'} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : name ? (
        <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-medium">
          {getInitials()}
        </div>
      ) : (
        <svg
          className="absolute w-full h-full text-gray-400 -bottom-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      
      {status && (
        <span className={`absolute bottom-1 right-1 block rounded-full ring-2 ring-white ${statusColors[status] || 'bg-gray-400'} w-2 h-2`}></span>
      )}
    </div>
  );
};

export default Avatar;