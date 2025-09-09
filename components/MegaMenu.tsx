import React from 'react';

// Define types locally as they are specific to this component and constants
interface MegaMenuLink {
  label: string;
  isTitle?: boolean;
  tag?: 'NEW' | 'HOT';
}

interface MegaMenuColumn {
  title?: string;
  links: MegaMenuLink[];
}

interface MegaMenuCategoryData {
  shopBy: string[];
  columns: MegaMenuColumn[];
}

interface MegaMenuProps {
  data: MegaMenuCategoryData;
}

const renderTag = (tag?: 'NEW' | 'HOT') => {
  if (!tag) return null;
  const isNew = tag === 'NEW';
  return (
    <span className={`ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full ${isNew ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {tag}
    </span>
  );
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ data }) => {
  const [firstColumn, ...otherColumns] = data.columns;
  
  const groupedOtherColumns = otherColumns.reduce((acc, col) => {
    // Group columns by title to combine sections like FOOTWEAR and ACCESSORIES under one grid cell
    const key = col.title || 'group-' + acc.length;
    if (!acc[key]) {
      acc[key] = { title: col.title, links: [] };
    }
    acc[key].links.push(...col.links);
    return acc;
  }, {} as Record<string, { title?: string; links: MegaMenuLink[] }>);


  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-20">
      <div className="max-w-screen-2xl mx-auto px-8 py-4">
        <div className="bg-gray-100 -mx-8 -mt-4 mb-4 px-8 py-2">
            <div className="flex items-center space-x-6">
                <span className="text-sm font-semibold text-gray-500">Shop By:</span>
                {data.shopBy.map((item, index) => (
                    <button key={item} className={`text-sm font-semibold pb-1 ${index === 0 ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="flex">
            <div className="w-1/5 pr-8 border-r">
                <ul className="space-y-2">
                    {firstColumn.links.map((link, idx) => (
                        <li key={idx}>
                             <a href="#" className={`text-sm hover:text-gray-900 ${link.isTitle ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                                {link.label}
                                {renderTag(link.tag)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-4/5 pl-8 grid grid-cols-4 grid-flow-row gap-x-8 gap-y-6">
                {Object.values(groupedOtherColumns).map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-3">
                         {group.title && <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{group.title}</h3>}
                         <ul className="space-y-2">
                            {group.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
